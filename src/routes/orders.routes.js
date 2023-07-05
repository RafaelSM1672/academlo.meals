const express = require('express');

//controllers
const orderController = require('./../controllers/orders.controller');

//middlewares
const authMiddleware = require('./../middlewares/auth.middleware');

const router = express.Router();

router.use(authMiddleware.protect);

router.post('/', orderController.createOrder);

router.get('/me', orderController.findOrders);

router
  .route('/:id')
  .patch(orderController.updateOrder)
  .delete(orderController.deleteOrder);

module.exports = router;
