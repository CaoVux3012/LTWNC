require('../utils/MongooseUtil');
const Models = require('./Models');
const mongoose = require('mongoose');

const CustomerDAO = {
  // Hàm dùng cho Signup (Kiểm tra xem user/email đã tồn tại chưa)
  async selectByUsernameOrEmail(username, email) {
    const query = { $or: [{ username: username }, { email: email }] };
    const customer = await Models.Customer.findOne(query);
    return customer;
  },

  // Hàm dùng cho Signup (Thêm user mới vào database)
  async insert(customer) {
    customer._id = new mongoose.Types.ObjectId();
    const result = await Models.Customer.create(customer);
    return result;
  },

  // Hàm dùng cho Active (Kích hoạt tài khoản)
  async active(_id, token, active) {
    const query = { _id: _id, token: token };
    const newvalues = { active: active };
    const result = await Models.Customer.findOneAndUpdate(query, newvalues, { new: true });
    return result;
  },

  // Hàm dùng cho Login (Kiểm tra đăng nhập)
  async selectByUsernameAndPassword(username, password) {
    const query = { username: username, password: password };
    const customer = await Models.Customer.findOne(query);
    return customer;
  },

  // Hàm dùng cho My Profile (Cập nhật thông tin)
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
  }
};

module.exports = CustomerDAO;