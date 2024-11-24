const Appointment = require('../models/Appointment');
const Availability = require('../models/Availability');

exports.bookAppointment = async (req, res) => {
  try {
    const { professorId, slot } = req.body;

    if (!professorId || !slot) {
      return res.status(400).json({ message: 'Professor ID and slot are required.' });
    }

    const availability = await Availability.findOne({ professorId });
    if (!availability) {
      return res.status(404).json({ message: 'No availability found for the selected professor.' });
    }

    if (!availability.slots.includes(slot)) {
      return res.status(400).json({ message: 'The selected slot is not available.' });
    }

    const existingAppointment = await Appointment.findOne({ professorId, slot });
    if (existingAppointment) {
      return res.status(400).json({ message: 'The selected slot is already booked.' });
    }

    const appointment = new Appointment({
      studentId: req.user.id, 
      professorId,
      slot,
    });

    await appointment.save();

    availability.slots = availability.slots.filter((availableSlot) => availableSlot !== slot);
    await availability.save();

    res.status(201).json({
      message: 'Appointment booked successfully.',
      appointment,
    });
  } catch (error) {
    console.error('Error booking appointment:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.getAppointments = async (req, res) => {
  const appointments = await Appointment.find({ studentId: req.user.id });
  res.send(appointments);
};

exports.cancelAppointment = async (req, res) => {
  const { id } = req.params;
  await Appointment.findByIdAndUpdate(id, { status: 'cancelled' });
  res.send({ message: 'Appointment cancelled successfully' });
};
