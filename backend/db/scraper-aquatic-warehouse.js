// const dotenv = require('dotenv');

// if (process.env.NODE_ENV !== 'production') {
//   dotenv.config();
// }

const axios = require('axios');
const cheerio = require('cheerio');

const scrapeProductsFromCategories = async (category) => {
  const { data } = await axios.get(category.link);

  const $ = cheerio.load(data);

  const products = [];

  $('.product img').each((index, imgEl) => {
    const $imgEl = $(imgEl);
    const p = {
      type: category.name,
      seller: 'Aquatic Warehouse',
      seller_site: 'https://www.aquaticwarehouse.com/',
      img_url: $imgEl.prop('src'),
      eq_name: $imgEl.prop('alt'),
      link: $imgEl.parent().prop('href'),
      price: $imgEl.closest('.product').find('ins span').text(),
    };
    products.push(p);
  });

  return products;
};

const scrapeCategories = async () => {
  const { data } = await axios.get('https://www.aquaticwarehouse.com/');

  const categories = [];

  const $ = cheerio.load(data);

  $('#accordion-category')
    .children()
    .each((index, el) => {
      const category = {};

      const aTag = $(el).children('a');

      category.link = aTag.prop('href');
      category.name = aTag.text();

      categories.push(category);
    });
  return categories;
};

const scrapeProducts = async () => {
  // await pool.connect()
  const categories = await scrapeCategories();
  const products = {};
  for (let i = 0; i < categories.length; i += 1) {
    const list = await scrapeProductsFromCategories(categories[i]);
    products[categories[i].name] = list;
  }

  return products;
};

module.exports = {
  scrapeProducts,
};
