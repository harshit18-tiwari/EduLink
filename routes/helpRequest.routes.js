const express = require('express');
const router = express.Router();
const {
  createHelpRequest,
  getHelpRequests,
  getHelpRequestsBySkill,
  updateHelpRequestStatus,
  deleteHelpRequest,
} = require('../controllers/helpRequest.controller');
const { protect } = require('../middlewares/auth');

router.post('/', protect, createHelpRequest);
router.get('/', getHelpRequests);
router.get('/skill/:skillId', getHelpRequestsBySkill);
router.put('/:id/status', protect, updateHelpRequestStatus);
router.delete('/:id', protect, deleteHelpRequest);

module.exports = router;
