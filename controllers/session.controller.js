const Session = require('../models/Session');
const asyncHandler = require('express-async-handler');

// @desc    Create a session
// @route   POST /api/sessions
// @access  Private
const createSession = asyncHandler(async (req, res) => {
  const { title, description, startTime, endTime, skillId, learnerId } = req.body;

  const session = await Session.create({
    title,
    description,
    startTime,
    endTime,
    skill: skillId,
    tutor: req.user._id,      // changed from creator → tutor
    learner: learnerId,       // if you’re assigning the learner on creation
  });

  res.status(201).json(session);
});

// @desc    Get all sessions
// @route   GET /api/sessions
// @access  Public
const getSessions = asyncHandler(async (req, res) => {
  const sessions = await Session.find()
    .populate('tutor', 'firstName lastName')     // changed from creator → tutor
    .populate('learner', 'firstName lastName')
    .populate('skill', 'name');

  res.json(sessions);
});

// @desc    Get session by ID
// @route   GET /api/sessions/:id
// @access  Public
const getSessionById = asyncHandler(async (req, res) => {
  const session = await Session.findById(req.params.id)
    .populate('tutor', 'firstName lastName')
    .populate('learner', 'firstName lastName')
    .populate('skill', 'name');

  if (session) {
    res.json(session);
  } else {
    res.status(404);
    throw new Error('Session not found');
  }
});

// @desc    Update session
// @route   PUT /api/sessions/:id
// @access  Private
const updateSession = asyncHandler(async (req, res) => {
  const session = await Session.findById(req.params.id);

  if (session) {
    session.title = req.body.title || session.title;
    session.description = req.body.description || session.description;
    session.startTime = req.body.startTime || session.startTime;
    session.endTime = req.body.endTime || session.endTime;

    const updatedSession = await session.save();
    res.json(updatedSession);
  } else {
    res.status(404);
    throw new Error('Session not found');
  }
});

// @desc    Delete session
// @route   DELETE /api/sessions/:id
// @access  Private
const deleteSession = asyncHandler(async (req, res) => {
  const session = await Session.findById(req.params.id);

  if (session) {
    await session.remove();
    res.json({ message: 'Session removed' });
  } else {
    res.status(404);
    throw new Error('Session not found');
  }
});

module.exports = {
  createSession,
  getSessions,
  getSessionById,
  updateSession,
  deleteSession,
};
