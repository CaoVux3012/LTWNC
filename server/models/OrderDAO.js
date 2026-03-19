require('../utils/MongooseUtil');
const Models = require('./Models');
const mongoose = require('mongoose');

const OrderDAO = {
  async insert(order) {
    order._id = new mongoose.Types.ObjectId();
    const result = await Models.Order.create(order);
    return result;
  },
  async selectByCustID(_cid) {
    // Truy vấn vào trường _id nằm bên trong object customer
    const query = { 'customer._id': _cid };
    const orders = await Models.Order.find(query).exec();
    return orders;
  }
};

module.exports = OrderDAO;