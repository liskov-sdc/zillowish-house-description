//*** */ add config file***
// host num is 172.31.47.61
// use process.env.SOMETHING for config file
require('dotenv').config();
const mysql = require('mysql');

const db = require('knex')({
  client: 'mysql',
  connection: {
    host : process.env.HOST, // replace before pushing up process.env.HOST,
    user : 'root',
    port: '3306',
    password: process.env.PASSWORD,
    database : 'zillowDescription'
  },
  pool: { min: 0, max: 10 }
});

module.exports = db;
