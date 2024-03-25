import { Sequelize } from 'sequelize';

let sequelize: Sequelize;

try {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error('DATABASE_URL environment variable is not defined');
  }

  sequelize = new Sequelize(databaseUrl);
} catch (error) {
  let errorMessage = 'Something went wrong.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.error(errorMessage);
}

export { sequelize };
