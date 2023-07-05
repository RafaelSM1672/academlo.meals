const Meal = require('../models/meals.model');
const catchAsync = require('./../utils/catchAsync');

exports.createMeal = catchAsync(async (req, res, next) => {
  const { name, price } = req.body;
  const { id } = req.params;
  const uid = req.sessionUser.id;

  const meal = await Meal.create({
    name: name.toLowerCase(),
    price,
    restaurantId: +id,
    userId: +uid,
  });

  res.status(200).json({
    status: 'success',
    message: 'The meal has been created successfully',
    meal: {
      name: meal.name,
      price: meal.price,
    },
  });
});

exports.updateMeal = catchAsync(async (req, res, next) => {
  const { name, price } = req.body;
  const { meal } = req;

  await meal.update({ name, price });

  res.status(200).json({
    status: 'success',
    message: 'Meal has been updated!',
  });
});

exports.deleteMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;

  await meal.update({ status: false });

  res.status(200).json({
    status: 'success',
    message: 'Meal has been deleted',
  });
});

exports.findMeals = catchAsync(async (req, res) => {
  const meals = await Meal.findAll({
    where: {
      status: true,
    },
    include: [
      {
        model: Restaurant,
      },
    ],
  });

  res.json({
    results: meals.length,
    message: 'Meals find',
    meals,
  });
});

exports.findMeal = catchAsync(async (req, res) => {
  const { id } = req.params;

  const meal = await Meal.findOne({
    where: {
      id,
      status: true,
    },
    include: [
      {
        model: Restaurant,
      },
    ],
  });

  if (!meal) {
    return res.status(404).json({
      status: 'error',
      message: `The meal whith id: ${id} not found!`,
    });
  }

  res.json({
    message: `Meal #${id} found`,
    meal,
  });
});
