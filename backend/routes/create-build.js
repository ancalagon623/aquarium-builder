const { pool, sql } = require('../db');

const createBuild = async (req, res) => {
  const build = req.body;
  // eslint-disable-next-line camelcase
  const { user_id } = req.user;
  try {
    const created = await pool.query(sql.newBuild(build, user_id));
    if (created.rows.length) {
      res.send(created.rows[0]);
    } else {
      res.send(500, 'Internal Database Error');
    }
  } catch (err) {
    res.send(500, 'Internal Database Error');
  }
};

module.exports = createBuild;
