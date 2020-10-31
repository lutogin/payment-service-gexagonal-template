import { AccountId } from '../entities/account.entity';
import { MoneyEntity } from '../entities/money.entity';
import { GetAccountBalanceQuery } from '../ports/in/get-account-balance.query';
import { LoadAccountPort } from '../ports/out/load-account.port';

/**
 * Сервис соеденит input и output порт.
 * Имплементим GetAccountBalanceQuery in порт.
 */
export class GetAccountBalanceService implements GetAccountBalanceQuery {
  constructor(
    // Применяем порт для загрузки аккунта из базы данных.
    private readonly _loadAccountPort: LoadAccountPort,
  ) {}

  get loadAccountPort(): LoadAccountPort {
    return this._loadAccountPort;
  }

  async getAccountBalance(accountId: AccountId): Promise<MoneyEntity> {
     const account = await this.loadAccountPort.loadAccount(accountId);
     return account.calculateBalance();
  }
}
