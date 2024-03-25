"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
let sequelize;
try {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
        throw new Error('DATABASE_URL environment variable is not defined');
    }
    exports.sequelize = sequelize = new sequelize_1.Sequelize(databaseUrl);
}
catch (error) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.error(errorMessage);
}
