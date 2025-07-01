const express = require('express');
const router = express.Router();
const {
  createSession,
  getSessions,
  getSessionById,
  updateSession,
  deleteSession,
} = require('../controllers/session.controller');
const { protect } = require('../middlewares/auth');

router.post('/', protect, createSession);
router.get('/', getSessions);
router.get('/:id', getSessionById);
router.put('/:id', protect, updateSession);
router.delete('/:id', protect, deleteSession);

module.exports = router;
