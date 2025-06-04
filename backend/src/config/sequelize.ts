import { Sequelize } from "sequelize";
const orm = new Sequelize(
  process.env.DB_NAME || "default_db",
  process.env.DB_USER || "default_user",
  process.env.DB_PASSWORD || "default_password",
  {
    host: process.env.DB_HOST,
    port: 5432,
    dialect: "postgres",
    pool: {
      max: 1,
      idle: 10000,
      acquire: 60000,
    },
  }
);

export default orm;
