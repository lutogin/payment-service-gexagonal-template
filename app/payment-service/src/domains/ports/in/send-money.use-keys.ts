import { SendMoneyCommand } from './send-money.command';

export interface SendMoneyUseKeys {
  sendMoney(command: SendMoneyCommand);
}
