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

let eventGuid = 0

function createEventId() {
  return String(eventGuid++)
}

function getTodayStr(inputDate) {
  return new Date(inputDate).toISOString().replace(/T.*$/, '')
}

let eventDb = [];

app.post('/api/studies/selectStudyInfo', (req, res) => {

  // 1. 기간 내의 모든, studyDate 가져오기
  // 2. groupby(studyDate) 해서 , 총 건수, id 이렇게 가져오면 됨.
  // 총 건수 = title , start = studyDate , id = 내부적으로 만들어 줘도 됨..

  // console.log('selectAll req.body .. is.. ' + JSON.stringify(req.body));
  let where = {'studyDate' :  {"$gte": new Date(req.body.start), "$lt": new Date(req.body.end)}}


  // 이건 객체로 받아오기..
  // Study.find(where).distinct('studyDate', (err, docs) => {

  //     let size = docs.length;
  //     console.log('size is : ' + size)

  //       docs.forEach(studyDatePer => {
  //       let cnt = Study.find({
  //         'studyDate' : studyDatePer
  //       }, (err, docs2) => {
  //         console.log('studyDate : ' + studyDatePer + '.. length is : ' + docs2.length);
  //         docs2.forEach(perStudy => {
  //           console.log(JSON.stringify(perStudy));
  //         })
  //       });
  //     });
  // })

  // 바로 총 갯수만 구하기..
  Study.find(where).distinct('studyDate', (err, docs) => {

    if(err)
      return res.json({ success: false, err })

    let totalCnt = docs.length;
      docs.forEach(studyDatePer => {
        Study.find({
          'studyDate' : studyDatePer
        }).countDocuments((err, cnt) => {

          let strStudyDate = getTodayStr(studyDatePer)

          if(err)
            return res.json({ success: false, err })
          
          eventDb.push({
            id: createEventId(),
            title: cnt,
            start: strStudyDate
          })
          //console.log('studyDate : ' + studyDatePer + '.. cnt is : ' + cnt);
        }) 
      })

      console.log('### eventDb' + JSON.stringify(eventDb));
      console.log('totalCnt : ' + totalCnt)

      return res.status(200).json({
        success: true,
        totalCnt: totalCnt,
        eventDb: eventDb
    })

    })
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})