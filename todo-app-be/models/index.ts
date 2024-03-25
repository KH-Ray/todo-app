import Todo from './todo';
import User from './user';

const errorMessage = 'Failed to sync to database';

User.hasMany(Todo);
Todo.belongsTo(User);
Todo.sync({ alter: true }).catch((error) =>
  console.error(`${errorMessage}: ${error}`)
);
User.sync({ alter: true }).catch((error) =>
  console.error(`${errorMessage}: ${error}`)
);

export { Todo, User };
