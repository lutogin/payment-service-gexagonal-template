import BigNumber from 'bignumber.js';

export class MoneyEntity {
  constructor(private readonly _amount: BigNumber) {}

  static ZERO(): MoneyEntity {
    return new MoneyEntity(new BigNumber(0));
  }

  static of(value: number) {
    return new MoneyEntity(new BigNumber(value));
  }

  get amount(): BigNumber {
    return this._amount;
  }

  static add(value: MoneyEntity, add: MoneyEntity): MoneyEntity {
    return new MoneyEntity(value.amount.plus(add.amount));
  }

  negative(): MoneyEntity {
    return new MoneyEntity(this.amount.negated());
  }

  isPositiveOrZero(): boolean {
    return this.amount.comparedTo(0) >= 0;
  }
}
