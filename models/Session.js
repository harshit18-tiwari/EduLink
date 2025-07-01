const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  
  },
  tutor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    
  },
  learner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
   
  },
  skill: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Skill',
    
  },
  startTime: {
    type: Date,
    
  },
  endTime: {
    type: Date,
    
  },
  status: {
    type: String,
    enum: ['scheduled', 'in-progress', 'completed', 'cancelled'],
    default: 'scheduled',
  },
  meetingLink: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Session', SessionSchema);

