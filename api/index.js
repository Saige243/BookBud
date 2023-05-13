const dotenv = require("dotenv")
dotenv.config()
const express = require('express')
const cors = require('cors')
const app = express()
const port = 3001
const colors = require('colors');
const { mongo } = require('./config/config');

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${mongo.username}:${mongo.password}@bookbud.lxq6zml.mongodb.net/`;
const client = new MongoClient(uri);

const connectToDb = async () => {
  try {
    await client.connect();

    console.log(colors.blue("Connected to MongoDB"))
  } catch (e) {
    console.error(colors.red(e));
  }
}

connectToDb()
app.use(cors())

app.get('/', (req, res) => {
  res.send('Bookbud active')
})

app.listen(port, () => {
  console.log(colors.green(`Bookbud is listening on port ${port}`))
})
