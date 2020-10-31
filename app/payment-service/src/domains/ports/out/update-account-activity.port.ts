import { AccountEntity } from '../../entities/account.entity';

export interface UpdateAccountActivityPort {
  updateAccountActivityPort(account: AccountEntity);
}
