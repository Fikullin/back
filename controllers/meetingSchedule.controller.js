const { MeetingSchedule, User } = require('../models');
const MeetingScheduleMember = require('../models/meetingScheduleMember.model');
const { sendEmail } = require('../utils/emailService');

exports.createMeetingSchedule = async (req, res) => {
  try {
    const { title, description, meeting_date, project_id, memberIds, platform, endDate } = req.body;

    // Create meeting schedule
    const meeting = await MeetingSchedule.create({
      title,
      description,
      meeting_date,
      project_id,
      platform,
      endDate
    });


    // Associate members if provided
    if (memberIds && Array.isArray(memberIds)) {
      const members = await User.findAll({
        where: { id: memberIds }
      });
      await meeting.setMembers(members);

      // Send email notification to each member
      for (const member of members) {
        const subject = `You have been added to a meeting schedule: ${title}`;
        const text = `Hello ${member.name},\n\nYou have been added as a member to the meeting titled "${title}" scheduled on ${meeting_date}.\n\nBest regards,\nYour Team`;
        sendEmail(member.email, subject, text);
      }
    }

    res.status(201).json(meeting);
  } catch (error) {
    console.error('Error creating meeting schedule:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getAllMeetingSchedules = async (req, res) => {
  try {
    const meetings = await MeetingSchedule.findAll({
      include: [
        {
          model: User,
          as: 'members',
          attributes: ['id', 'name'],
          through: { attributes: [] }
        }
      ]
    });
    res.json(meetings);
  } catch (error) {
    console.error('Error fetching meeting schedules:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteMeetingSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const meeting = await MeetingSchedule.findByPk(id);
    if (!meeting) {
      return res.status(404).json({ message: 'Meeting schedule not found' });
    }
    // Delete related meeting schedule members first to avoid foreign key constraint error
    await MeetingScheduleMember.destroy({
      where: { meeting_schedule_id: id }
    });
    await meeting.destroy();
    res.status(200).json({ message: 'Meeting schedule deleted successfully' });
  } catch (error) {
    console.error('Error deleting meeting schedule:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateMeetingSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, meeting_date, project_id, memberIds, platform, endDate } = req.body;

    const meeting = await MeetingSchedule.findByPk(id);
    if (!meeting) {
      return res.status(404).json({ message: 'Meeting schedule not found' });
    }

    await meeting.update({
      title,
      description,
      meeting_date,
      project_id,
      platform,
      endDate
    });

    // Update members if provided
    if (memberIds && Array.isArray(memberIds)) {
      const members = await User.findAll({
        where: { id: memberIds }
      });
      await meeting.setMembers(members);

      // Send email notification to each member
      for (const member of members) {
        const subject = `You have been added to a meeting schedule: ${title}`;
        const text = `Hello ${member.name},\n\nYou have been added as a member to the meeting titled "${title}" scheduled on ${meeting_date}.\n\nBest regards,\nYour Team`;
        sendEmail(member.email, subject, text);
      }
    }

    res.status(200).json(meeting);
  } catch (error) {
    console.error('Error updating meeting schedule:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getMeetingScheduleById = async (req, res) => {
  try {
    const { id } = req.params;
    const meeting = await MeetingSchedule.findByPk(id, {
      include: [
        {
          model: User,
          as: 'members',
          attributes: ['id', 'name'],
          through: { attributes: [] }
        }
      ]
    });
    if (!meeting) {
      return res.status(404).json({ message: 'Meeting schedule not found' });
    }
    res.json(meeting);
  } catch (error) {
    console.error('Error fetching meeting schedule:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
