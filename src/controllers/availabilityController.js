const Availability = require('../models/Availability');

exports.setAvailability = async (req, res) => {
  const { date, slots } = req.body;
  const availability = new Availability({ professorId: req.user.id, date, slots });
  await availability.save();
  res.status(201).send({ message: 'Availability set successfully' });
};

exports.getAvailability = async (req, res) => {
  const { id } = req.params;
  const availability = await Availability.find({ professorId: id });
  res.send(availability);
};
