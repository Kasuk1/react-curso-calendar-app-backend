const Event = require('../models/Event');

const getEvents = async (req, res) => {
  const events = await Event.find().populate('user', 'name');

  res.status(201).json({
    ok: true,
    events,
  });
};

const createEvent = async (req, res) => {
  const event = new Event(req.body);

  try {
    event.user = req.uid;
    const eventSaved = await event.save();

    res.status(201).json({
      ok: true,
      event: eventSaved,
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      msg: 'Contact the admin.',
    });
  }
};

const updateEvent = async (req, res) => {
  const eventId = req.params.id;
  const uid = req.uid;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      res.status(404).json({
        ok: false,
        msg: 'Event does not exist',
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'You do not have permission to edit this event',
      });
    }

    const newEvent = {
      ...req.body,
      user: uid,
    };

    const eventUpdated = await Event.findByIdAndUpdate(eventId, newEvent, {
      new: true,
    });

    res.status(201).json({
      ok: true,
      event: eventUpdated,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      msg: 'Contact the admin.',
    });
  }
};

const deleteEvent = async (req, res) => {
  const eventId = req.params.id;
  const uid = req.uid;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      res.status(404).json({
        ok: false,
        msg: 'Event does not exist',
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'You do not have permission to delete this event',
      });
    }

    await Event.findByIdAndDelete(eventId);

    res.status(201).json({
      ok: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      msg: 'Contact the admin.',
    });
  }
};

module.exports = { getEvents, createEvent, updateEvent, deleteEvent };
