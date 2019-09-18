import { Sequelize } from "sequelize-typescript";

import { Transaction } from "../transaction/transaction.entity";
import { Wallet } from "../wallet/wallet.entity";

export const databaseProviders = [
  {
    provide: "SEQUELIZE",
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: "mysql",
        host: process.env.DATABASE_HOST || "localhost",
        port: 3306,
        username: process.env.DATABASE_USERNAME || "root",
        password: process.env.DATABASE_PASSWORD || "12345",
        database: process.env.DATABASE_NAME || "trycodnet-blockchain",
      });
      sequelize.addModels([Transaction, Wallet]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
