require('./utils/MongooseUtil');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// middlewares
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// apis
app.use('/api/admin', require('./api/admin'));
app.use('/api/customer', require('./api/customer.js'));

// ================= DEPLOYMENT =================
const path = require('path');

// '/admin' serve the files at client-admin/build/ as static files
app.use('/admin', express.static(path.resolve(__dirname, '../client-admin/build')));
app.get(/^\/admin.*/, (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client-admin/build', 'index.html'));
});

// '/' serve the files at client-customer/build/ as static files
app.use('/', express.static(path.resolve(__dirname, '../client-customer/build')));
app.get(/.*/, (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client-customer/build', 'index.html'));
});
// ==============================================

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});