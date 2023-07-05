const AppError = require('../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const generateJWT = require('./../utils/jwt');

const Restaurant = require('../models/restaurants.model');

exports.createRestaurant = catchAsync(async (req, res, next) => {
  const { name, address, rating } = req.body;

  const restaurant = await User.create({
    name: name.toLowerCase(),
    address: address.toLowerCase(),
    rating,
  });

  res.status(200).json({
    status: 'success',
    message: 'The restaurant has been created successfully',
    restaurant: {
      name: restaurant.name,
      address: restaurant.address,
      rating: restaurant.rating,
    },
  });
});

exports.updateRestaurant = catchAsync(async (req, res, next) => {
  const { name, address } = req.body;
  const { restaurant } = req;

  await restaurant.update({ name, address });

  res.status(200).json({
    status: 'success',
    message: 'Restaurant has been updated!',
  });
});

exports.deleteRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  await restaurant.update({ status: false });

  res.status(200).json({
    status: 'success',
    message: 'Restaurant has been deleted',
  });
});

exports.findRestaurants = catchAsync(async (req, res) => {
  const restaurants = await Restaurant.findAll({
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
    results: restaurants.length,
    message: 'Restaurants find',
    orders,
  });
});

exports.findRestaurant = catchAsync(async (req, res) => {
  const { id } = req.params;

  const restaurant = await Restaurant.findOne({
    where: {
      id,
      status: true,
    },
  });

  if (!restaurant) {
    return res.status(404).json({
      status: 'error',
      message: `The restaurant whith id: ${id} not found!`,
    });
  }

  res.json({
    message: `Restaurant #${id} found`,
    restaurant,
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  const { name, address, rating } = req.body;

  const restaurant = await User.create({
    name: name.toLowerCase(),
    address: address.toLowerCase(),
    rating,
  });

  res.status(200).json({
    status: 'success',
    message: 'The restaurant has been created successfully',
    restaurant: {
      name: restaurant.name,
      address: restaurant.address,
      rating: restaurant.rating,
    },
  });
});

exports.editReview = catchAsync(async (req, res, next) => {
  const { name, address, rating } = req.body;

  const restaurant = await User.create({
    name: name.toLowerCase(),
    address: address.toLowerCase(),
    rating,
  });

  res.status(200).json({
    status: 'success',
    message: 'The restaurant has been created successfully',
    restaurant: {
      name: restaurant.name,
      address: restaurant.address,
      rating: restaurant.rating,
    },
  });
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  const { name, address, rating } = req.body;

  const restaurant = await User.create({
    name: name.toLowerCase(),
    address: address.toLowerCase(),
    rating,
  });

  res.status(200).json({
    status: 'success',
    message: 'The restaurant has been created successfully',
    restaurant: {
      name: restaurant.name,
      address: restaurant.address,
      rating: restaurant.rating,
    },
  });
});
