const Review = require('../models/reviews.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validReview = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const review = await Review.findOne({
    where: {
      id,
      status: true,
    },
    include: [
      {
        model: User,
      },
    ],
  });

  if (!review) {
    return next(new AppError(`Review with id: ${id} not found`, 404));
  }

  req.review = review;
  req.user = review.user;
  next();
});
