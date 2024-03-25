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
const express_1 = require("express");
const uuid_1 = require("uuid");
const models_1 = require("../models");
dotenv_1.default.config();
const router = (0, express_1.Router)();
const secret = process.env.SECRET;
/* eslint-disable */
const tokenExtractor = (req, res, next) => {
    // @ts-ignore
    const authorization = req.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        try {
            // @ts-ignore
            req.decodedToken = jsonwebtoken_1.default.verify(authorization.substring(7), secret);
        }
        catch (error) {
            // @ts-ignore
            return res.status(401).json({ error: 'token invalid' });
        }
    }
    else {
        // @ts-ignore
        return res.status(401).json({ error: 'token missing' });
    }
    next();
};
/* eslint-enable */
router.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todos = yield models_1.Todo.findAll({
        attributes: {
            exclude: ['password_hash'],
        },
    });
    res.status(200).json(todos);
}));
// @ts-expect-error
router.post('/', tokenExtractor, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // @ts-ignore
        const user = yield models_1.User.findByPk(req.decodedToken.id);
        if (!user) {
            throw new Error('User not found!');
        }
        const todo = yield models_1.Todo.create({
            id: (0, uuid_1.v4)(),
            content: req.body.content,
            marked: req.body.marked,
            userId: user.id,
        });
        res.status(201).json(todo);
    }
    catch (error) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += 'Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
}));
// @ts-expect-error
router.delete('/:id', tokenExtractor, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // @ts-ignore
        const user = yield models_1.User.findByPk(req.decodedToken.id);
        const todo = yield models_1.Todo.findByPk(req.params.id);
        if (!todo || !user) {
            throw new Error('Failed to delete todo');
        }
        if (user.id !== todo.userId) {
            throw new Error('Only the user that posted this blog can delete!');
        }
        yield todo.destroy();
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
router.delete('/completed/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // @ts-ignore
        const userId = req.params.id;
        if (!userId) {
            throw new Error('Failed to delete todo');
        }
        yield models_1.Todo.destroy({
            where: {
                userId: userId,
                marked: true,
            },
        });
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
// @ts-expect-error
router.put('/:id', tokenExtractor, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // @ts-ignore
        const user = yield models_1.User.findByPk(req.decodedToken.id);
        const todo = yield models_1.Todo.findByPk(req.params.id);
        if (!todo || !user) {
            throw new Error('Failed to update todo');
        }
        if (user.id !== todo.userId) {
            throw new Error('Only the user that posted this blog can update!');
        }
        todo.marked = !todo.marked;
        yield todo.save();
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
