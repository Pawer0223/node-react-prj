import React from 'react'

// inner component1
function EventContent(eventInfo) {

  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

export default EventContent;