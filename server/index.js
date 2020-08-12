const express = require('express')
const app = express()
const port = 5000
const mongoose = require('mongoose')
const config = require('./config/key')

mongoose.connect(config.mongoURI,{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('Start')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})