import { Inject, Injectable } from "@nestjs/common";

import { CreateWalletDto } from "./dto/create-wallet.dto";
import { Wallet } from "./wallet.entity";

@Injectable()
export class WalletService {
  constructor(
    @Inject("WALLET_REPOSITORY")
    private readonly walletRepository: typeof Wallet,
  ) {}

  async create(createWalletDto: CreateWalletDto): Promise<Wallet> {
    const wallet = new Wallet();
    wallet.address = createWalletDto.address;
    wallet.webhookUrl = createWalletDto.webhookUrl;

    return wallet.save();
  }

  async findByWalletAddress(address: string): Promise<Wallet> {
    return this.walletRepository.findOne({
      where: {
        address,
      },
    });
  }

  async findAll(): Promise<Wallet[]> {
    return this.walletRepository.findAll<Wallet>();
  }
}
