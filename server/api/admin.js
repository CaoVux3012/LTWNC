const express = require('express');
const router = express.Router();

// utils
const JwtUtil = require('../utils/JwtUtil');

// dao
const AdminDAO = require('../models/AdminDAO');
const CategoryDAO = require('../models/CategoryDAO');
const ProductDAO = require('../models/ProductDAO');

const OrderDAO = require('../models/OrderDAO');

// ================= LOGIN =================
router.post('/login', async function (req, res) {
  const { username, password } = req.body;

  if (username && password) {
    const admin = await AdminDAO.selectByUsernameAndPassword(username, password);
    if (admin) {
      const token = JwtUtil.genToken(username, password);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: 'Incorrect username or password' });
    }
  } else {
    res.json({ success: false, message: 'Please input username and password' });
  }
});


// ================= CATEGORY =================
router.get('/categories', JwtUtil.checkToken, async function (req, res) {
  const categories = await CategoryDAO.selectAll();
  res.json(categories);
});

router.post('/categories', JwtUtil.checkToken, async function (req, res) {
  const category = { name: req.body.name };
  const result = await CategoryDAO.insert(category);
  res.json(result);
});

router.put('/categories/:id', JwtUtil.checkToken, async function (req, res) {
  const category = { _id: req.params.id, name: req.body.name };
  const result = await CategoryDAO.update(category);
  res.json(result);
});

router.delete('/categories/:id', JwtUtil.checkToken, async function (req, res) {
  const result = await CategoryDAO.delete(req.params.id);
  res.json(result);
});


// ================= PRODUCT =================
router.get('/products', JwtUtil.checkToken, async function (req, res) {
  let products = await ProductDAO.selectAll();

  const sizePage = 4;
  const noPages = Math.ceil(products.length / sizePage);

  let curPage = 1;
  if (req.query.page) curPage = parseInt(req.query.page);

  const offset = (curPage - 1) * sizePage;
  products = products.slice(offset, offset + sizePage);

  res.json({ products, noPages, curPage });
});

// ADD PRODUCT (PDF)
router.post('/products', JwtUtil.checkToken, async function (req, res) {
  const { name, price, category, image } = req.body;
  const now = new Date().getTime();

  const cate = await CategoryDAO.selectByID(category);

  const product = {
    name,
    price,
    image,
    cdate: now,
    category: cate
  };

  const result = await ProductDAO.insert(product);
  res.json(result);
});

// UPDATE PRODUCT (PDF)
router.put('/products', JwtUtil.checkToken, async function (req, res) {
  const { _id, name, price, category, image } = req.body;
  const cate = await CategoryDAO.selectByID(category);

  const product = {
    _id,
    name,
    price,
    image,
    category: cate
  };

  const result = await ProductDAO.update(product);
  res.json(result);
});

router.get('/orders', JwtUtil.checkToken, async function (req, res) {
  const orders = await OrderDAO.selectAll();
  res.json(orders);
});

router.put('/orders/status/:id', JwtUtil.checkToken, async function (req, res) {
  const _id = req.params.id;
  const newStatus = req.body.status;
  const result = await OrderDAO.update(_id, newStatus);
  res.json(result);
});
// ================= TOKEN =================
router.get('/token', JwtUtil.checkToken, function (req, res) {
  res.json({ success: true });
});

module.exports = router;
