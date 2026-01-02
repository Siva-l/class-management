import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import ormConfig from './ds.config';

dotenv.config();

const publicDataSource = new DataSource(ormConfig);
export default publicDataSource;
