import { DataTypes, where } from "sequelize";
import orm from "../config/sequelize.js";
import { Categories } from "./categories.model.ts";

export type Note = {
  id_note: number;
  title: string;
  content: string;
  color: string;
  id_category: number;
  isActive?: boolean;
  dateCreated?: Date;
};

export const Notes = orm.define("notes", {
  id_note: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  color: {
    type: DataTypes.CHAR(7),
    allowNull: false,
    defaultValue: "#ffffff",
  },
  id_category: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Categories,
      key: "id_category",
    },
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  dateCreated: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

Categories.hasMany(Notes, {
  foreignKey: "id_category",
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
});
Notes.belongsTo(Categories, { foreignKey: "id_category" });

export const connect = async function () {
  await orm.authenticate();
  console.log("ORM Connected");
};

export class NotesModel {
  getAll = async (category?: string) => {
    try {
      const results = await Notes.findAll({
        include: [
          {
            model: Categories,
            as: "category",
            attributes: ["id_category", "name"],
          },
        ],
        where: {
          ...(category ? { id_category: category } : {}),
        },
      });
      if (!results) {
        return null;
      }
      return results.map((res) => res.toJSON());
    } catch (error) {
      console.log("Error in model: ", error);
      throw error;
    }
  };

  getArchived = async () => {
    try {
      const results = await Notes.findAll({
        where: {
          isActive: false,
        },
      });
      if (!results) {
        return null;
      }
      return results.map((res) => res.toJSON());
    } catch (error) {
      console.log("Error in model: ", error);
      throw error;
    }
  };

  create = async (dataNote: Note) => {
    try {
      const note = await Notes.create({
        title: dataNote.title,
        content: dataNote.content,
        color: dataNote.color,
        id_category: dataNote.id_category,
      });
      return note.toJSON().id_note;
    } catch (error) {
      console.log("Error in model: ", error);
      throw error;
    }
  };

  updateById = async (id_note: number, dataNote: Note) => {
    try {
      const [updatedRows] = await Notes.update(
        {
          title: dataNote.title,
          content: dataNote.content,
          color: dataNote.color,
          id_category: dataNote.id_category,
        },
        {
          where: {
            id_note: id_note,
          },
        }
      );
      return updatedRows;
    } catch (error) {
      console.log("Error in model: ", error);
      throw error;
    }
  };

  deleteById = async (id_note: number) => {
    try {
      const deletedRows = await Notes.destroy({
        where: {
          id_note: id_note,
        },
      });
      return deletedRows;
    } catch (error) {
      console.log("Error in model: ", error);
      throw error;
    }
  };

  archive = async (id_note: number) => {
    try {
      const [updatedRows] = await Notes.update(
        {
          isActive: false,
        },
        {
          where: {
            id_note: id_note,
          },
        }
      );
      return updatedRows;
    } catch (error) {
      console.log("Error in model: ", error);
      throw error;
    }
  };

  restore = async (id_note: number) => {
    try {
      const [updatedRows] = await Notes.update(
        {
          isActive: true,
        },
        {
          where: {
            id_note: id_note,
          },
        }
      );
      return updatedRows;
    } catch (error) {
      console.log("Error in model: ", error);
      throw error;
    }
  };
}
