const userController = require('../controllers/user.controller');
const express = require('express');

const router = express.Router();

router.post(
  '/signup',
  upload.single('profileImgUrl'),
  validationMiddleware.createUserValidation,
  authController.signup
);

router.post('/login', authController.login);

const userMiddleware = require('./../middlewares/user.middleware');
const authMiddleware = require('./../middlewares/auth.middleware');

router.use(authMiddleware.protect);

router.get(
  '/',
  /*authMiddleware.restrictTo('admin'),*/
  userController.findAllUsers
);

router
  .route('/:id')
  .get(userMiddleware.validUser, userController.findOneUser)
  .patch(userMiddleware.validUser, userController.updateUser)
  .delete(userMiddleware.validUser, userController.deleteUser);

module.exports = router;
