import { AccountEntity } from '../entities/account.entity';
import { SendMoneyUseKeys } from '../ports/in/send-money.use-keys';
import { LoadAccountPort } from '../ports/out/load-account.port';
import { UpdateAccountActivityPort } from '../ports/out/update-account-activity.port';
import { SendMoneyCommand } from '../ports/in/send-money.command';

export class SendMoneyService implements SendMoneyUseKeys {
  constructor(
    private readonly _loadAccountPort: LoadAccountPort,
    private readonly _updateAccountActivity: UpdateAccountActivityPort,
  ) {}

  get loadAccountPort(): LoadAccountPort {
    return this._loadAccountPort;
  }

  get updateAccountActivity(): UpdateAccountActivityPort {
    return this._updateAccountActivity;
  }

  sendMoney(command: SendMoneyCommand): boolean {
    const sourceAccount: AccountEntity = this.loadAccountPort.loadAccount(command.sourceAccountId);
    const targetAccount: AccountEntity = this.loadAccountPort.loadAccount(command.targetAccountId);

    if (!sourceAccount.withdraw(command.money, command.targetAccountId)) {
      return false;
    }

    if (!targetAccount.deposit(command.money, command.sourceAccountId)) {
      return false;
    }

    this.updateAccountActivity.updateAccountActivityPort(command.sourceAccountId);
    this.updateAccountActivity.updateAccountActivityPort(command.targetAccountId);

    return true;
  }
}
