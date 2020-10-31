import { AccountEntity } from '../entities/account.entity';
import { SendMoneyUseKeys } from '../ports/in/send-money.use-keys';
import { LoadAccountPort } from '../ports/out/load-account.port';
import { UpdateAccountActivityPort } from '../ports/out/update-account-activity.port';
import { SendMoneyCommand } from '../ports/in/send-money.command';

/**
 * Имплементим SendMoneyUseKeys in порт.
 */
export class SendMoneyService implements SendMoneyUseKeys {
  constructor(
    // Применяем out порт для загрузки аккунта из базы данных.
    private readonly _loadAccountPort: LoadAccountPort,
    // Применяем out порт для работы с активностью.
    private readonly _updateAccountActivity: UpdateAccountActivityPort,
  ) {}

  get loadAccountPort(): LoadAccountPort {
    return this._loadAccountPort;
  }

  get updateAccountActivity(): UpdateAccountActivityPort {
    return this._updateAccountActivity;
  }

  async sendMoney(command: SendMoneyCommand): Promise<boolean> {
    const sourceAccount: AccountEntity = await this.loadAccountPort.loadAccount(command.sourceAccountId);
    const targetAccount: AccountEntity = await this.loadAccountPort.loadAccount(command.targetAccountId);

    if (!sourceAccount.withdraw(command.money, command.targetAccountId)) {
      return false;
    }

    if (!targetAccount.deposit(command.money, command.sourceAccountId)) {
      return false;
    }

    this.updateAccountActivity.updateAccountActivityPort(sourceAccount);
    this.updateAccountActivity.updateAccountActivityPort(targetAccount);

    return true;
  }
}
