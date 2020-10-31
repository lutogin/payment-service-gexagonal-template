import { AccountId } from '../../entities/account.entity';
import { MoneyEntity } from '../../entities/money.entity';

/**
 * Query interface на получение баланса.
 * Будет использовано в имплементации для адаптера и отображает его реализацию.
 */
export interface GetAccountBalanceQuery {
  getAccountBalance(accountId: AccountId): Promise<MoneyEntity>;
}
