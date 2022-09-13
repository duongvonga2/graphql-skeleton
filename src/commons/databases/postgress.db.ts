import { Sequelize } from "sequelize";

export const postgresDb = new Sequelize(process.env.POSTGRES_DB_URI || 'postgres://postgres:1@localhost:5432/graphql-test')