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

const LoginSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  additionalInformation: {
    type: String,
    required: false,
  },
});

const collention = new mongoose.model('users', LoginSchema);

module.exports = collention;
