import { DataTypes } from "sequelize";
import orm from "../config/sequelize.ts";

export type Category = {
  id_category: number;
  name: string;
  dateCreated?: Date;
};

export const Categories = orm.define(
  "categories",
  {
    id_category: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateCreated: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    freezeTableName: true,
    tableName: "categories",
    timestamps: false,
  }
);

export const connect = async function () {
  await orm.authenticate();
  console.log("ORM Connected");
};

export class CategoriesModel {
  getAll = async () => {
    try {
      const results = await Categories.findAll();
      if (!results) {
        return null;
      }
      return results.map((res) => res.toJSON());
    } catch (error) {
      console.error("Error in model: ", error);
      throw error;
    }
  };

  getById = async (id_category: number) => {
    try {
      const results = await Categories.findOne({
        where: {
          id_category: id_category,
        },
      });
      if (!results) {
        return null;
      }
      return results.toJSON();
    } catch (error) {
      console.error("Error in model: ", error);
      throw error;
    }
  };

  create = async (dataCategory: Category) => {
    try {
      const category = await Categories.create({
        name: dataCategory.name,
      });
      return category.toJSON().id_category;
    } catch (error) {
      console.error("Error in model: ", error);
      throw error;
    }
  };

  updateById = async (id_category: number, dataCategory: Category) => {
    try {
      const [updatedRows] = await Categories.update(
        {
          name: dataCategory.name,
        },
        {
          where: {
            id_category: id_category,
          },
        }
      );
      return updatedRows;
    } catch (error) {
      console.error("Error in model: ", error);
      throw error;
    }
  };

  deleteById = async (id_category: number) => {
    try {
      const deletedRows = await Categories.destroy({
        where: {
          id_category: id_category,
        },
      });
      return deletedRows;
    } catch (error) {
      console.error("Error in model: ", error);
      throw error;
    }
  };
}
