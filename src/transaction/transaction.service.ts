import { Inject, Injectable } from "@nestjs/common";
import { Transaction } from "./transaction.entity";
import { Wallet } from "../wallet/wallet.entity";

@Injectable()
export class TransactionService {
  constructor(
    @Inject("TRANSACTION_REPOSITORY")
    private readonly transactionService: typeof Transaction,
  ) {}

  async create(transactionId: number, walletId: number): Promise<Transaction> {
    const transaction = new Transaction();
    transaction.transactionId = transactionId;
    transaction.walletId = walletId;

    return transaction.save();
  }

  async findAll(): Promise<Transaction[]> {
    return this.transactionService.findAll<Transaction>({
      include: [
        {
          model: Wallet,
        },
      ],
    });
  }
}
