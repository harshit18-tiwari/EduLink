const Session = require('../models/Session');
const asyncHandler = require('express-async-handler');

// @desc    Create a session
// @route   POST /api/sessions
// @access  Private
const createSession = asyncHandler(async (req, res) => {
  const { title, description, date, skillId } = req.body;

  const session = await Session.create({
    title,
    description,
    date,
    skill: skillId,
    creator: req.user._id,
  });

  res.status(201).json(session);
});

// @desc    Get all sessions
// @route   GET /api/sessions
// @access  Public
const getSessions = asyncHandler(async (req, res) => {
  const sessions = await Session.find().populate('creator', 'firstName lastName').populate('skill', 'name');
  res.json(sessions);
});

// @desc    Get session by ID
// @route   GET /api/sessions/:id
// @access  Public
const getSessionById = asyncHandler(async (req, res) => {
  const session = await Session.findById(req.params.id).populate('creator', 'firstName lastName').populate('skill', 'name');

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
    session.date = req.body.date || session.date;

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
