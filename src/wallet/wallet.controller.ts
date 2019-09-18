import { Controller, Post, Body, Query, Res, HttpStatus } from "@nestjs/common";
import { CreateWalletDto } from "./dto/create-wallet.dto";
import { WalletService } from "./wallet.service";

import { Response } from "express";

@Controller("wallets")
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  async create(
    @Body() createWalletDto: CreateWalletDto,
    @Query("apiKey") apiKey: string,
    @Res() res: Response,
  ) {
    const apiKeyConfiguration = process.env.API_KEY || "test";
    if (apiKey === apiKeyConfiguration) {
      await this.walletService.create(createWalletDto);
      res.status(HttpStatus.CREATED).send();
    } else {
      res.status(HttpStatus.UNAUTHORIZED).send();
    }
  }
}
