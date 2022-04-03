/* 
    Events Routes
    /api/events
*/

const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/events');
const { isDate } = require('../helpers/isDate');
const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validateJWT');

// All the routes will need pass validateJWT
router.use(validateJWT);

// Get events
router.get('/', getEvents);

// Create event
router.post(
  '/',
  [
    check('title', 'The title is required').not().isEmpty(),
    check('start', 'Start date is required').custom(isDate),
    check('end', 'End date is required').custom(isDate),
    validateFields,
  ],
  createEvent
);

// Update event
router.put(
  '/:id',
  [
    check('title', 'The title is required').not().isEmpty(),
    check('start', 'Start date is required').custom(isDate),
    check('end', 'End date is required').custom(isDate),
    validateFields,
  ],
  updateEvent
);

// Delete event
router.delete('/:id', deleteEvent);

module.exports = router;
