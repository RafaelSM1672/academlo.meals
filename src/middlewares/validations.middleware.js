const { body, validationResult } = require('express-validator');

const validFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }

  next();
};

exports.createValidation = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Must be a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/\d/)
    .withMessage('Password must be at least one number')
    .matches(/[A-Z]/)
    .withMessage('Password must be at least one uppercase letter')
    .matches(/[!@#$%^&*(),.?":{}|<>-_]/)
    .withMessage('Password must be at least one special character'),
  body('role')
    .optional()
    .isIn(['normal', 'admin'])
    .withMessage('Role must be either "normal" or "admin"'),
  validFields,
];

exports.restaurantValidation = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('address').notEmpty().withMessage('Address cannot be empty'),
  body('rating')
    .notEmpty()
    .withMessage('Rating is required')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be an integer between 1 and 5'),
  validFields,
];

exports.mealValidation = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('price')
    .notEmpty()
    .withMessage('Price cannot be empty')
    .isFloat()
    .withMessage('Price must be a number'),
  validFields,
];
