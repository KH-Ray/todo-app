"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const general_1 = __importDefault(require("./controllers/general"));
const todos_1 = __importDefault(require("./controllers/todos"));
const users_1 = __importDefault(require("./controllers/users"));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static('dist'));
app.use('/api', general_1.default);
app.use('/api/todos', todos_1.default);
app.use('/api/users', users_1.default);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
