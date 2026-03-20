require('../utils/MongooseUtil');
const Models = require('./Models');
const mongoose = require('mongoose');

const ProductDAO = {
  // ==============================
  // CÁC HÀM CỦA BẠN (Giữ nguyên)
  // ==============================
  async selectAll() {
    const query = {};
    const products = await Models.Product
      .find(query)
      .populate('category')
      .exec();
    return products;
  },

  async selectByCategory(cid) {
    const query = { category: cid };
    const products = await Models.Product
      .find(query)
      .populate('category')
      .exec();
    return products;
  },

  async selectByID(id) {
    const product = await Models.Product
      .findById(id)
      .populate('category')
      .exec();
    return product;
  },

  async selectByKeyword(keyword) {
    const query = { name: { $regex: new RegExp(keyword, "i") } };
    const products = await Models.Product
      .find(query)
      .populate('category')
      .exec();
    return products;
  },

  // ==============================
  // CÁC HÀM BỊ THIẾU (Bổ sung để sửa lỗi 500)
  // ==============================
  
  // Lấy sản phẩm mới nhất (Cho trang Home)
  async selectTopNew(top) {
    const query = {};
    const mysort = { cdate: -1 }; // Sắp xếp giảm dần theo ngày tạo
    const products = await Models.Product.find(query).sort(mysort).limit(top).populate('category').exec();
    return products;
  },

  // Lấy sản phẩm bán chạy nhất (Cho trang Home)
  async selectTopHot(top) {
    const items = await Models.Order.aggregate([
      { $match: { status: 'APPROVED' } },
      { $unwind: '$items' },
      { $group: { _id: '$items.product._id', sum: { $sum: '$items.quantity' } } },
      { $sort: { sum: -1 } },
      { $limit: top }
    ]).exec();
    var products = [];
    for (const item of items) {
      const product = await Models.Product.findById(item._id).populate('category').exec();
      products.push(product);
    }
    return products;
  },

  // Thêm sản phẩm mới (Dành cho Admin)
  async insert(product) {
    product._id = new mongoose.Types.ObjectId();
    const result = await Models.Product.create(product);
    return result;
  },

  // Cập nhật sản phẩm (Dành cho Admin)
  async update(product) {
    const newvalues = { name: product.name, price: product.price, image: product.image, category: product.category };
    const result = await Models.Product.findByIdAndUpdate(product._id, newvalues, { new: true });
    return result;
  },

  // Xóa sản phẩm (Dành cho Admin)
  async delete(_id) {
    const result = await Models.Product.findByIdAndDelete(_id);
    return result;
  }
};

module.exports = ProductDAO;