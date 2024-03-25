import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db';

class User extends Model {
  public id!: string;
  public username!: string;
  public passwordHash!: string;
}

User.init(
  {
    id: {
      type: DataTypes.TEXT,
      primaryKey: true,
      unique: true,
    },
    username: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    passwordHash: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'user',
  }
);

const errorMessage = 'Failed to sync to database';
User.sync().catch((error) => console.error(`${errorMessage}: ${error}`));

export default User;
