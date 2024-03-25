import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const app = express();

import cors from 'cors';

import generalRouter from './controllers/general';
import todosRouter from './controllers/todos';
import usersRouter from './controllers/users';

app.use(cors());
app.use(express.json());
app.use(express.static('dist'));

app.use('/api', generalRouter);
app.use('/api/todos', todosRouter);
app.use('/api/users', usersRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
