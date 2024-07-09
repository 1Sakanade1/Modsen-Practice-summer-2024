const Router = require('express');
const router = new Router();

const userController = require('../controllers/userController');
const AuthCheckMiddleware = require('../middleware/AuthCheckMiddleware');

router.post('/', );
router.post('/registration', userController.registration);
router.post('/login', userController.login);

module.exports = router;
