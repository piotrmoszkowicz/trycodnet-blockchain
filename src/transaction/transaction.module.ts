import { Module } from "@nestjs/common";

import { DatabaseModule } from "../database/database.module";

import { TransactionService } from "./transaction.service";
import { transactionProviders } from "./transaction.providers";

@Module({
  imports: [DatabaseModule],
  exports: [TransactionService],
  providers: [TransactionService, ...transactionProviders],
})
export class TransactionModule {}
