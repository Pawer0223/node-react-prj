import { createAction } from "typesafe-actions";
import { requestEventsInRange, requestEventCreate, requestEventUpdate, requestEventDelete } from './requests';

  export function toggleWeekends() {
    return {
      type: 'TOGGLE_WEEKENDS'
    }
  }

  export const startMain = createAction(
    "@command/events/startMain",
    (resolve) => {
      return () => resolve();
    }
  );

  export const selectMainStudies = createAction(
    "@command/events/selectMainStudies",
    (plainEventObjects) => plainEventObjects
  );

  export function requestEvents(startStr, endStr) {
      requestEventsInRange(startStr, endStr).then((plainEventObjects) => {
        return {
          type: 'RECEIVE_EVENTS',
          plainEventObjects
        }
      })
  }

  export function createEvent(plainEventObject) {
      return requestEventCreate(plainEventObject).then((newEventId) => {
        return {
          type: 'CREATE_EVENT',
          plainEventObject: {
            id: newEventId,
            ...plainEventObject
          }
        }
      })
  }

  export function updateEvent(plainEventObject) {
      return requestEventUpdate(plainEventObject).then(() => {
        return {
          type: 'UPDATE_EVENT',
          plainEventObject
        }
      })
  }

  export function deleteEvent(eventId) {
      return requestEventDelete(eventId).then(() => {
        return {
          type: 'DELETE_EVENT',
          eventId
        }
      })
  }