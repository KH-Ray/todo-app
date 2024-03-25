"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const express_1 = __importDefault(require("express"));
const models_1 = require("../models");
dotenv_1.default.config();
const router = (0, express_1.default)();
let secret;
let token;
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield models_1.User.findOne({
        where: {
            username,
        },
    });
    const passwordCorrect = user === null ? false : yield bcrypt_1.default.compare(password, user.passwordHash);
    if (!(user && passwordCorrect)) {
        return res.status(401).json({
            error: 'invalid username or password',
        });
    }
    const userForToken = {
        username: user.username,
        id: user.id,
    };
    try {
        secret = process.env.SECRET;
        if (!secret) {
            throw new Error('SECRET environment variable is not defined');
        }
        token = jsonwebtoken_1.default.sign(userForToken, secret);
        if (!token) {
            throw new Error('token variable is not defined');
        }
    }
    catch (error) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += 'Error: ' + error.message;
        }
        console.error(errorMessage);
    }
    return res.status(200).send({ token, username: user.username, id: user.id });
}));
exports.default = router;
