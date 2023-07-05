const express = require('express');

//controllers
const restaurantController = require('./../controllers/restaurants.controller');
const reviewController = require('./../controllers/reviews.controller');

//middlewares
const validationMiddleware = require('./../middlewares/validations.middleware');
const authMiddleware = require('./../middlewares/auth.middleware');
const restaurantMiddleware = require('./../middlewares/restaurants.middleware');
const reviewMiddleware = require('./../middlewares/reviews.middleware');

const router = express.Router();

router
  .route('/')
  .get(restaurantController.findRestaurants)
  .post(
    authMiddleware.protect,
    authMiddleware.restrictTo('admin'),
    validationMiddleware.restaurantValidation,
    restaurantController.createRestaurant
  );

router
  .route('/:id')
  .get(
    restaurantMiddleware.validRestaurant,
    restaurantController.findRestaurant
  )
  .patch(
    restaurantMiddleware.validRestaurant,
    authMiddleware.protect,
    authMiddleware.restrictTo('admin'),
    restaurantController.updateRestaurant
  )
  .delete(
    restaurantMiddleware.validRestaurant,
    authMiddleware.protect,
    authMiddleware.restrictTo('admin'),
    restaurantController.deleteRestaurant
  );

router.use(authMiddleware.protect);

router.post(
  '/reviews/:id',
  restaurantMiddleware.validRestaurant,
  reviewController.createReview
);

router
  .use(
    '/reviews/:restaurantId/:id',
    reviewMiddleware.validReview,
    restaurantMiddleware.validRestaurant
  )
  .route('/reviews/:restaurantId/:id')
  .patch(authMiddleware.protectAccountOwner, reviewController.updateReview)
  .delete(authMiddleware.protectAccountOwner, reviewController.deleteReview);

module.exports = router;
