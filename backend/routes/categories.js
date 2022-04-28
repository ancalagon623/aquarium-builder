const { pool, sql } = require('../db');

exports.getEquipmentInCategory = async (req, res) => {
  const { categoryName } = req.params;

  const { rows } = await pool.query(sql.getEquipmentInCategory(categoryName));

  res.send(rows);
};

exports.getAllCategories = async (req, res) => {
  const result = await pool.query(sql.getAllCategories());

  if (result.rows.length) {
    res.send(result.rows);
  }
};
