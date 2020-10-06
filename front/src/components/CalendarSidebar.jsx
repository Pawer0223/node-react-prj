import React from 'react'
import { formatDate } from '@fullcalendar/react'

export const CalendarSidebar = (props) => {
    return (
        <div className='demo-app-sidebar'>
            <div className='demo-app-sidebar-section'>
                <h2>Instructions</h2>
                    <ul>
                        <li>Select dates and you will be prompted to create a new event</li>
                        <li>Drag, drop, and resize events</li>
                        <li>Click an event to delete it</li>
                    </ul>
            </div>
        <div className='demo-app-sidebar-section'>
            <label>
                <input
                    type='checkbox'
                    checked={props.weekendsVisible}
                    onChange={props.toggleWeekends}
                ></input>
                toggle weekends
            </label>
            </div>
                <div className='demo-app-sidebar-section'>
                    <h2>All Events ({props.events.length})</h2>
                    <ul>
                        {props.events.map(renderSidebarEvent)}
                    </ul>
                </div>
        </div>
    )
}

// 추후 분리하기...
function renderSidebarEvent(plainEventObject) {
  return (
    <li key={plainEventObject.id}>
      <b>{formatDate(plainEventObject.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
      <i>{plainEventObject.title}</i>
    </li>
  )
}