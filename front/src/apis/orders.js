import { getTodayStr, hashById } from '../utils'
let todayStr = getTodayStr()
let eventGuid = 0
let studyDb = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: todayStr
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: todayStr + 'T12:00:00'
  }
]

function createEventId() {
  return String(eventGuid++)
}

let simulateErrors = false
const DELAY = 200

export function requestStudiesInRange(startStr, endStr) {
    console.log(`[STUB] requesting events from ${startStr} to ${endStr}`)
  
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (simulateErrors) {
          reject(new Error('error'))
        } else {
          resolve(hashById(studyDb)) // won't use the start/end, always return whole DB
        }
      }, DELAY)
    })
  }