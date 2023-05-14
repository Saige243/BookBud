const dotenv = require("dotenv")
dotenv.config()
const express = require('express')
const cors = require('cors')
const app = express()
const port = 3001
const colors = require('colors');
const { mongo } = require('./config/config');
const routes = require('./routes');
const { default: mongoose } = require("mongoose")

app.use(express.json());
app.use(cors())
app.use('/', routes);

const uri = `mongodb+srv://${mongo.username}:${mongo.password}@bookbud.lxq6zml.mongodb.net/Bookbud?retryWrites=true&w=majority`;

mongoose.connect(uri)
  .then(() => {
    console.log(colors.blue('Connected to MongoDB'));
  })
  .catch((e) => {
    console.log(colors.red('Not connected:', e));
  });


app.listen(port, () => {
  console.log(colors.green(`Bookbud is listening on port ${port}`));
});

