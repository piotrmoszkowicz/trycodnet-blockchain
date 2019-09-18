import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from "sequelize-typescript";
import { Wallet } from "../wallet/wallet.entity";

@Table({
  underscored: true,
})
export class Transaction extends Model<Transaction> {
  @AutoIncrement
  @PrimaryKey
  @Column
  public id: number;

  @Unique
  @Column
  public transactionId: number;

  @ForeignKey(() => Wallet)
  @Column
  walletId: number;

  @BelongsTo(() => Wallet)
  wallet: Wallet;
}
