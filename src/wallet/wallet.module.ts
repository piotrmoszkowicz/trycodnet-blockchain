import { Module } from "@nestjs/common";

import { DatabaseModule } from "../database/database.module";

import { WalletController } from "./wallet.controller";
import { WalletService } from "./wallet.service";
import { walletProviders } from "./wallet.providers";

@Module({
  imports: [DatabaseModule],
  exports: [WalletService],
  controllers: [WalletController],
  providers: [WalletService, ...walletProviders],
})
export class WalletModule {}
