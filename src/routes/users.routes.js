const express = require('express');

//controllers
const userController = require('./../controllers/users.controller');

//middlewares
const validationMiddleware = require('./../middlewares/validations.middleware');
const userMiddleware = require('./../middlewares/users.middleware');
const authMiddleware = require('./../middlewares/auth.middleware');

const router = express.Router();

router.post(
  '/signup',
  validationMiddleware.createValidation,
  userController.create
);

router.post('/login', userController.login);

router.use(authMiddleware.protect);

/* router.get('/renew', authController.renew); */

router
  .use('/:id', userMiddleware.validUser)
  .route('/:id')
  .patch(authMiddleware.protectAccountOwner, userController.updateUser)
  .delete(authMiddleware.protectAccountOwner, userController.deleteUser);

router.get('/orders', userController.findOrders);

router.get('/orders/:id', userController.findOrder);

module.exports = router;
