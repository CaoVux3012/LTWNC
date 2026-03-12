const Models = require('./Models');

const ProductDAO = {
  // ==============================
  // SELECT ALL PRODUCTS
  // ==============================
  async selectAll() {
    const query = {};
    const products = await Models.Product
      .find(query)
      .populate('category')
      .exec();
    return products;
  },

  // ==============================
  // SELECT PRODUCTS BY CATEGORY
  // ==============================
  async selectByCategory(cid) {
    const query = { category: cid };
    const products = await Models.Product
      .find(query)
      .populate('category')
      .exec();
    return products;
  },

  // ==============================
  // SELECT PRODUCT BY ID
  // ==============================
  async selectByID(id) {
    const product = await Models.Product
      .findById(id)
      .populate('category')
      .exec();
    return product;
  },

  // ==============================
  // SEARCH PRODUCT BY KEYWORD
  // ==============================
  async selectByKeyword(keyword) {
    const query = {
      name: { $regex: new RegExp(keyword, "i") }
    };

    const products = await Models.Product
      .find(query)
      .populate('category')
      .exec();

    return products;
  }
};

module.exports = ProductDAO;