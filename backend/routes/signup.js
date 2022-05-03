const bcrypt = require('bcrypt');
const { pool, sql } = require('../db');

const signup = async (req, res) => {
  const { name, username, password } = req.body;

  const hash = bcrypt.hashSync(password, 5);

  try {
    const newUserId = await pool.query(
      sql.insertOneUser([name, username, hash, password])
    );

    res.send(newUserId);
  } catch (err) {
    res.send(500, err);
  }
};

module.exports = signup;
