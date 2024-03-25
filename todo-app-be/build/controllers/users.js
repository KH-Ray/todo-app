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
const bcrypt_1 = __importDefault(require("bcrypt"));
const models_1 = require("../models");
const express_1 = require("express");
const uuid_1 = require("uuid");
const router = (0, express_1.Router)();
router.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield models_1.User.findAll({
        include: {
            model: models_1.Todo,
            attributes: ['id', 'content', 'marked'],
        },
    });
    res.status(200).json(users);
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.User.findOne({
        where: {
            id: req.params.id,
        },
        include: {
            model: models_1.Todo,
            attributes: ['id', 'content', 'marked'],
        },
    });
    res.status(200).json(user);
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const passwordHash = yield bcrypt_1.default.hash(password, 10);
    const user = yield models_1.User.create({
        id: (0, uuid_1.v4)(),
        username,
        passwordHash,
    });
    res.status(201).json(user);
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield models_1.User.findOne({
            where: {
                id: req.params.id,
            },
        });
        if (!user) {
            throw new Error('Failed to delete user');
        }
        yield user.destroy();
        res.status(204).end();
    }
    catch (error) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
}));
exports.default = router;
