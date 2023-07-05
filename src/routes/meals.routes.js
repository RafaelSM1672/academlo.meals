const express = require('express');

//controllers
const mealController = require('./../controllers/meals.controller');

//middlewares
const authMiddleware = require('./../middlewares/auth.middleware');

const router = express.Router();

router.get('/', mealController.findMeals);

router.get('/:id', mealController.findMeal);

router.use(authMiddleware.protect);

router
  .route('/:id')
  .post(mealController.createMeal)
  .patch(mealController.updateMeal)
  .delete(mealController.deleteMeal);

module.exports = router;
