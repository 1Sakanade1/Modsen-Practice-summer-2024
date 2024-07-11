require('dotenv').config();
const express = require('express');
const https = require('https');
const fs = require('fs');
const sequelize = require('./db');
const router = require('./routes/index.js');
const errorHandler = require('./middleware/ErrorHandlingMiddleware.js');
const cors = require('cors');
require('./models/models'); //надо подключать чтобы синхронизировалась бд

const app = express();

app.use(cors());

app.use(express.json());
app.use('/api', router);
app.use(errorHandler);

const options = {
  key: fs.readFileSync('C:/Modsen-Practice-summer-2024/Server/ca.key'),
  cert: fs.readFileSync('C:/Modsen-Practice-summer-2024/Server/ca.crt'),
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