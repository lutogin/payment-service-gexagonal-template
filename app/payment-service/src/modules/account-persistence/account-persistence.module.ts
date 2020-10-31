import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SendMoneyUseCaseSymbol } from '../../domains/ports/in/send-money.use-keys';
import { SendMoneyService } from '../../domains/service/send-money.service';
import { AccountPersistenceAdapterService } from './account-persistence-adapter.service';
import { AccountOrmEntity } from './account.orm-entity';
import { ActivityOrmEntity } from './activity.orm-entity';

/**
 * В модулях роаботающих с БД Global - норм.
 * с Global SendMoneyUseCaseSymbol и провайдер становится глобальным.
 */
@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      AccountOrmEntity,
      ActivityOrmEntity,
    ]),
  ],
  providers: [
    AccountPersistenceAdapterService,
    {
      provide: SendMoneyUseCaseSymbol,
      /**
       * Поскольку AccountPersistenceAdapterService реализует все out порты (LoadAccountPort, UpdateAccountActivityPort)
       * мы передадим его в inject как оба аргумента в DI модуля
       */
      useFactory: (accountPersistenceAdapter) => new SendMoneyService(accountPersistenceAdapter, accountPersistenceAdapter),
      inject: [
        // Инжектируем для конструктора в useFactory
        AccountPersistenceAdapterService,
      ],
    },
  ],
  exports: [
    SendMoneyUseCaseSymbol,
  ],
})
export class AccountPersistenceModule {}
