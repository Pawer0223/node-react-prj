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
let searchRegion = '';

async function requestCurrentRegion(position, region) {

  if (region != undefined) {
    searchRegion = region;
    return ;
  }
  const response = await fetch("https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?input_coord=WGS84&output_coord=WGS84&y="+position.coords.latitude+"&x="+position.coords.longitude, {
    headers: {
      Authorization: `KakaoAK ${LOCAL_API_KEY}`
    }
  })  
  const result = await response.json();
  // console.log('get current location result : ' + JSON.stringify(result));
  
  if (result.documents.length > 0 ){
    let obj = result.documents[0];
    
    let sido, sikunku, hangjeongdong;

    sido = obj.region_1depth_name;
    if (sido === '경기'){
      sido = '경기도'
    }
    sikunku = obj.region_2depth_name;
    hangjeongdong = obj.region_3depth_name;

    searchRegion = sido + ' ' +  sikunku + ' ' + hangjeongdong;
  }
  return searchRegion;
}

export function requestEventsInRange(startStr, endStr, region) {
  console.log(`[STUB] requesting events from ${startStr} to ${endStr} and Region Info : [ ${region} ]`)

  return new Promise((resolve, reject) => {

    if (navigator.geolocation) { // GPS를 지원하면
      
      navigator.geolocation.getCurrentPosition(function(position) {
        requestCurrentRegion(position, region).then(() => {

          let where = {
            start: startStr,
            end: endStr,
            region: searchRegion
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
                resolve(eventDb);
              }
            })
        })
      }, function(error) {
        console.error(error);
        reject(new Error('study list select Error !'))
      }, {
        enableHighAccuracy: false,
        maximumAge: 0,
        timeout: Infinity
      });
    }
    else {
      alert('GPS를 지원하지 않아 현재위치를 받아올 수 없습니다. 검색하여 이용해 주세요.');
      reject(new Error('study list select Error !'))
    }
  })
}

/*
  Users
*/

export function requestUserReg(dataToSubmit, closeFunc) {

  axios.post('http://localhost:5000/api/users/register', dataToSubmit)
    .then(response => {
      if (!response.data.success) {
        throw new Error('User Regist Error Occur !!!! ');
      } else {
        alert('Success');
        closeFunc();
      }
    }).catch((err) => {
      console.log(err);
    })
}

export function requestLoginUser(dataToSubmit, props) {

  return new Promise((resolve, reject) => {
    axios.post('http://localhost:5000/api/users/login', dataToSubmit, {withCredentials: true})
      .then(response => {
        let loginUserInfo = {};
        if (!response.data.loginSuccess){
          alert(response.data.message)
        } else {
          loginUserInfo = response.data.loginUserInfo;
          props.history.push('/')
        }
        resolve(loginUserInfo);
    }).catch((err) => {
      throw new Error('login Error')
    })
  })
}

export function requestAuth(props, option) {

  // option : 로그인 한 유저의 출입여부.

  // 1. /login은 로그인 하지 않은 유저만 접근 가능

  // 2. home은 로그인 한 유저만 접근 가능

  console.log('######### auth in ## ')

  return new Promise((resolve, reject) => {
      
  axios.get('http://localhost:5000/api/users/auth', {withCredentials: true})
    .then(response => {

      console.log('auth response : ')
      console.log(JSON.stringify(response));

      //로그인 하지 않은 상태
      if (!response.data.isAuth){
          props.history.push('/login');
      }else {
          // 로그인 한 상태
          // if (adminRoute && !response.data.loginUserInfo.isAdmin){
          if (!response.data.loginUserInfo.isAdmin){
              props.history.push('/')
          } else { // 로그인 한 사람이, login페이지에 접근하는 경우 
              props.history.push('/')
          }
      }
      resolve(response.data.loginUserInfo)
    }).catch(new Error('auth error !! '))
  })
}

/*
  Calendars
*/
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
          alert('Success')
          closeFunc();
          resolve(success);
        }
      })
    })
}

export function requestHasEmail(where) {
  let success = false;
  axios.post('http://localhost:5000/api/users/hasEmail', where)
    .then(response => {
      alert(response.data.message);
      success = response.data.success;
    }
  ).catch(err => {
    new Error(err);
  })
  return success;
}


export function requestStudyList(clickData, region) {

  let where = {
    'studyDate': clickData.event.start,
    'region': region
  }
  
  return new Promise((resolve, reject) => {

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
          'content': response.data.content,
          'station': response.data.station
        })
      }
    })
  })
}

function createEventId() {
  return String(eventGuid++)
}
