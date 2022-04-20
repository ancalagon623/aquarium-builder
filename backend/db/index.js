const { Pool } = require('pg');
const parser = require('pg-connection-string').parse;

const pool = new Pool(parser(process.env.DB));

module.exports = {
  pool,
};
