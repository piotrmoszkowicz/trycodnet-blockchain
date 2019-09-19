import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { InjectEventEmitter } from "nest-emitter";

import { Socket } from "blockchain.info";

import axiosWrapper from "../axiosWrapper";

import { TransactionService } from "../transaction/transaction.service";
import { WalletService } from "../wallet/wallet.service";

import { MyEventEmitter } from "../app.events";

import { IBlockChecker, IBlockResponse } from "./blockchecker.interface";

@Injectable()
export class BlockCheckerService implements OnModuleInit {
  private readonly logger = new Logger(BlockCheckerService.name);
  private socket;
  private walletAddresses = [];

  constructor(
    private readonly transactionService: TransactionService,
    private readonly walletService: WalletService,
    @InjectEventEmitter() private readonly emitter: MyEventEmitter,
  ) {}

  async onModuleInit(): Promise<void> {
    this.walletAddresses = (await this.walletService.findAll()).map(
      wallet => wallet.address,
    );

    this.socket = new Socket();
    this.socket.onOpen(() => {
      this.logger.debug("Socket with BlockchainAPI is opened");
    });
    this.socket.onBlock(data => this.onBlockHandler(data));
    this.socket.onTransaction(data => this.onTransactionHandler(data), {
      addresses: this.walletAddresses,
    });

    this.emitter.on("newWallet", walletAddress =>
      this.updateWallets(walletAddress),
    );
  }

  async callWebook(webhookUrl: string, data: IBlockChecker) {
    this.logger.debug(`Calling webhook at: ${webhookUrl} with:`);
    this.logger.debug(data);
    await axiosWrapper.put(webhookUrl, data);
  }

  updateWallets(walletAddress: string) {
    this.logger.debug(`Adding new wallet address: ${walletAddress}`);
    this.walletAddresses.push(walletAddress);
    this.socket.onTransaction(data => this.onTransactionHandler(data), {
      addresses: [walletAddress],
    });
  }

  async onBlockHandler(data: IBlockResponse) {
    this.logger.debug("OnBlock called");
    this.logger.debug(`Hash: ${data.hash}`);
    const transactionsToLookFor = await this.transactionService.findAll();

    for (const transaction of transactionsToLookFor) {
      const response = {
        trackedWalletId: transaction.wallet.address,
        transactionId: transaction.transactionId,
      };
      await this.callWebook(transaction.wallet.webhookUrl, response);
    }
  }

  async onTransactionHandler(data: any) {
    this.logger.debug("OnTransaction called");
    try {
      let transactionType = false; // False -> We are on input, True -> we are on output
      const inputWallets = data.inputs.map(input => input.prev_out.addr);
      const outputWallets = data.out.map(out => out.addr);

      const allWallets = inputWallets.concat(outputWallets);

      const lookedWalletsInThisTransaction = allWallets.filter(
        index => -1 !== this.walletAddresses.indexOf(index),
      );

      this.logger.debug("Wallets to lookup:");
      this.logger.debug(lookedWalletsInThisTransaction);

      if (outputWallets.includes(lookedWalletsInThisTransaction[0])) {
        transactionType = true;
      }

      const response = {
        date: data.time,
        addressesOutput: outputWallets,
        addressesInput: inputWallets,
        amount: data.inputs.reduce(
          (acc, input) => acc + input.prev_out.value,
          0,
        ),
        transactionId: data.hash,
        numberOfConfirmations: 0,
        transactionType,
        trackedWalletId: lookedWalletsInThisTransaction[0],
      };

      const wallet = await this.walletService.findByWalletAddress(
        lookedWalletsInThisTransaction[0],
      );

      await this.transactionService.create(data.hash, wallet.id);

      await this.callWebook(wallet.webhookUrl, response);
    } catch (err) {
      this.logger.error(err.message, err.trace);
    }
  }
}
