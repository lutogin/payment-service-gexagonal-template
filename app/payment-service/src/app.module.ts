import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '../config/typeorm.config';
import { AccountPersistenceModule } from './modules/account-persistence/account-persistence.module';
import { AccountWebModule } from './modules/account-web/account-web.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AccountPersistenceModule,
    AccountWebModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
