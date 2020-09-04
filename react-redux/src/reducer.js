import { combineReducers } from 'redux'
import { hashById } from './utils'
import actions from './actions'

const studyInitialState = {
  isSuccess: false
}

export default combineReducers({
  weekendsVisible,
  eventsById,
  study,
  user
})

function weekendsVisible(weekendsVisible = true, action) {
  switch (action.type) {

    case 'TOGGLE_WEEKENDS':
      return !weekendsVisible

    default:
      return weekendsVisible
  }
}

function eventsById(eventsById = {}, action) {
  switch (action.type) {

    case 'RECEIVE_EVENTS': {
      let result = hashById(action.plainEventObjects);
      // console.log('reducer... result.. -->>> ' + JSON.stringify(result))
      return result
    }

    case 'CREATE_EVENT':
    case 'UPDATE_EVENT':
      return {
        ...eventsById,
        [action.plainEventObject.id]: action.plainEventObject
      }

    case 'DELETE_EVENT':
      eventsById = {...eventsById} // copy
      delete eventsById[action.eventId]
      return eventsById

    default:
      return eventsById
  }
}

function study(state = studyInitialState, action) {
  switch (action.type) {

      case 'REGISTER_STUDY':
        return { ...state, registResult: action.isSucess }
  
      default:
        return state;
    }
}

function user(userInfo = {}, action){
  console.log('user .. userInfo .. ', JSON.stringify(userInfo))
  console.log('user .. action .. ', JSON.stringify(action))
  switch (action.type) {
    case 'LOGIN_USER':
        return {
          ...userInfo,
          loginUserInfo: action.loginUserInfo
        }
    case 'AUTH_USER':
        return {
          ...userInfo,
          loginUserInfo: action.loginUserInfo
        }

    default:
        return {...userInfo};
  }
}