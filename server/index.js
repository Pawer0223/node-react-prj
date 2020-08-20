const express = require('express')
const app = express()
const port = 5000
const mongoose = require('mongoose')
const config = require('./config/key')
const bodyParser = require('body-parser');
const cors = require('cors')
const { Study } = require("./models/Study")
const { parseJSON } = require('date-fns')

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

app.post('/api/studies/register', (req, res) => {
    
  let study = new Study(req.body);

  // console.log('study : ' + study);
    study.save((err, studyInfo) => {
        if(err)
            return res.json({ success: false, err })
        return res.status(200).json({
            success: true
        })
    })
})

app.post('/api/studies/selectAll', (req, res) => {

  let temp = {
  }

  console.log('selectAll req.body .. is.. ' + JSON.stringify(req.body));

  let where = {'studyDate' :  {"$gte": new Date(req.body.start), "$lt": new Date(req.body.end)}}
  
   
  Study.find(where, function(err, docs){
      let size = docs.length;
      console.log('size is : ' + size)

        docs.forEach(stydy => {
        let s = new Study(stydy);
          console.log(JSON.stringify(s));
      });

  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})