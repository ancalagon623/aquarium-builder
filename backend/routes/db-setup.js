const axios = require('axios');
const { writeFileSync } = require('fs');
const { pool, sql } = require('../db');
const { scrapeProducts } = require('../db/scraper-aquatic-warehouse');

const setupDevDatabase = async (req, res) => {
  await pool.query(sql.dropTables()).catch((err) => console.log(err));
  await pool.query(sql.createUsersTable()).catch((err) => console.log(err));
  await pool.query(sql.createBuildsTable()).catch((err) => console.log(err));
  await pool.query(sql.createEquipmentTable()).catch((err) => console.log(err));
  await pool.query(sql.createJunctionTable()).catch((err) => console.log(err));

  await pool
    .query(
      sql.insertOneUser(['Michael Grumbine', 'mg3', 'giraffes', 'giraffes'])
    )
    .catch((err) => console.log(err));

  // // obtain data from Aquatic Warehouse
  // const products = await scrapeProducts();
  // const test = Object.values(products).flat();

  // // save to database
  // await pool.query(sql.addEquipment(Object.values(products).flat()));

  // TODO obtain data from Amazon
  const { data } = await axios.get(
    `https://api.rainforestapi.com/category?api_key=${process.env.RAINFOREST_API_KEY}&type=category&url=https://www.amazon.com/s/ref=nb_sb_noss?url=node%3D2975446011&field-keywords=`
  );

  console.log(data);
  writeFileSync('./amazon-data-1.json', JSON.stringify(data));
  res.send('done');
};

module.exports = setupDevDatabase;
