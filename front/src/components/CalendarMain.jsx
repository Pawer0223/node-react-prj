import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import EventContent from '../pages/EventContent'

export const CalendarMain = (props) => {
  return (
    <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        contentHeight='auto' // because resizeing error !
        initialView='dayGridMonth'
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={props.weekendsVisible}
        datesSet={props.handleDates}
        select={props.handleDateSelect}
        events={props.events}
        eventContent={EventContent} // custom render function
        eventClick={props.handleEventClick}
        eventAdd={props.handleEventAdd}
        eventChange={props.handleEventChange} // called for drag-n-drop/resize
        eventRemove={props.handleEventRemove}
    />
  )
}