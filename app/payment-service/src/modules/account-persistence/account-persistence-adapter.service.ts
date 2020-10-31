import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoadAccountPort } from '../../domains/ports/out/load-account.port';
import { UpdateAccountActivityPort } from '../../domains/ports/out/update-account-activity.port';
import { AccountEntity, AccountId } from 'src/domains/entities/account.entity';
import { AccountMapper } from './account.mapper';
import { AccountOrmEntity } from './account.orm-entity';
import { ActivityOrmEntity } from './activity.orm-entity';

/**
 * Адаптер будет имплементировать все out порты и работать непостредственно с БД.
 * Поскольку AccountPersistenceAdapterService реализует все out порты (LoadAccountPort, UpdateAccountActivityPort)
 * мы передадим его в inject как оба аргумента в DI модуля
 */
@Injectable()
export class AccountPersistenceAdapterService implements LoadAccountPort, UpdateAccountActivityPort {
  constructor(
    @InjectRepository(AccountOrmEntity)
    private readonly _accountOrmRepository: Repository<AccountOrmEntity>,
    @InjectRepository(ActivityOrmEntity)
    private readonly _activityOrmRepository: Repository<ActivityOrmEntity>
  ) {}

  get accountOrmRepository(): Repository<AccountOrmEntity> {
    return this._accountOrmRepository;
  }

  get activityOrmRepository(): Repository<ActivityOrmEntity> {
    return this._activityOrmRepository;
  }

  async loadAccount(accountId: AccountId): Promise<AccountEntity> {
    const account = await this.accountOrmRepository.findOne({ userId: accountId });
    if (!account) {
      throw new Error('Account not found');
    }
    const activities = await this.activityOrmRepository.find({ ownerAccountId: accountId });
    return AccountMapper.mapToDomain(account, activities);
  }

  updateAccountActivityPort(account: AccountEntity) {
    account.activityWindow.activities.forEach((activity) => {
      if (activity.id) {
        this.activityOrmRepository.save(AccountMapper.mapToOrmEntity(activity));
      }

    });
  }

}
