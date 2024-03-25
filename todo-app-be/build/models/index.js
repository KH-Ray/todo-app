"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Todo = void 0;
const todo_1 = __importDefault(require("./todo"));
exports.Todo = todo_1.default;
const user_1 = __importDefault(require("./user"));
exports.User = user_1.default;
const errorMessage = 'Failed to sync to database';
user_1.default.hasMany(todo_1.default);
todo_1.default.belongsTo(user_1.default);
todo_1.default.sync({ alter: true }).catch((error) => console.error(`${errorMessage}: ${error}`));
user_1.default.sync({ alter: true }).catch((error) => console.error(`${errorMessage}: ${error}`));
