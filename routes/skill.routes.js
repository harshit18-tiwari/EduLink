const express = require('express');
const router = express.Router();
const {
  getSkills,
  createSkill,
  addSkillToUser ,
  getUsersBySkill,
} = require('../controllers/skill.controller');
const { protect } = require('../middlewares/auth');

router.get('/', getSkills);
router.post('/', protect, createSkill);
router.put('/:id/add-to-user', protect, addSkillToUser );
router.get('/:id/users', getUsersBySkill);

module.exports = router;
