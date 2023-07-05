const express = require('express');

//controllers
const restaurantController = require('./../controllers/restaurants.controller');

//middlewares
const authMiddleware = require('./../middlewares/auth.middleware');

const router = express.Router();

router.get('/', restaurantController.findRestaurants);

router.get('/:id', restaurantController.findRestaurant);

router.use(authMiddleware.protect);

router.post('/', restaurantController.createRestaurant);

router
  .route('/:id')
  .patch(restaurantController.updateRestaurant)
  .delete(restaurantController.deleteRestaurant);

router.post('/reviews/:id', restaurantController.createReview);

router
  .route('/reviews/:restaurantId/:id')
  .patch(restaurantController.editReview)
  .delete(restaurantController.deleteReview);

module.exports = router;
