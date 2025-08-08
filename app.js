const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const indexRouter = require('./routes/index');
const app = express();

require('dotenv').config();

// 기본 CORS 설정 - 더 포괄적으로 변경
app.use(
  cors({
    origin: ['https://hj-shoppingmall.netlify.app', 'http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    optionsSuccessStatus: 200
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); //req.body가 객체로 인식이 됩니다.

app.get('/', (req, res) => {
  res.send('Welcome to the Shopping Mall API!');
});

app.use('/api', indexRouter);

const mongoURI = process.env.LOCAL_DB_ADDRESS;
mongoose
  .connect(mongoURI, { useNewUrlParser: true }) //
  .then(() => console.log('mongoose connected')) //
  .catch((error) => console.log('DB connection fail', error));

app.listen(process.env.PORT || 5000, () => {
  console.log('server on');
});