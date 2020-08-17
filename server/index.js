const express = require('express')
const app = express()
const port = 5000
const mongoose = require('mongoose')
const config = require('./config/key')
const bodyParser = require('body-parser');
const cors = require('cors')
let cors_origin = ['http://localhost:3000', 'http://localhost:8080']

mongoose.connect(config.mongoURI,{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

// application/x-www-form-unlencoded
app.use(bodyParser.urlencoded({extended: true}));
// application/json
app.use(bodyParser.json());

app.use(
  cors({
      origin: cors_origin, // 허락하고자 하는 요청 주소
      credentials: true, // true로 하면 설정한 내용을 response 헤더에 추가 해줍니다.
  })
);

app.get('/', (req, res) => {
  res.send('Start')
})

app.get('/api/test', (req, res) => {
  res.send(" calld api test");
})

app.get('/api/getStudyList', (req, res) => {
  res.send(" calld api getStudyList");
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})