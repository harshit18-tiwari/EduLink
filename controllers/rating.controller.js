const Rating = require('../models/Rating');
const asyncHandler = require('express-async-handler');

// @desc    Create a rating
// @route   POST /api/ratings
// @access  Private
const createRating = asyncHandler(async (req, res) => {
  const { sessionId, score, comment } = req.body;

  const rating = await Rating.create({
    session: sessionId,
    score,
    comment,
    user: req.user._id,
  });

  res.status(201).json(rating);
});

// @desc    Get all ratings
// @route   GET /api/ratings
// @access  Public
const getRatings = asyncHandler(async (req, res) => {
  const ratings = await Rating.find().populate('user', 'firstName lastName').populate('session', 'title');
  res.json(ratings);
});

// @desc    Get ratings by session
// @route   GET /api/ratings/session/:sessionId
// @access  Public
const getRatingsBySession = asyncHandler(async (req, res) => {
  const ratings = await Rating.find({ session: req.params.sessionId }).populate('user', 'firstName lastName');

  res.json(ratings);
});

// @desc    Update rating
// @route   PUT /api/ratings/:id
// @access  Private
const updateRating = asyncHandler(async (req, res) => {
  const rating = await Rating.findById(req.params.id);

  if (rating) {
    rating.score = req.body.score || rating.score;
    rating.comment = req.body.comment || rating.comment;

    const updatedRating = await rating.save();
    res.json(updatedRating);
  } else {
    res.status(404);
    throw new Error('Rating not found');
  }
});

// @desc    Delete rating
// @route   DELETE /api/ratings/:id
// @access  Private
const deleteRating = asyncHandler(async (req, res) => {
  const rating = await Rating.findById(req.params.id);

  if (rating) {
    await rating.remove();
    res.json({ message: 'Rating removed' });
  } else {
    res.status(404);
    throw new Error('Rating not found');
  }
});

module.exports = {
  createRating,
  getRatings,
  getRatingsBySession,
  updateRating,
  deleteRating,
};
