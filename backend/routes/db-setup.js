// const axios = require('axios');
// const { writeFileSync } = require('fs');
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
  const products = await scrapeProducts();

  // // save to database
  await pool.query(sql.addEquipment(Object.values(products).flat()));

  // TODO obtain data from Amazon (not MVP)
  // const params = {
  //   api_key: process.env.RAINFOREST_API_KEY,
  //   id: '2975459011',
  //   type: 'category',
  // };
  // const { data } = await axios.get(`https://api.rainforestapi.com/request`, {
  //   params,
  // });

  // console.log(data);
  // writeFileSync('./amazon-data/2975459011.json', JSON.stringify(data));

  res.send('done');
};

module.exports = setupDevDatabase;
