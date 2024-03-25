"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../utils/db");
class Todo extends sequelize_1.Model {
}
Todo.init({
    id: {
        type: sequelize_1.DataTypes.TEXT,
        primaryKey: true,
        unique: true,
    },
    content: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    marked: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    sequelize: db_1.sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'todo',
});
const errorMessage = 'Failed to sync to database';
Todo.sync().catch((error) => console.error(`${errorMessage}: ${error}`));
exports.default = Todo;
