const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).send({ error: 'Access denied. No token provided.' });
  console.log(token)

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded)
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error)
    res.status(400).send({ error: 'Invalid token' });
  }
};

module.exports = authenticate;
