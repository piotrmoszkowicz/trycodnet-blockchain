import { Inject, Injectable } from "@nestjs/common";
import { Wallet } from "./wallet.entity";

@Injectable()
export class WalletService {
  constructor(
    @Inject("WALLET_REPOSITORY")
    private readonly walletRepository: typeof Wallet,
  ) {}

  async findAll(): Promise<Wallet[]> {
    return this.walletRepository.findAll<Wallet>();
  }
}
