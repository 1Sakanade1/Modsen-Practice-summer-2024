const Router = require('express');
const router = new Router();

const attractionRouter = require('./attractionRouter.js');
const favoritesRouter = require('./favoritesRouter.js');
const userRouter = require('./userRouter.js');

router.use('/attractions', attractionRouter);
router.use('/favorites', favoritesRouter);
router.use('/user', userRouter);

module.exports = router;
