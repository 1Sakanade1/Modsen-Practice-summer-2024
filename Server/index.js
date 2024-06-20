require('dotenv').config();
const express = require('express');
const https = require('https');
const fs = require('fs');
const sequelize = require('./db');
const router = require('./routes/index.js');
const errorHandler = require('./middleware/ErrorHandlingMiddleware.js');
require('./models/models'); //надо подключать чтобы синхронизировалась бд

const app = express();

app.use(express.json());
app.use('/api', router);
app.use(errorHandler);

const options = {
  key: fs.readFileSync('D:/code/3k2s/delivery_course_proj/ca.key'),
  cert: fs.readFileSync('D:/code/3k2s/delivery_course_proj/ca.crt'),
};

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log('Подключение к базе данных успешно установлено.');

    https.createServer(options, app).listen(5000, () => {
      console.log('HTTPS-сервер запущен на порте 5000');
    });
  } catch (error) {
    console.error('Ошибка при старте сервера:', error);
  }
};

start();