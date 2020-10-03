import React from 'react'
import { bindActionCreators } from 'redux'
import { useSelector, useDispatch } from 'react-redux'
import { createSelector } from 'reselect'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import * as actionCreators from '../../actions'
import { getHashValues } from '../../utils'
import Sidebar from './Sidebar'

function Main(props) {

  const dispatch = useDispatch();

  const getEventArray = createSelector(
    (state) => state.mainStudyList,
    (eventsById) => Object.values(eventsById)
  )

  const events = useSelector(getEventArray);
  const weekendsVisible = useSelector((state) => state.weekendsVisible);
  const currentDate = useSelector((state) => state.currentDate);

  // handlers for user actions
  // ------------------------------------------------------------------------------------------
  const handleDateSelect = (selectInfo) => {
    let calendarApi = selectInfo.view.calendar
    let title = prompt('Please enter a new title for your event')

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({ // will render immediately. will call handleEventAdd
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      }, true) // temporary=true, will get overwritten when reducer gives new events
    }
  }

  const handleEventClick = (clickInfo) => {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove() // will render immediately. will call handleEventRemove
    }
  }

  // handlers that initiate reads/writes via the 'action' props
  // ------------------------------------------------------------------------------------------
  const handleDates = (rangeInfo) => {
    dispatch(actionCreators.currentDate()(rangeInfo));
    dispatch(actionCreators.startMain()());
  }

  const handleEventAdd = (addInfo) => {
    // actionCreators.createEvent(addInfo.event.toPlainObject())
    //   .catch(() => {
    //     reportNetworkError()
    //     addInfo.revert()
    //   })
  }

  const handleEventChange = (changeInfo) => {
    // actionCreators.updateEvent(changeInfo.event.toPlainObject())
    //   .catch(() => {
    //     reportNetworkError()
    //     changeInfo.revert()
    //   })
  }

  const handleEventRemove = (removeInfo) => {
    // actionCreators.deleteEvent(removeInfo.event.id)
    //   .catch(() => {
    //     reportNetworkError()
    //     removeInfo.revert()
    //   })
  }

  return (
    <div className='demo-app'>
      <Sidebar />
      <div className='demo-app-main'>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          contentHeight='auto'
          initialView='dayGridMonth'
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={weekendsVisible}
          datesSet={handleDates}
          select={handleDateSelect}
          events={events}
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
          eventAdd={handleEventAdd}
          eventChange={handleEventChange} // called for drag-n-drop/resize
          eventRemove={handleEventRemove}
        />
      </div>
    </div>
  )
}

// inner component1
function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

// inner component2
function renderSidebarEvent(plainEventObject) {
  return (
    <li key={plainEventObject.id}>
      <b>{formatDate(plainEventObject.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
      <i>{plainEventObject.title}</i>
    </li>
  )
}

function reportNetworkError() {
  alert('This action could not be completed')
}


export default Main;

// export default connect(mapStateToProps, actionCreators)(Main)
