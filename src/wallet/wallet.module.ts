import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { walletProviders } from "./wallet.providers";

@Module({
  imports: [DatabaseModule],
  providers: [...walletProviders],
})
export class WalletModule {}
