import { combineReducers } from 'redux'
import { hashById } from './utils'

import { getType } from "typesafe-actions";
import * as Actions from "./actions";


export default combineReducers({
  weekendsVisible,
  mainStudyList,
  currentDate
})

function currentDate(currentDate = {}, action) {
  switch (action.type) {

    case getType(Actions.currentDate()):
      return action.payload

    default:
      return currentDate
  }
}


function weekendsVisible(weekendsVisible = true, action) {
  switch (action.type) {

    case 'TOGGLE_WEEKENDS':
      return !weekendsVisible

    default:
      return weekendsVisible
  }
}

function mainStudyList(mainStudyList = {}, action) {
  switch (action.type) {
    case getType(Actions.startMain()):
      return {
        ...mainStudyList
      };

    case getType(Actions.selectMainStudies()):
      return {
        ...mainStudyList,
        ...action.payload
      };

    default:
      return mainStudyList
  }
}


function mainStudyList2(mainStudyList = {}, action) {
  switch (action.type) {

    case 'RECEIVE_EVENTS':
      return hashById(action.plainEventObjects)

    case 'CREATE_EVENT':
    case 'UPDATE_EVENT':
      return {
        ...mainStudyList,
        [action.plainEventObject.id]: action.plainEventObject
      }

    case 'DELETE_EVENT':
      mainStudyList = {...mainStudyList} // copy
      delete mainStudyList[action.eventId]
      return mainStudyList

    default:
      return mainStudyList
  }
}
