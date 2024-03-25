import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { NextFunction, Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Todo, User } from '../models';

dotenv.config();

const router = Router();
const secret = process.env.SECRET;

/* eslint-disable */
const tokenExtractor = (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  const authorization = req.get('authorization');

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      // @ts-ignore
      req.decodedToken = jwt.verify(authorization.substring(7), secret);
    } catch (error) {
      // @ts-ignore
      return res.status(401).json({ error: 'token invalid' });
    }
  } else {
    // @ts-ignore
    return res.status(401).json({ error: 'token missing' });
  }

  next();
};
/* eslint-enable */

router.get('/', async (_req, res) => {
  const todos = await Todo.findAll({
    attributes: {
      exclude: ['password_hash'],
    },
  });

  res.status(200).json(todos);
});

// @ts-expect-error
router.post('/', tokenExtractor, async (req, res) => {
  try {
    // @ts-ignore
    const user = await User.findByPk(req.decodedToken.id);

    if (!user) {
      throw new Error('User not found!');
    }

    const todo = await Todo.create({
      id: uuidv4(),
      content: req.body.content as string,
      marked: req.body.marked as boolean,
      userId: user.id,
    });

    res.status(201).json(todo);
  } catch (error) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += 'Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

// @ts-expect-error
router.delete('/:id', tokenExtractor, async (req, res) => {
  try {
    // @ts-ignore
    const user = await User.findByPk(req.decodedToken.id);
    const todo = await Todo.findByPk(req.params.id);

    if (!todo || !user) {
      throw new Error('Failed to delete todo');
    }

    if (user.id !== todo.userId) {
      throw new Error('Only the user that posted this blog can delete!');
    }

    await todo.destroy();
    res.status(204).end();
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.delete('/completed/:id', async (req, res) => {
  try {
    // @ts-ignore
    const userId = req.params.id;

    if (!userId) {
      throw new Error('Failed to delete todo');
    }

    await Todo.destroy({
      where: {
        userId: userId,
        marked: true,
      },
    });

    res.status(204).end();
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

// @ts-expect-error
router.put('/:id', tokenExtractor, async (req, res) => {
  try {
    // @ts-ignore
    const user = await User.findByPk(req.decodedToken.id);
    const todo = await Todo.findByPk(req.params.id);

    if (!todo || !user) {
      throw new Error('Failed to update todo');
    }

    if (user.id !== todo.userId) {
      throw new Error('Only the user that posted this blog can update!');
    }

    todo.marked = !todo.marked;
    await todo.save();

    res.status(204).end();
  } catch (error) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
