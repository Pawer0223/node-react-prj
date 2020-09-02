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
      return hashById(action.plainEventObjects)
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

function user(state = {}, action){
  console.log('user .. state .. ', JSON.stringify(state))
  console.log('user .. action .. ', JSON.stringify(action))
  switch (action.type) {
    case 'LOGIN_USER':
        return { ...state, loginUserId: action.loginUserId}
    default:
        return state;
  }
}