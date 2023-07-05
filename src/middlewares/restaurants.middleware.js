const Restaurant = require('../models/restaurants.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validRestaurant = catchAsync(async (req, res, next) => {
  const { id, restaurantId } = req.params;

  const restaurant = await Restaurant.findOne({
    where: {
      status: true,
      id: restaurantId || id,
    },
  });

  if (!restaurant) {
    return next(
      new AppError(`Restaurant with id: ${restaurantId || id} not found`, 404)
    );
  }

  req.restaurant = restaurant;
  next();
});
