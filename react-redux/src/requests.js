import { excludeById, getTodayStr } from './utils'
import axios from 'axios';

/*
functions that simulate network requests
*/

let todayStr = getTodayStr()
let eventGuid = 0
let eventDb = [
  {
    id: createEventId(),
    title: '3',
    start: todayStr
  },
  {
    id: createEventId(),
    title: '1',
    start: todayStr//todayStr + 'T12:00:00'
  }
]

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
    axios.post('http://localhost:5000/api/studies/selectAll', where)

    setTimeout(() => {
      if (simulateErrors) {
        reject(new Error('error'))
      } else {
        resolve(eventDb) // won't use the start/end, always return whole DB
      }
    }, DELAY)
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

function createEventId() {
  return String(eventGuid++)
}
