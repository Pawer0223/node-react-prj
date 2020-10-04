import React from 'react'

function EventContent(eventInfo) {

  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

export default EventContent;