const Skill = require('../models/Skill');
const asyncHandler = require('express-async-handler');
const User = require('../models/User')

// @desc    Get all skills
// @route   GET /api/skills
// @access  Public
const getSkills = asyncHandler(async (req, res) => {
  const skills = await Skill.find();
  res.json(skills);
});

// @desc    Create a skill
// @route   POST /api/skills
// @access  Private
const createSkill = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  
  const skillExists = await Skill.findOne({ name });

  if (skillExists) {
    res.status(400);
    throw new Error('Skill already exists');
  }

  const skill = await Skill.create({
    name,
    description
  });

  res.status(201).json(skill);
});

// @desc    Add skill to user
// @route   PUT /api/skills/:id/add-to-user
// @access  Private
const addSkillToUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const skill = await Skill.findById(req.params.id);

  if (skill && user) {
    // Check if user already has this skill
    if (user.skills.includes(skill._id)) {
      res.status(400);
      throw new Error('User already has this skill');
    }

    user.skills.push(skill._id);
    await user.save();

    skill.users.push(user._id);
    await skill.save();

    res.json({ message: 'Skill added to user' });
  } else {
    res.status(404);
    throw new Error('Skill or user not found');
  }
});

// @desc    Get users by skill
// @route   GET /api/skills/:id/users
// @access  Public
const getUsersBySkill = asyncHandler(async (req, res) => {
  const skill = await Skill.findById(req.params.id).populate('users', 'firstName lastName email bio');

  if (skill) {
    res.json(skill.users);
  } else {
    res.status(404);
    throw new Error('Skill not found');
  }
});

module.exports = {
  getSkills,
  createSkill,
  addSkillToUser,
  getUsersBySkill,
};
