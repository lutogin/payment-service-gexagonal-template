import { SendMoneyCommand } from './send-money.command';

export const SendMoneyUseCaseSymbol = Symbol('SendMoneyUseKeys');

/**
 * UseKeys - реализует сервисы в домене, т.е. то как можно работать с доменом.
 * Зачастую соеденяют in и out.
 */
export interface SendMoneyUseKeys {
  sendMoney(command: SendMoneyCommand): Promise<boolean>;
}
