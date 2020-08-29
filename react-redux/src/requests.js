import { excludeById, getTodayStr } from './utils'
import fetch from 'cross-fetch';
import axios from 'axios';
import 'babel-polyfill';

/*
functions that simulate network requests
*/

let todayStr = getTodayStr()
let eventGuid = 0
const DELAY = 200
const config = require('./config/config');
const LOCAL_API_KEY = config.LOCAL_API_KEY;
let simulateErrors = false
let currentRegion = '';

async function requestCurrentRegion(position) {
    const response = await fetch("https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?input_coord=WGS84&output_coord=WGS84&y="+position.coords.latitude+"&x="+position.coords.longitude, {
      headers: {
        Authorization: `KakaoAK ${LOCAL_API_KEY}`
      }
    })  
    const result = await response.json();
    console.log('result : ' + JSON.stringify(result));
    
    if (result.documents.length > 0 ){
      let obj = result.documents[0];
      
      let sido, sikunku, hangjeongdong;

      sido = obj.region_1depth_name;
      if (sido === '경기'){
        sido = '경기도'
      }
      sikunku = obj.region_2depth_name;
      hangjeongdong = obj.region_3depth_name;

      currentRegion = sido + ' ' +  sikunku + ' ' + hangjeongdong;
    }
}

function requetWithCurrentRegion(startStr, endStr) {
  if (navigator.geolocation) { // GPS를 지원하면
    navigator.geolocation.getCurrentPosition(function(position) {
      requestCurrentRegion(position).then(() => {
        console.log('this is caaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaall back ')
        console.log('currentRegion is !! : ' + currentRegion)
      })
    }, function(error) {
      console.error(error);
    }, {
      enableHighAccuracy: false,
      maximumAge: 0,
      timeout: Infinity
    });
  } else {
    alert('GPS를 지원하지 않습니다');
  }
}

export function requestEventsInRange(startStr, endStr, region) {
  console.log(`[STUB] requesting events from ${startStr} to ${endStr} and Region Info : [ ${region} ]`)

  if (region === undefined) {
    console.log('this is undefined');

    if (navigator.geolocation) { // GPS를 지원하면
      navigator.geolocation.getCurrentPosition(function(position) {
        requestCurrentRegion(position).then(() => {
          
          return new Promise((resolve, reject) => {

            let where = {
              start: startStr,
              end: endStr,
              region: currentRegion
            }
        
            // axios로 가져와서 eventDb에 담아주기
            axios.post('http://localhost:5000/api/studies/selectStudyInfo', where)
              .then(response => {
                  
                if (!response.data.success){
                  console.log('study list select fail...')
                  reject(new Error('study list select Error !'))
                }
                else {
                  let eventDb = response.data.eventDb;
                  resolve(response.data.eventDb);
                }
              })
          })
        })
      }, function(error) {
        console.error(error);
      }, {
        enableHighAccuracy: false,
        maximumAge: 0,
        timeout: Infinity
      });
    } else {
      alert('GPS를 지원하지 않습니다');
    }
  }

  return new Promise((resolve, reject) => {

    console.log('region.. !!! ')

    let where = {
      start: startStr,
      end: endStr,
      region: region
    }

    // axios로 가져와서 eventDb에 담아주기
    axios.post('http://localhost:5000/api/studies/selectStudyInfo', where)
      .then(response => {
          
        if (!response.data.success){
          console.log('study list select fail...')
          reject(new Error('study list select Error !'))
        }
        else {
          let eventDb = response.data.eventDb;
          resolve(response.data.eventDb);
        }
      })
  })

}

export function requestEventCreate(plainEventObject) {
  console.log('[STUB] requesting event create:', plainEventObject)

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (simulateErrors) {
        reject(new Error('error'))
      } else {
        let newEventId = createEventId()
        let objWithId = {...plainEventObject, id: newEventId}
        eventDb.push(objWithId)
        resolve(newEventId)
      }
    }, DELAY)
  })
}

export function requestEventUpdate(plainEventObject) {
  console.log('[STUB] requesting event update:', plainEventObject)

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (simulateErrors) {
        reject(new Error('problem'))
      } else {
        eventDb = excludeById(eventDb, plainEventObject.id)
        eventDb.push(plainEventObject)
        resolve(eventDb)
      }
    }, DELAY)
  })
}

export function requestEventDelete(eventId) {
  console.log('[STUB] requesting event delete, id:', eventId)

  return new Promise((resolve, reject) => {
    setTimeout(() => { // simulate network delay
      if (simulateErrors) {
        reject(new Error('problem'))
      } else {
        eventDb = excludeById(eventDb, eventId)
        resolve(eventDb)
      }
    }, DELAY)
  })
}

export function requestStudyReg(dataToSubmit, closeFunc) {
  
  return new Promise((resolve, reject) => {

    axios.post('http://localhost:5000/api/studies/register', dataToSubmit)
      .then(response => {
        if (!response.data.success) {
          reject(new Error('Study Regist Error'))
        } else {
          let success =  response.data.success;
          alert('Regist Event Success')
          closeFunc();
          resolve(success);
        }
      })
    })
}

export function requestStudyList(clickData, region) {

  console.log('this is region : ' + region)

  let where = {
    'studyDate': clickData.event.start,
    'region': region
  }

  console.log('here where : ' + JSON.stringify(where))

  
  return new Promise((resolve, reject) => {

    // 1. call api .. 나중에 지역 조건도 추가해야 함. 현재는 날짜로만...
    axios.post('http://localhost:5000/api/studies/getStudyList', where)
    .then(response => {
      // 2. setData --> for ... paging... 
      if (!response.data.success){
        reject(new Error('getStudyList Error'))
      } else {
        // response is json array..
        resolve({
          'success': true,
          'studyList': response.data.studyList
        })
      }
    })
  })
}

export function requestMaxId(){
  return new Promise((resolve, reject) => {

    axios.get('http://localhost:5000/api/studies/getMaxId')
    .then(response => {
      if (!response.data.success){
        reject(new Error('getStudyList Error'))
      } else {
        resolve({
          'success': true,
          'maxId': response.data.maxId
        })
      }
    })
  })
}

export function requestStudyDetail(studyId) {

  let where = {
    'studyId': studyId
  }
  return new Promise((resolve, reject) => {
    axios.post('http://localhost:5000/api/studies/getDetail', where)
    .then(response => {
      if (!response.data.success){
        reject(new Error('requestStudyDetail Error'))
      } else {
        resolve({
          'success': true,
          'content': response.data.content
        })
      }
    })
  })
}




function createEventId() {
  return String(eventGuid++)
}
