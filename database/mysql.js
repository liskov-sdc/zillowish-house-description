require('dotenv').config();
const mysql = require('mysql');

const db = require('knex')({
  client: 'mysql',
  connection: {
    host : 'localhost', // replace before pushing up process.env.HOST,
    user : 'root',
    password: process.env.PASSWORD,
    database : 'zillowDescription'
  },
  pool: { min: 0, max: 10 }
});

module.exports = db;
