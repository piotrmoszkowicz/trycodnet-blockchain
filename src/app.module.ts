import { Module } from "@nestjs/common";
import { NestEmitterModule } from "nest-emitter";
import { EventEmitter } from "events";

import { BlockCheckerModule } from "./blockChecker/blockchecker.module";
import { TransactionModule } from "./transaction/transaction.module";
import { WalletModule } from "./wallet/wallet.module";

@Module({
  imports: [
    BlockCheckerModule,
    TransactionModule,
    WalletModule,
    NestEmitterModule.forRoot(new EventEmitter()),
  ],
})
export class AppModule {}
