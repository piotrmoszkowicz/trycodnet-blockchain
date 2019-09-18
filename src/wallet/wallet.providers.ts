import { Wallet } from "./wallet.entity";

export const walletProviders = [
  {
    provide: "WALLET_REPOSITORY",
    useValue: Wallet,
  },
];
