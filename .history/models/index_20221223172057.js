
import { createRequire } from 'module'
const require = createRequire(import.meta.url);
require('dotenv').config();
// const fs = require('fs');
import fs from 'fs'
// const path = require('path');
import path from 'path';
// const Sequelize = require('sequelize');
import { Sequelize, DataTypes } from "sequelize";
const __filename = fileURLToPath(import.meta.url);
const basename = path.basename(__filename);
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.json')[env];
const db = {};
import allcode from './allcode.js';
import booking from './booking.js';
import clinic from './clinic.js';
import doctor_infor from './doctor_infor.js';
import handbook from './handbook.js';
import markdown from './markdown.js';
import schedule from './schedule.js';
import speciality from './speciality.js';
import user from './user.js';
let sequelize;

// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }
const customizeConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
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
}

sequelize = new Sequelize(
  process.env.DB_DATABASE_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  customizeConfig);

fs.readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach(file => {
    // eslint-disable-next-line global-require,import/no-dynamic-require
    const model = {
      User: user(sequelize, Sequelize.DataTypes),
      Allcode: allcode(sequelize, Sequelize.DataTypes),
      Booking: booking(sequelize, Sequelize.DataTypes),
      Clinic: clinic(sequelize, Sequelize.DataTypes),
      Doctor_Infor: doctor_infor(sequelize, Sequelize.DataTypes),
      Handbook: handbook(sequelize, Sequelize.DataTypes),
      Markdown: markdown(sequelize, Sequelize.DataTypes),
      Sche: booking(sequelize, Sequelize.DataTypes),
      Booking: booking(sequelize, Sequelize.DataTypes),
    }
    db[model.name] = model;
  
  });
// module.Module._extensions['.js'] = function (module, __dirname) {
//   module._compile(fs.readdirSync(__dirname)
//     .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
//     .forEach(file => {
//       // eslint-disable-next-line global-require,import/no-dynamic-require
//       const model = require(path.join(__dirname, file)).default(sequelize, Sequelize.DataTypes);
//       db[model.name] = model;
//     }));
// };
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;