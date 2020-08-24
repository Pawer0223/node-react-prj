import { excludeById, getTodayStr } from './utils'
import axios from 'axios';

/*
functions that simulate network requests
*/

let todayStr = getTodayStr()
let eventGuid = 0
const DELAY = 200
let simulateErrors = false

// document.addEventListener('keypress', (ev) => {
//   if (ev.key === 'e') {
//     alert('You pressed the key "e". Will begin to simulate errors.')
//     simulateErrors = true
//   }
// })

export function requestEventsInRange(startStr, endStr) {
  console.log(`[STUB] requesting events from ${startStr} to ${endStr}`)

  return new Promise((resolve, reject) => {

    let where = {
      start : startStr,
      end : endStr
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
          console.log('eventDb size.. ' + eventDb.length);
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

export function requestStudyList(clickData) {

  let where = {
    'studyDate': clickData.event.start
  }
  return new Promise((resolve, reject) => {

    // 1. call api .. 나중에 지역 조건도 추가해야 함. 현재는 날짜로만...
    axios.post('http://localhost:5000/api/studies/getStudyList', where)
    .then(response => {
      // 2. setData --> for ... paging... 
      if (!response.data.success){
        reject(new Error('getStudyList Error'))
        return { 'success': false };
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
  console.log('############ requestMaxId ############')

  return new Promise((resolve, reject) => {

    axios.get('http://localhost:5000/api/studies/getMaxId')
    .then(response => {
      if (!response.data.success){
        reject(new Error('getStudyList Error'))
        return { 'success': false };
      } else {
        console.log('requestMaxId... ' + JSON.stringify(response.data))
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
        return { 'success': false };
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
