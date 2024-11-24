const express = require('express');
const { bookAppointment, getAppointments, cancelAppointment } = require('../controllers/appointmentController');
const authenticate = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authenticate, bookAppointment);
router.get('/', authenticate, getAppointments);
router.delete('/:id', authenticate, cancelAppointment);

module.exports = router;
