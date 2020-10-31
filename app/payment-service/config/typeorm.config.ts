import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: join(__dirname, '..', '..', 'data', 'data.sqlite'),
  entities: ['dist/src/**/*.entity.{js,ts}'],
  migrations: ['dist/src/migrations/*.{js,ts}'],
  logging: true,
  autoLoadEntities: true,
  synchronize: false,
  migrationsRun: false,
};
