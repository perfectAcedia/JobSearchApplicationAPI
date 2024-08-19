const mongoose = require('mongoose');

mongoose
  .connect(
    'mongodb+srv://vladyslavroznatovskyi:Advisor69@cluster0.vgj8g.mongodb.net/jobsearchapplication?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('Database connected');
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const LoginSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    match: [emailRegex, 'Invalid email address'],
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
    min: 4,
    max: 20,
  },
  jobTitle: {
    type: String,
    required: true,
    min: 4,
    max: 20,
  },
  additionalInformation: {
    type: String,
    required: false,
  },
});

const collention = new mongoose.model('users', LoginSchema);

module.exports = collention;
