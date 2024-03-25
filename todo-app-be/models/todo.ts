import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db';

class Todo extends Model {
  public id!: string;
  public name!: string;
  public marked!: boolean;
  public userId!: string;
}

Todo.init(
  {
    id: {
      type: DataTypes.TEXT,
      primaryKey: true,
      unique: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    marked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'todo',
  }
);

const errorMessage = 'Failed to sync to database';
Todo.sync().catch((error) => console.error(`${errorMessage}: ${error}`));

export default Todo;
