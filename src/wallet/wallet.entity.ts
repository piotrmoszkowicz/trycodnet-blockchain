import {
  AutoIncrement,
  Column,
  Length,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from "sequelize-typescript";

@Table({
  underscored: true,
})
export class Wallet extends Model<Wallet> {
  @AutoIncrement
  @PrimaryKey
  @Column
  public id: number;

  @Unique
  @Length({ min: 33, max: 35 })
  @Column
  public address: string;

  @Column
  public webhookUrl: string;
}
