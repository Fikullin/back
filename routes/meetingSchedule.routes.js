const express = require('express');
const router = express.Router();
const meetingScheduleController = require('../controllers/meetingSchedule.controller');

router.post('/', meetingScheduleController.createMeetingSchedule);
router.get('/', meetingScheduleController.getAllMeetingSchedules);
router.get('/:id', meetingScheduleController.getMeetingScheduleById);
router.delete('/:id', meetingScheduleController.deleteMeetingSchedule);
router.put('/:id', meetingScheduleController.updateMeetingSchedule);

module.exports = router;
