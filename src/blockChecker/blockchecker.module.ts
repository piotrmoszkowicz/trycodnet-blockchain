import { Module } from "@nestjs/common";

import { BlockCheckerService } from "./blockchecker.service";

import { DatabaseModule } from "../database/database.module";
import { TransactionModule } from "../transaction/transaction.module";
import { WalletModule } from "../wallet/wallet.module";

@Module({
  imports: [
    BlockCheckerModule,
    DatabaseModule,
    TransactionModule,
    WalletModule,
  ],
  exports: [BlockCheckerService],
  providers: [BlockCheckerService],
})
export class BlockCheckerModule {}
