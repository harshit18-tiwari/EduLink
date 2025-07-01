const Rating = require('../models/Rating');
const asyncHandler = require('express-async-handler');

// @desc    Create a rating
// @route   POST /api/ratings
// @access  Private
const createRating = asyncHandler(async (req, res) => {
  const { sessionId, ratedUserId, rating, feedback } = req.body;

  if (!sessionId || !ratedUserId || !rating) {
    return res.status(400).json({ message: 'sessionId, ratedUserId, and rating are required' });
  }

  const newRating = await Rating.create({
    session: sessionId,
    rated: ratedUserId,
    rater: req.user._id,
    rating,
    feedback,
  });

  res.status(201).json(newRating);
});

// @desc    Get all ratings
// @route   GET /api/ratings
// @access  Public
const getRatings = asyncHandler(async (req, res) => {
  const ratings = await Rating.find()
    .populate('rater', 'firstName lastName')
    .populate('rated', 'firstName lastName')
    .populate('session', 'title');

  res.json(ratings);
});

// @desc    Get ratings by session
// @route   GET /api/ratings/session/:sessionId
// @access  Public
const getRatingsBySession = asyncHandler(async (req, res) => {
  const ratings = await Rating.find({ session: req.params.sessionId })
    .populate('rater', 'firstName lastName')
    .populate('rated', 'firstName lastName');

  res.json(ratings);
});

// @desc    Update rating
// @route   PUT /api/ratings/:id
// @access  Private
const updateRating = asyncHandler(async (req, res) => {
  const rating = await Rating.findById(req.params.id);

  if (rating) {
    if (String(rating.rater) !== String(req.user._id)) {
      return res.status(403).json({ message: 'Not authorized to update this rating' });
    }

    rating.rating = req.body.rating || rating.rating;
    rating.feedback = req.body.feedback || rating.feedback;

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
    if (String(rating.rater) !== String(req.user._id)) {
      return res.status(403).json({ message: 'Not authorized to delete this rating' });
    }

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
