const Router = require('express');
const router = new Router();

const userController = require('../controllers/UserController');
const AuthCheckMiddleware = require('../middleware/AuthCheckMiddleware');

router.post('/', userController.test);

module.exports = router;
