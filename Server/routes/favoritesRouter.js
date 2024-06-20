const Router = require('express');
const router = new Router();

const favoritesController = require('../controllers/favoritesController');
const AuthCheckMiddleware = require('../middleware/AuthCheckMiddleware')

router.post('/', favoritesController.test);

module.exports = router;