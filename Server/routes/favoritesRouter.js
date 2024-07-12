const Router = require('express');
const router = new Router();

const favoritesController = require('../controllers/favoritesController');
const AuthCheckMiddleware = require('../middleware/AuthCheckMiddleware')

router.get('/getAllById',AuthCheckMiddleware, favoritesController.getFavoriteAttractions)
router.post('/addOneInFavorites',AuthCheckMiddleware,favoritesController.addToFavorites)
router.post('/RemoveOneFromFavorites',AuthCheckMiddleware,favoritesController.removeFromFavorites)

module.exports = router;