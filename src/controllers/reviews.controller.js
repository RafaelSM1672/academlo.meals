const Review = require('../models/reviews.model');
const catchAsync = require('./../utils/catchAsync');

exports.createReview = catchAsync(async (req, res, next) => {
  const { comment, rating } = req.body;
  const { id } = req.params;
  const uid = req.sessionUser.id;

  const review = await Review.create({
    comment: comment.toLowerCase(),
    rating,
    restaurantId: +id,
    userId: +uid,
  });

  res.status(200).json({
    status: 'success',
    message: 'The review has been created successfully',
    review: {
      comment: review.comment,
      rating: review.rating,
    },
  });
});

exports.updateReview = catchAsync(async (req, res, next) => {
  const { comment, rating } = req.body;
  const { review } = req;

  await review.update({ comment, rating });

  return res.status(200).json({
    status: 'success',
    message: 'Review has been updated!',
  });
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  const { review } = req;

  await review.update({ status: false });

  return res.status(200).json({
    status: 'success',
    message: 'Review has been deleted',
  });
});
