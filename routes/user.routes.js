const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUserById,
  updateUser,
} = require('../controllers/user.controller');
const { protect } = require('../middlewares/auth');

router.get('/', protect, getUsers);
router.get('/:id', protect, getUserById);
router.put('/:id', protect, updateUser);

module.exports = router;
