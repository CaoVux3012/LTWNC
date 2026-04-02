require('../utils/MongooseUtil');
const Models = require('./Models');
const mongoose = require('mongoose');

const CustomerDAO = {
  // ================= CÁC HÀM CŨ CỦA BẠN =================
  async selectByUsernameOrEmail(username, email) {
    const query = { $or: [{ username: username }, { email: email }] };
    const customer = await Models.Customer.findOne(query);
    return customer;
  },

  async insert(customer) {
    customer._id = new mongoose.Types.ObjectId();
    const result = await Models.Customer.create(customer);
    return result;
  },

  async active(_id, token, active) {
    const query = { _id: _id, token: token };
    const newvalues = { active: active };
    const result = await Models.Customer.findOneAndUpdate(query, newvalues, { new: true });
    return result;
  },

  async selectByUsernameAndPassword(username, password) {
    const query = { username: username, password: password };
    const customer = await Models.Customer.findOne(query);
    return customer;
  },

  async update(customer) {
    const newvalues = { 
      username: customer.username, 
      password: customer.password, 
      name: customer.name, 
      phone: customer.phone, 
      email: customer.email 
    };
    const result = await Models.Customer.findByIdAndUpdate(customer._id, newvalues, { new: true });
    return result;
  },

  // ================= CÁC HÀM MỚI TỪ LAB 09 =================
  // Lấy danh sách toàn bộ khách hàng
  async selectAll() {
    const query = {};
    const customers = await Models.Customer.find(query).exec();
    return customers;
  },

  // Lấy thông tin khách hàng theo ID để gửi Email
  async selectByID(_id) {
    const customer = await Models.Customer.findById(_id).exec();
    return customer;
  }
};

module.exports = CustomerDAO;