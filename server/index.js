const express = require('express')
const app = express()
const port = 5000
const mongoose = require('mongoose')
const config = require('./config/key')
const bodyParser = require('body-parser');
const cors = require('cors')
const { Study } = require("./models/Study")
const { User } = require("./models/Study")
const { parseJSON } = require('date-fns')
const multer  = require('multer')
const upload = multer({ dest: './uploads/' })

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

function getTodayStr(inputDate) {
  return new Date(inputDate).toISOString().replace(/T.*$/, '')
}

app.get('/', (req, res) => {
  res.send('Start')
})

app.get('/api/test', (req, res) => {
    res.send(" calld api test");

})

app.post('/api/users/register', (req, res) => {
    
  let study = new Study(req.body);

  // console.log('study : ' + study);
    study.save((err, studyInfo) => {
        if (err){
            console.log('register Error .. ' + err)
            return res.json({ success: false, err })
        }
        return res.status(200).json({
            success: true
        })
    })
})

app.post('/api/users/register', upload.single('profile_img'), (req, res) => {

  console.log('reg user : ', req.body);
  console.log(req.file);
  console.log(req.file.filename);
  
  // const user = new User(req.body);

  // console.log('################ user : ' + JSON.stringify(user))

  // user.save((err, userInfo) => {
  //     if(err)
  //         return res.json({ success: false, err })
  //     return res.status(200).json({
  //         success: true
  //     })
  // })


       return res.status(200).json({
          success: true
      })
})


// 스터디 등록
app.post('/api/studies/register', (req, res) => {
    
  let study = new Study(req.body);

  // console.log('study : ' + study);
    study.save((err, studyInfo) => {
        if (err){
            console.log('register Error .. ' + err)
            return res.json({ success: false, err })
        }
        return res.status(200).json({
            success: true
        })
    })
})

// 1달 단위의  스터디 정보
app.post('/api/studies/selectStudyInfo', (req, res) => {

  // 1. 기간 내의 모든, studyDate 가져오기
  // 2. groupby(studyDate) 해서 , 총 건수, id 이렇게 가져오면 됨.
  // 총 건수 = title , start = studyDate , id = 내부적으로 만들어 줘도 됨..
  // console.log('selectAll req.body .. is.. ' + JSON.stringify(req.body));

  let region = req.body.region; 

  let where = {
    'studyDate':  {"$gte": new Date(req.body.start), "$lt": new Date(req.body.end)},
    'region': region
  };

  let eventDb = []
  // 바로 총 갯수만 구하기..
  Study.find(where).distinct('studyDate', (err, docs) => {

    if (err){
      console.log('selectStudyInfo Error .. ' + err)
      return res.json({ success: false, err })
    }

    let totalCnt = docs.length;
    let eventGuid = 0;

    if (totalCnt === 0)
      return res.json({ 
                        success: true,
                        eventDb: [{
                        'title': 0,
                        'region': region
                        }]
                      })

      docs.forEach(studyDatePer => {
        Study.find({
          'studyDate': studyDatePer,
          'region': region
        }).countDocuments((err, cnt) => {
          let strStudyDate = getTodayStr(studyDatePer)

          if(err)
            return res.json({ success: false, err })
          
          eventDb.push({
            id: eventGuid++,
            title: cnt,
            start: strStudyDate,
            region: region
          })

          if (eventGuid === totalCnt){
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

// 선택한 날짜에 대한 스터디 정보
app.post('/api/studies/getStudyList', (req, res) => {
  
  let studyInfos = [];
  let studyDateS = new Date(req.body.studyDate);
  let studyDateE = new Date(req.body.studyDate);
  let index = 0;
  studyDateE.setDate(studyDateS.getDate() + 1);

  let where = {
    'studyDate' :  {"$gte": studyDateS, "$lt": studyDateE},
    'region': req.body.region
  }

  console.log('where : ' + JSON.stringify(where))

  Study.find(where).sort({'startTime': 1}).exec((err, doc) => {

    if (err) {
      console.log('getStudyList Error .. ' + err)
      res.json({ success: false, err })
    }

    if (doc.length === 0){
      res.status(200).json({
        success: true,
        studyList: studyInfos
      })
    }

    doc.forEach((info) => {
      studyInfos.push(new Study(info));
      index++;
      if (index === doc.length){
        res.status(200).json({
          success: true,
          studyList: studyInfos
        })
      } 
    })

  })
})

// maxId 가져오기
app.get('/api/studies/getMaxId', (req, res) => {

  Study.aggregate([ 
    { "$group": { 
        "_id": null,
        "max": { "$max": "$studyId" }, 
        "min": { "$min": "$studyId" } 
    }}
  ], (err, result) => {
    if (err){
      console.log('getMaxId Error .. : ' + err);
      return { 'sucess': false, err }
    }

    let max = 0;

    if (result.length != 0)
      max = result[0].max

    console.log('server data check.. ' + max);

    res.status(200).json({
      success: true,
      maxId: max
    })
  })
})

// 상세정보 조회 !
app.post('/api/studies/getDetail', (req, res) => {

  let where = {'studyId' :  req.body.studyId};
  let contentData = '';
  let stationData = '';

  Study.find(where, (err, doc) => {
    if (err) {
      console.log('getDetail Error .. ' + err)
      res.json({ success: false, err })
    }
    if (doc.length != 0){
      console.log('doc.length != 0 ... doc is ' )
      console.log(doc)
      contentData = doc[0].content
      stationData = doc[0].station
    }
    res.status(200).json({
        success: true,
        content: contentData,
        station: stationData
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})