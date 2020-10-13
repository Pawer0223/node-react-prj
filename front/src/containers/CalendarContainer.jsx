import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createSelector } from 'reselect'
import * as actionCreators from '../actions'
import { CalendarMain, CalendarSidebar } from '../components';

function CalendarContainer(props) {

  const dispatch = useDispatch();
  const events = useSelector((state) => Object.values(state.mainStudyList));
  const weekendsVisible = useSelector((state) => state.weekendsVisible);
  
  // const getEventArray = createSelector(
  //   (state) => state.mainStudyList,
  //   (eventsById) => Object.values(eventsById)
  // )

  // handlers for user actions
  // ------------------------------------------------------------------------------------------
  const toggleWeekends = () => {
    dispatch(actionCreators.toggleWeekends()())
  }

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

  // 로그인 한 유저만 가능해야 함.
  const handleEventAdd = (addInfo) => {
    console.log('handleEventAdd')
    // actionCreators.createEvent(addInfo.event.toPlainObject())
    //   .catch(() => {
    //     reportNetworkError()
    //     addInfo.revert()
    //   })
  }

  // 내가 등록한 글만 이동할 수 있다.
  // 내가 등록한 글만 활성화 되도록 할 수 있을까 ??
  const handleEventChange = (changeInfo) => {
    // actionCreators.updateEvent(changeInfo.event.toPlainObject())
    //   .catch(() => {
    //     reportNetworkError()
    //     changeInfo.revert()
    //   })
  }

  // 이것도 update와 동일한 권한 되도록
  const handleEventRemove = (removeInfo) => {
    // actionCreators.deleteEvent(removeInfo.event.id)
    //   .catch(() => {
    //     reportNetworkError()
    //     removeInfo.revert()
    //   })
  }

  return (
    <div className='demo-app'>
            <CalendarSidebar 
                events = {events}
                weekendsVisible = {weekendsVisible}
                toggleWeekends = {toggleWeekends}
            />
        <div className='demo-app-main'>
            <CalendarMain 
                weekendsVisible = {weekendsVisible}
                events = {events}
                handleDates = {handleDates}
                handleDateSelect = {handleDateSelect}
                handleEventClick = {handleEventClick}
                handleEventAdd = {handleEventAdd}
                handleEventChange = {handleEventChange}
                handleEventRemove = {handleEventRemove}
            />
        </div>
    </div>
  )
}

export default CalendarContainer;