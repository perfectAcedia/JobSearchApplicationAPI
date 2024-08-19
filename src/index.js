const express = require('express');
const collection = require('./config');
const cors = require('cors');
const port = 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.set('view engine', 'ejs');

app.post('/sign-up', async (req, res) => {
  console.log(req.body);
  const data = {
    email: req.body.email,
    password: req.body.password,
    fullName: req.body.fullName,
    jobTitle: req.body.jobTitle,
  };

  if (req.body.additionalInformation) {
    data.additionalInformation = req.body.additionalInformation;
  }

  const isEmailAlreadyInUse = await collection.findOne({ email: data.email });

  if (isEmailAlreadyInUse) {
    res.status(400).send('Email already in use');
  } else {
    const user = await collection.insertMany(data);
    res.send(user);
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await collection.findOne({ email });

    if (!user) {
      res.status(404).send('User not found');
    }

    const isPasswordMatch = user.password === password;
    if (isPasswordMatch) {
      res.send(user);
    } else {
      throw new Error();
    }
  } catch (error) {
    res.status(400).send('Wrong email or password');
  }
});

app.listen(5000, () => {
  console.log(`Server running on port ${port}`);
});
