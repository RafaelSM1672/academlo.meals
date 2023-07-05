const AppError = require('../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const generateJWT = require('./../utils/jwt');

const Order = require('../models/orders.model');

exports.createOrder = catchAsync(async (req, res, next) => {
  const { quantity, mealId } = req.body;

  const order = await Order.create({
    quantity,
    mealId,
  });

  res.status(200).json({
    status: 'success',
    message: 'The order has been created successfully',
    order: {
      quantity: order.quantity,
      mealId: order.mealId,
    },
  });
});

exports.updateOrder = catchAsync(async (req, res, next) => {
  const { order } = req;

  await order.update({ status: 'completed' });

  res.status(200).json({
    status: 'success',
    message: 'Order has been updated!',
  });
});

exports.deleteOrder = catchAsync(async (req, res, next) => {
  const { order } = req;

  await order.update({ status: 'cancelled' });

  res.status(200).json({
    status: 'success',
    message: 'Order has been deleted',
  });
});

exports.findOrders = catchAsync(async (req, res) => {
  const orders = await Order.findAll({
    where: {
      status: 'active',
    },

    include: [
      {
        model: Order,
      },
    ],
  });

  res.json({
    results: orders.length,
    message: ' Orders find',
    orders,
  });
});
