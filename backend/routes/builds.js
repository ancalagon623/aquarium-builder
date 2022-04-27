const { pool, sql } = require('../db');

exports.createBuild = async (req, res) => {
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

exports.updateBuild = async (req, res) => {
  const { aquariumId } = req.params;
  if (req.body.action === 'add_equipment') {
    const { rows } = await pool.query(
      sql.addEquipmentToBuild(req.body.eq_id, aquariumId)
    );
    if (rows) {
      const equipmentList = await pool.query(
        sql.getEquipmentInBuild(aquariumId)
      );
      if (equipmentList.rows) {
        res.send(equipmentList.rows);
      }
    } else {
      res.send(500, 'Internal Server Error');
    }
  } else {
    // const { rows } = await pool.query(
    //   sql.updateBuild(req.body.eq_id, aquariumId)
    // );
    // if (rows) {
    //   res.send(rows[0]);
    // } else {
    //   res.send(500, 'Internal Server Error');
    // }
    res.send('under construction');
  }
};
