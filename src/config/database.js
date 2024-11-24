const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log('Already connected to the database.');
    return;
  }

  try {
    await mongoose.connect("mongodb+srv://akoshipa:amathakoshi@cluster0.wnbgo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1); // Exit the process with failure if DB connection fails
  }
};

module.exports = connectDB;


