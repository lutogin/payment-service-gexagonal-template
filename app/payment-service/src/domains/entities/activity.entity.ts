import { AccountId } from './account.entity';
import { MoneyEntity } from './money.entity';

export type ActivityId = string | number | null ;

export class ActivityEntity {
  constructor(
    private readonly _ownerAccountId: AccountId,
    private readonly _sourceAccountId: AccountId,
    private readonly _targetAccountId: AccountId,
    private readonly _money: MoneyEntity,
    private readonly _timestamp: Date = new Date(),
    private readonly _id?: ActivityId,
  ) {}

  get ownerAccountId(): AccountId {
    return this._ownerAccountId;
  }

  get id(): ActivityId {
    return this._id === undefined ? null : this._id;
  }

  get sourceAccountId(): AccountId {
    return this._sourceAccountId;
  }

  get targetAccountId(): AccountId {
    return this._targetAccountId;
  }

  get money(): MoneyEntity {
    return this._money;
  }

  get timestamp(): Date {
    return this._timestamp;
  }
}
