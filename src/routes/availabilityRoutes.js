const express = require('express');
const { setAvailability, getAvailability } = require('../controllers/availabilityController');
const authenticate = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/create', authenticate, setAvailability);
router.get('/:id', authenticate, getAvailability);

module.exports = router;
