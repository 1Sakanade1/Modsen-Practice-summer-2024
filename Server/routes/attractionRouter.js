const Router = require('express');
const router = new Router();

const attractionController = require('../controllers/attractionController');
const AuthCheckMiddleware = require('../middleware/AuthCheckMiddleware');

router.post('/', attractionController.test);

module.exports = router;
