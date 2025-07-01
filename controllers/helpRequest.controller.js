const HelpRequest = require('../models/HelpRequest');
const User = require('../models/User');
const Skill = require('../models/Skill');
const asyncHandler = require('express-async-handler');

// @desc    Create a help request
// @route   POST /api/help-requests
// @access  Private
const createHelpRequest = asyncHandler(async (req, res) => {
  const { title, description, skillId } = req.body;

  const skill = await Skill.findById(skillId);
  if (!skill) {
    res.status(404);
    throw new Error('Skill not found');
  }

  const helpRequest = await HelpRequest.create({
    title,
    description,
    requester: req.user._id,
    skill: skillId
  });

  res.status(201).json(helpRequest);
});

// @desc    Get all help requests
// @route   GET /api/help-requests
// @access  Public
const getHelpRequests = asyncHandler(async (req, res) => {
  const helpRequests = await HelpRequest.find()
    .populate('requester', 'firstName lastName')
    .populate('skill', 'name');
  res.json(helpRequests);
});

// @desc    Get help requests by skill
// @route   GET /api/help-requests/skill/:skillId
// @access  Public
const getHelpRequestsBySkill = asyncHandler(async (req, res) => {
  const helpRequests = await HelpRequest.find({ skill: req.params.skillId })
    .populate('requester', 'firstName lastName')
    .populate('skill', 'name');
  res.json(helpRequests);
});

// @desc    Update help request status
// @route   PUT /api/help-requests/:id/status
// @access  Private
const updateHelpRequestStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const helpRequest = await HelpRequest.findById(req.params.id);

  if (!helpRequest) {
    res.status(404);
    throw new Error('Help request not found');
  }

  helpRequest.status = status;
  await helpRequest.save();

  res.json(helpRequest);
});

// @desc    Delete help request
// @route   DELETE /api/help-requests/:id
// @access  Private
// @desc    Delete help request
// @route   DELETE /api/help-requests/:id
// @access  Private
const deleteHelpRequest = asyncHandler(async (req, res) => {
  const helpRequest = await HelpRequest.findById(req.params.id);

  if (!helpRequest) {
    res.status(404);
    throw new Error('Help request not found');
  }

  if (helpRequest.requester.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized to delete this help request');
  }

  await HelpRequest.deleteOne({ _id: req.params.id });

  res.json({ message: 'Help request removed' });
});


module.exports = {
  createHelpRequest,
  getHelpRequests,
  getHelpRequestsBySkill,
  updateHelpRequestStatus,
  deleteHelpRequest,
};