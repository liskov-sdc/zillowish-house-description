const mysql = require('mysql');
const { password } = require('../config.js');

const db = require('knex')({
  client: 'mysql',
  connection: {
    host : 'localhost',
    user : 'root',
    password,
    database : 'zillowDescription'
  },
  pool: { min: 0, max: 10 }
});

module.exports = db;
