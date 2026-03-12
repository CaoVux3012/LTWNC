require('./utils/MongooseUtil');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;


// middlewares
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));


// test api
app.get('/hello', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

// apis
app.use('/api/admin', require('./api/admin'));
app.use('/api/customer', require('./api/customer.js'));

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
