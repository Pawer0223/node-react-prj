import { requestEventsInRange, requestEventCreate, requestEventUpdate, requestEventDelete, requestStudyReg, requestLoginUser, requestAuth } from './requests'

export default {

  toggleWeekends() {
    return {
      type: 'TOGGLE_WEEKENDS'
    }
  },

  requestEvents(startStr, endStr, region) {
    return (dispatch) => {
      return requestEventsInRange(startStr, endStr, region).then((plainEventObjects) => {
        dispatch({
          type: 'RECEIVE_EVENTS',
          plainEventObjects
        })
      })
    }
  },

  createEvent(plainEventObject) {
    return (dispatch) => {
      return requestEventCreate(plainEventObject).then((newEventId) => {
        dispatch({
          type: 'CREATE_EVENT',
          plainEventObject: {
            id: newEventId,
            ...plainEventObject
          }
        })
      })
    }
  },

  updateEvent(plainEventObject) {
    return (dispatch) => {
      return requestEventUpdate(plainEventObject).then(() => {
        dispatch({
          type: 'UPDATE_EVENT',
          plainEventObject
        })
      })
    }
  },

  deleteEvent(eventId) {
    return (dispatch) => {
      return requestEventDelete(eventId).then(() => {
        dispatch({
          type: 'DELETE_EVENT',
          eventId
        })
      })
    }
  },

 registStudy(dataToSubmit, closeFunc) {
   return (dispatch) => {
     return requestStudyReg(dataToSubmit, closeFunc).then((success) => {
      dispatch({
         type: 'REGISTER_STUDY',
         isSucess: success
        })
      })
    }
  },

  loginUser(dataToSubmit, props) {
    return (dispatch) => {
      return requestLoginUser(dataToSubmit, props).then((loginUserInfo) => {
        dispatch({
           type: 'LOGIN_USER',
           loginUserInfo: loginUserInfo
        })
      })
    }
  },

  auth(props, option) {
    return (dispatch) => {
      return requestAuth(props, option).then(loginUserInfo => {
        dispatch({
          type: 'AUTH_USER',
          loginUserInfo: loginUserInfo
        })
      })
    }
  }

}// end