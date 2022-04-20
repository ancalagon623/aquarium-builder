const sql = require('../db/queries');
const { pool } = require('../db');

const setupDevDatabase = async (req, res) => {
  pool.query(sql.createUsersTable(), (err, result) => {
    if (err) console.log(err);
    pool.query(
      sql.insertOneUser([
        'Michael Grumbine',
        'mg3',
        'giraffes',
        new Date().toISOString().slice(0, -1).replace('T', ' '),
      ]),
      (err, result2) => {
        if (err) console.log(err);
        res.send(result2.rows[0]);
      }
    );
  });
};

module.exports = setupDevDatabase;
