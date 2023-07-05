const Restaurant = require('../models/restaurants.model');
const catchAsync = require('./../utils/catchAsync');

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
  });

  return res.status(200).json({
    status: 'success',
    message: 'Restaurants find',
    results: restaurants.length,
    restaurants,
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
