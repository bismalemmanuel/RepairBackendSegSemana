// const { Sequelize } = require('sequelize');

// const db = new Sequelize({
//   dialect: process.env.DIACLECT,
//   host: process.env.HOST,
//   username: 'postgres',
//   password: process.env.DB_PASSWORD,
//   database: process.env.DATABASE,
//   logging: false,
// });

// module.exports = { db };

const { Sequelize } = require('sequelize');

const db = new Sequelize(
  process.env.DATABASE,
  'root',
  process.env.DB_PASSWORD,
  {
    host: process.env.HOST,
    dialect: process.env.DIACLECT,
    logging: false,
  }
);

module.exports = { db };
