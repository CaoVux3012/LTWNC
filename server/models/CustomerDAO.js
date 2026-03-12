const Models = require("./Models");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const CustomerDAO = {
  async signup(account) {
    const exist = await Models.Customer.findOne({
      $or: [{ username: account.username }, { email: account.email }]
    });

    if (exist) {
      return { message: "Exists username or email" };
    }

    const hash = bcrypt.hashSync(account.password, 10);
    const token = crypto.randomBytes(20).toString("hex");

    account.password = hash;
    account.token = token;
    account.active = 0;

    const newCustomer = new Models.Customer(account);
    await newCustomer.save();

    return { message: "Please check email", id: newCustomer._id, token: token };
  }
};

module.exports = CustomerDAO;