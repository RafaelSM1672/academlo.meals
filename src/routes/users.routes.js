const express = require('express');

//controllers
const userController = require('./../controllers/users.controller');
const orderController = require('./../controllers/orders.controller');

//middlewares
const validationMiddleware = require('./../middlewares/validations.middleware');
const userMiddleware = require('./../middlewares/users.middleware');
const authMiddleware = require('./../middlewares/auth.middleware');
const orderMiddleware = require('./../middlewares/orders.middleware');

const router = express.Router();

router.post(
  '/signup',
  validationMiddleware.createValidation,
  userController.create
);

router.post('/login', userController.login);

router.use(authMiddleware.protect);

router
  .route('/:id')
  .patch(
    userMiddleware.validUser,
    authMiddleware.protectAccountOwner,
    userController.updateUser
  )
  .delete(
    userMiddleware.validUser,
    authMiddleware.protectAccountOwner,
    userController.deleteUser
  );

router.get(
  '/orders',
  orderMiddleware.validOrder,
  userMiddleware.validUser,
  authMiddleware.protectAccountOwner,
  orderController.findOrders
);

router.get(
  '/orders/:id',
  orderMiddleware.validOrder,
  userMiddleware.validUser,
  authMiddleware.protectAccountOwner,
  orderController.findOrder
);

module.exports = router;
