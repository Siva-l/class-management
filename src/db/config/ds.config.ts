import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config();

const entityLocation = resolve(__dirname, '../entities/*{.ts,.js}');

const ormConfig: any = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [entityLocation],
  migrationsTableName: 'migration',
  migrations: [resolve(__dirname, '../migrations/*{.ts,.js}')],
  synchronize: false,
  cache: true,
  ssl:
    process.env.NODE_ENV === 'production'
      ? {
          rejectUnauthorized: false,
        }
      : false,
};

export default ormConfig;
