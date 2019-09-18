import { Inject, Injectable } from "@nestjs/common";
import { Wallet } from "./wallet.entity";
import { CreateWalletDto } from "./dto/create-wallet.dto";

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

  async findAll(): Promise<Wallet[]> {
    return this.walletRepository.findAll<Wallet>();
  }
}
