const { pool, sql } = require('../db');

const getAllCategories = async (req, res) => {
  const result = await pool.query(sql.getAllCategories()).catch((err) => {
    req.send(500, 'Internal Server Error');
  });

  if (result.rows.length) {
    req.send(result.rows);
  }
};

module.exports = getAllCategories;
