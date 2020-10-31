import { ActivityWindowEntity } from './activity-window.entity';
import { ActivityEntity } from './activity.entity';
import { MoneyEntity } from './money.entity';

export type AccountId = string;

export class AccountEntity {
  constructor(
    private readonly _id: AccountId,
    private readonly _baseBalance: MoneyEntity,
    private readonly _activityWindow: ActivityWindowEntity,
  ) {}

  get id(): AccountId {
    return this._id;
  }

  get baseBalance(): MoneyEntity {
    return this._baseBalance;
  }

  get activityWindow(): ActivityWindowEntity {
    return this._activityWindow;
  }

  public calculateBalance(): MoneyEntity {
    return MoneyEntity.add(
      this.baseBalance,
      this.activityWindow.calculateBalance(this.id),
    );
  }

  public withdraw(money: MoneyEntity, targetAccountId: AccountId): boolean {
    if (this._mayWithdrawMoney(money)) {
      return false;
    }
    const withdrawal: ActivityEntity = new ActivityEntity(
      this.id,
      this.id,
      targetAccountId,
      money
    );
    this.activityWindow.addActivity(withdrawal);
    return true;
  }

  public deposit(money: MoneyEntity, sourceAccountId: AccountId): boolean {
    const deposit: ActivityEntity = new ActivityEntity(
      this.id,
      sourceAccountId,
      this.id,
      money
    );
    this.activityWindow.addActivity(deposit);
    return true;
  }

  private _mayWithdrawMoney(money: MoneyEntity): boolean {
    return MoneyEntity
      .add(this.calculateBalance(), money.negative())
      .isPositiveOrZero();
  }
}
