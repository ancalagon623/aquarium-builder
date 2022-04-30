const { pool, sql } = require('../db');

const calcPrice = (equipment) =>
  equipment.reduce((acc, e) => {
    // eslint-disable-next-line no-param-reassign
    acc += Math.trunc(parseFloat(e.price.slice(1)) * 100);
    return acc;
  }, 0);

exports.getBuild = async (req, res) => {
  const id = req.user.user_id;
  const { aquariumId } = req.params;

  try {
    const foundBuild = await pool.query(sql.getBuildById(aquariumId));
    if (foundBuild.rows.find((b) => b.user_id === id)) {
      const equipment = await pool.query(sql.getEquipmentInBuild(aquariumId));
      res.send({
        ...foundBuild.rows[0],
        equipment: {
          all: equipment.rows,
          normalized: equipment.rows.reduce((acc, curr) => {
            if (!acc[curr.type]) {
              acc[curr.type] = [];
            }
            acc[curr.type].push(curr);
            return acc;
          }, {}),
        },
      });
    } else {
      res.send(401, 'You do not have editing access to that build');
    }
  } catch (err) {
    res.send(500, 'Internal Database Error');
  }
};

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

exports.deleteBuild = async (req, res) => {
  const { aquariumId } = req.params;
  // eslint-disable-next-line camelcase
  try {
    const deleted = await pool.query(sql.deleteBuild(aquariumId));

    res.send(deleted.rows[0]);
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
      const equipment = await pool.query(sql.getEquipmentInBuild(aquariumId));
      const saved = await pool.query(
        sql.updatePrice(aquariumId, calcPrice(equipment.rows))
      );
      res.send({
        ...saved.rows[0],
        equipment: {
          all: equipment.rows,
          normalized: equipment.rows.reduce((acc, curr) => {
            if (!acc[curr.type]) {
              acc[curr.type] = [];
            }
            acc[curr.type].push(curr);
            return acc;
          }, {}),
        },
      });
    } else {
      res.send(500, 'Internal Server Error');
    }
  }

  if (req.body.action === 'update_info') {
    const updatedBuild = await pool.query(
      sql.updateNameAndDescription(aquariumId, req.body.info)
    );
    res.send(updatedBuild.rows[0]);
  }
};

exports.deleteEquipmentFromBuild = async (req, res) => {
  const { equipmentId, aquariumId } = req.params;

  try {
    await pool.query(sql.deleteEquipmentFromBuild(equipmentId, aquariumId));
    const equipment = await pool.query(sql.getEquipmentInBuild(aquariumId));
    const savedBuild = await pool.query(
      sql.updatePrice(aquariumId, calcPrice(equipment.rows))
    );
    res.send({
      ...savedBuild.rows[0],
      equipment: {
        all: equipment.rows,
        normalized: equipment.rows.reduce((acc, curr) => {
          if (!acc[curr.type]) {
            acc[curr.type] = [];
          }
          acc[curr.type].push(curr);
          return acc;
        }, {}),
      },
    });
  } catch (err) {
    res.send(500, err);
  }
};
