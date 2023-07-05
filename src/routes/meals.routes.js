const express = require('express');

//controllers
const mealController = require('./../controllers/meals.controller');

//middlewares
const validationMiddleware = require('./../middlewares/validations.middleware');
const authMiddleware = require('./../middlewares/auth.middleware');
const mealMiddleware = require('./../middlewares/meals.middleware');

const router = express.Router();

router.get('/', mealController.findMeals);

router.get('/:id', mealMiddleware.validMeal, mealController.findMeal);

router.use(authMiddleware.protect);

router
  .route('/:id')
  .post(
    authMiddleware.restrictTo('admin'),
    validationMiddleware.mealValidation,
    mealController.createMeal
  )
  .patch(
    authMiddleware.restrictTo('admin'),
    mealMiddleware.validMeal,
    mealController.updateMeal
  )
  .delete(
    authMiddleware.restrictTo('admin'),
    mealMiddleware.validMeal,
    mealController.deleteMeal
  );

module.exports = router;
