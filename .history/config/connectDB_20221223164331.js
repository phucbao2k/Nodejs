import { Sequelize } from 'sequelize';
import { createRequire } from 'module'
const require = createRequire(import.meta.url);
require('dotenv').config();
// Option 2: Passing parameters separately (other dialects)
const sequelize = new Sequelize(
  process.env.DB_DATABASE_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_,
    logging: false,
    dialectOptions:
      process.env.DB_SSL === 'true' ?
        {
          ssl: {
            require: true,
            rejectUnauthorized: false
          }
        } : {}
    ,
    query: {
      "raw": true
    },
    timezone: "+07:00"
  });

let connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
export default connectDB;
//