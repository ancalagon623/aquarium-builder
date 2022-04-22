const { Pool } = require('pg');
const parser = require('pg-connection-string').parse;
const sql = require('./queries');

const pool = new Pool(parser(process.env.DATABASE_URL));

module.exports = {
  pool,
  sql,
};
