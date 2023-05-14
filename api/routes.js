const express = require('express');
const router = express.Router();
const User = require('./models/user');


router.get('/', (req, res) => {
  res.send('GET IS WORKING!');
});


router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    const newUser = new User({ email, password });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'api: Failed to create user' });
  }
});

module.exports = router;



// app.post('/add-joke', async (req, res) => {
//   try {
//     const { joke, gType } = req.body;

//     if (joke === '' || gType === '') {
//       return res.status(418).send({
//         message: 'You forgot to either specify the joke or its type.',
//       });
//     }

//     const toBeInserted = await JokeSchema.create({
//       JokeType: gType,
//       joke: joke,
//     });

//     return res.status(201).send({ message: 'joke added' });
//   } catch (err) {
//     return res.status(400).send({ message: err });
//   }
// });
