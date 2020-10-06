import React from 'react'

function EventContent(eventInfo) {

  return (
    <>
      <b>this is {eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

export default EventContent;