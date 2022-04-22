const sql = require('../db/queries');
const { pool } = require('../db');

const setupDevDatabase = async (req, res) => {
  try {
    await pool.query(sql.dropAll()).catch((err) => console.log(err));
    await pool.query(sql.createUsersTable()).catch((err) => console.log(err));
    await pool.query(sql.createBuildsTable()).catch((err) => console.log(err));
    await pool
      .query(sql.createEquipmentTable())
      .catch((err) => console.log(err));
    await pool
      .query(sql.createJunctionTable())
      .catch((err) => console.log(err));

    const newUser = await pool.query(
      sql
        .insertOneUser(['Michael Grumbine', 'mg3', 'giraffes'])
        .catch((err) => console.log(err))
    );
    const newBuilds = await pool.query(sql.addBuilds);
  } catch (err) {
    console.log(err);
  }
};

module.exports = setupDevDatabase;
