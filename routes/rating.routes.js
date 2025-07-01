const express = require('express');
const router = express.Router();
const {
  createRating,
  getRatings,
  getRatingsBySession,
  updateRating,
  deleteRating,
} = require('../controllers/rating.controller');
const { protect } = require('../middlewares/auth');

router.post('/', protect, createRating);
router.get('/', getRatings);
router.get('/session/:sessionId', getRatingsBySession);
router.put('/:id', protect, updateRating);
router.delete('/:id', protect, deleteRating);

module.exports = router;
