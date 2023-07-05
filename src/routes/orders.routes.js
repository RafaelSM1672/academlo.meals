const express = require('express');

//controllers
const orderController = require('./../controllers/orders.controller');

//middlewares
const authMiddleware = require('./../middlewares/auth.middleware');
const orderMiddleware = require('./../middlewares/orders.middleware');

const router = express.Router();

router.use(authMiddleware.protect);

router.post('/', orderMiddleware.validOrder, orderController.createOrder);

router.get(
  '/me',
  authMiddleware.protectAccountOwner,
  orderController.findOrders
);

router
  .route('/:id')
  .patch(
    authMiddleware.protectAccountOwner,
    orderMiddleware.validOrder,
    orderController.updateOrder
  )
  .delete(
    authMiddleware.protectAccountOwner,
    orderMiddleware.validOrder,
    orderController.deleteOrder
  );

module.exports = router;
