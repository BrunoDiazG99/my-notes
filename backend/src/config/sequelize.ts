import { Sequelize } from "sequelize";

const orm = new Sequelize("myNotes", "root", "paltita99sql", {
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 1,
    idle: 10000,
    acquire: 60000,
  },
});

export default orm;
