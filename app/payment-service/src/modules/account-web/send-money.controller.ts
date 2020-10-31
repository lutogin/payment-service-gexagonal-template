import { Controller, Inject, Post, Query } from '@nestjs/common';
import { SendMoneyCommand } from '../../domains/ports/in/send-money.command';
import { SendMoneyUseCaseSymbol, SendMoneyUseKeys } from '../../domains/ports/in/send-money.use-keys';
import { MoneyEntity } from 'src/domains/entities/money.entity';

@Controller('/account')
export class SendMoneyController {
  constructor(
    @Inject(SendMoneyUseCaseSymbol)
    private readonly _sendMoneyUseCase: SendMoneyUseKeys,
  ) {}

  get sendMoneyUseCase(): SendMoneyUseKeys {
    return this._sendMoneyUseCase;
  }

  @Post('/send')
  async sendMoney(
    @Query('sourceAccount') sourceAccountId: string,
    @Query('targetAccount') targetAccountId: string,
    @Query('amount') amount: number,
  ) {
    // SendMoneyUseKeys принимает комманду, создадим ее
    const command: SendMoneyCommand = new SendMoneyCommand(
      sourceAccountId,
      targetAccountId,
      MoneyEntity.of(amount),
    );

    const result = await this.sendMoneyUseCase.sendMoney(command);
  }
}
