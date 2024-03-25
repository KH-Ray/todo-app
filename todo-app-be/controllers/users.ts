import bcrypt from 'bcrypt';
import { Todo, User } from '../models';
import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { TodoRequestBody } from '../utils/types';

const router = Router();

router.get('/', async (_req, res) => {
  const users = await User.findAll({
    include: {
      model: Todo,
      attributes: ['id', 'content', 'marked'],
    },
  });

  res.status(200).json(users);
});

router.get('/:id', async (req, res) => {
  const user = await User.findOne({
    where: {
      id: req.params.id,
    },
    include: {
      model: Todo,
      attributes: ['id', 'content', 'marked'],
    },
  });

  res.status(200).json(user);
});

router.post('/', async (req, res) => {
  const { username, password } = req.body as TodoRequestBody;

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({
    id: uuidv4(),
    username,
    passwordHash,
  });

  res.status(201).json(user);
});

router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!user) {
      throw new Error('Failed to delete user');
    }

    await user.destroy();
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
