"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../utils/db");
class User extends sequelize_1.Model {
}
User.init({
    id: {
        type: sequelize_1.DataTypes.TEXT,
        primaryKey: true,
        unique: true,
    },
    username: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    passwordHash: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
}, {
    sequelize: db_1.sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'user',
});
const errorMessage = 'Failed to sync to database';
User.sync().catch((error) => console.error(`${errorMessage}: ${error}`));
exports.default = User;
