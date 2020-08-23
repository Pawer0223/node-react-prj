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

function getTodayStr(inputDate) {
  return new Date(inputDate).toISOString().replace(/T.*$/, '')
}

app.post('/api/studies/selectStudyInfo', (req, res) => {

  // 1. 기간 내의 모든, studyDate 가져오기
  // 2. groupby(studyDate) 해서 , 총 건수, id 이렇게 가져오면 됨.
  // 총 건수 = title , start = studyDate , id = 내부적으로 만들어 줘도 됨..
  // console.log('selectAll req.body .. is.. ' + JSON.stringify(req.body));
  let where = {'studyDate' :  {"$gte": new Date(req.body.start), "$lt": new Date(req.body.end)}}
  let eventDb = []
  // 바로 총 갯수만 구하기..
  Study.find(where).distinct('studyDate', (err, docs) => {

    if(err)
      return res.json({ success: false, err })

    let totalCnt = docs.length;
    let eventGuid = 0;

      docs.forEach(studyDatePer => {
        Study.find({
          'studyDate' : studyDatePer
        }).countDocuments((err, cnt) => {
          let strStudyDate = getTodayStr(studyDatePer)

          if(err)
            return res.json({ success: false, err })
          
          eventDb.push({
            id: eventGuid++,
            title: cnt,
            start: strStudyDate
          })

          if(eventGuid === totalCnt){
            console.log('### eventDb' + JSON.stringify(eventDb));
            console.log('totalCnt : ' + totalCnt)
      
              res.status(200).json({
                success: true,
                totalCnt: totalCnt,
                eventDb: eventDb
              })
          }
          //console.log('studyDate : ' + studyDatePer + '.. cnt is : ' + cnt);
        }) 
      })
    })
})

app.post('/api/studies/getStudyList', (req, res) => {
  let studyInfos = [];
  let studyDateS = new Date(req.body.studyDate);
  let studyDateE = new Date(req.body.studyDate);
  let index = 0;
  studyDateE.setDate(studyDateS.getDate() + 1);

  let where = {'studyDate' :  {"$gte": studyDateS, "$lt": studyDateE}}

  Study.find(where, (err, doc) => {
    if (err){
      console.log(err)
    }
    doc.forEach((info) => {
      studyInfos.push(new Study(info));
      index++;
      if (index === doc.length){
        // console.log('response ... studyinfos ...... ' + JSON.stringify(studyInfos))
        res.status(200).json({
          success: true,
          studyList: studyInfos
        })
      } 
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})