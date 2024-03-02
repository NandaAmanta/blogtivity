import { registerAs } from "@nestjs/config";
import { DataSource, DataSourceOptions } from "typeorm";
import { config as dotenvConfig } from 'dotenv';
import { User } from "@app/blogtivity-lib/models/user.model";
import { CreateTables1707811188085 } from "../migrations/1707811188085-create-tables";

dotenvConfig({ path: [`${process.cwd()}/apps/auth/.env`, '.env'] });

const config = {
    type: process.env.DATABASE_TYPE || 'mysql',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT) || 3306,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME || 'auth',
    entities: [User],
    migrations: [CreateTables1707811188085],
    autoLoadEntities: true,
    synchronize: false,
}

export default registerAs('typeorm', () => config)
export const connectionSource = new DataSource(config as DataSourceOptions);