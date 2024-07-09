const Router = require('express');
const router = new Router();

const attractionController = require('../controllers/attractionController');

router.get('/getAll',attractionController.getAllAttractions);

module.exports = router;
