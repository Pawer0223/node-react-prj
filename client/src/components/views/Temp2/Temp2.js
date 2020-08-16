import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick


function renderEventContent(info) {
    alert('Clicked on: ' + info.dateStr);
    // alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
    alert('Current view: ' + info.view.type);
    // change the day's background color just for fun
    info.dayEl.style.backgroundColor = '#f3e000';
}

function Temp2() {

    return (
        <FullCalendar
        plugins={[ dayGridPlugin, interactionPlugin ]}
        initialView="dayGridMonth"
        // weekends = {false}
        events={[ 
            {title: 'event 1', date:'2020-08-15'}
        ]}
        dateClick={renderEventContent}
        />
    )
    
}

export default Temp2