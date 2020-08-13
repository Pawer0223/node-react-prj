import React from 'react'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'

function Temp1(props) {


    return (
        <div className = 'mypage-body'>
            <div className = 'body-wrapper box'>
                <div className = 'body-info-container'>
                    <div className = 'calendar-wrapper'>
                        <FullCalendar defaultView="dayGridMonth" plugins={[ dayGridPlugin ]}/>    
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Temp1
