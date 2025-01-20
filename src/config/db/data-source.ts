import {  DataSource, DataSourceOptions } from 'typeorm';


export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: ['dist/**/*.entity.{ts,js}'],
    migrations: ["dist/migrations/*.js"],
    logging: true,
    synchronize: true
   
};


export const AppDataSource = new DataSource(dataSourceOptions);
