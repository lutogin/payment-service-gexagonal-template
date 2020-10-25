import { AccountId } from '../../entities/account.entity';

export interface UpdateAccountActivityPort {
  updateAccountActivityPort(accountId: AccountId);
}
