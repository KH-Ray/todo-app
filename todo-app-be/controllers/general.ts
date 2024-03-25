import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Router from 'express';
import { User } from '../models';
import { TodoRequestBody } from '../utils/types';

dotenv.config();

const router = Router();

let secret: string | undefined;
let token: string | undefined;

router.post('/login', async (req, res) => {
  const { username, password } = req.body as TodoRequestBody;

  const user = await User.findOne({
    where: {
      username,
    },
  });

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

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

    token = jwt.sign(userForToken, secret);

    if (!token) {
      throw new Error('token variable is not defined');
    }
  } catch (error) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += 'Error: ' + error.message;
    }
    console.error(errorMessage);
  }

  return res.status(200).send({ token, username: user.username, id: user.id });
});

export default router;
