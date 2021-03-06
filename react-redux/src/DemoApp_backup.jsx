import React from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin, { buildTimeColsModel } from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import actionCreators from './actions'
import { getHashValues } from './utils'
import Modal from '@material-ui/core/Modal';
import StudyList from './StudyList'
import RegisteStudy from './components/views/RegisterPage/RegisteStudy'

class DemoApp extends React.Component {

  state = {
    open: false,
    getList: "",
    registForm: "",
    open2: false
  };
  
  handleOpen = (clickInfo) => {
    this.setState(state => ({
      getList: <StudyList eventInfo={clickInfo.event} />,
      open: true
    }))
  };

  handleClose = () => {
    this.setState(state => ({
      open: false,
      getList: ""
    }))
  };

  eventRegistOpen = (startStr) => {
    this.setState(state => ({
      open2: true,
      // region 정보도 같이... 
      registForm: <RegisteStudy
                    clickedDate= {startStr}
                    hadleStudyReg = {this.hadleStudyReg}
                    />
    }))
  };

  eventRegistClose = () => {
    this.setState(state => ({
      open2: false,
      registForm: ""
    }))
  };

  render() {
    return (
      <div className='demo-app'>
        {this.renderSidebar()}
        <div className='demo-app-main'>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            initialView='dayGridMonth'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={this.props.weekendsVisible}
            datesSet={this.handleDates}
            select={this.handleDateSelect}
            events={this.props.events}
            eventContent={renderEventContent} // custom render function
            eventClick={this.handleOpen}
            eventAdd={this.handleEventAdd}
            eventChange={this.handleEventChange} // called for drag-n-drop/resize
            eventRemove={this.handleEventRemove}
          />
      </div>
      <div>
      <Modal
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        >
          {this.state.getList}
      </Modal>
      {this.state.registForm}
      </div>
    </div>
    )
  }

  renderSidebar() {
    return (
      <div className='demo-app-sidebar'>
        <div className='demo-app-sidebar-section'>
          <h2>Instructions</h2>
          <ul>
            <li>Select dates and you will be prompted to create a new event</li>
            <li>Drag, drop, and resize events</li>
            <li>Click an event to delete it</li>
            <li>Add</li>
          </ul>
        </div>
        <div className='demo-app-sidebar-section'>
          <label>
            <input
              type='checkbox'
              checked={this.props.weekendsVisible}
              onChange={this.props.toggleWeekends}
            ></input>
            toggle weekends
          </label>
        </div>
        <div className='demo-app-sidebar-section'>
          <h2>All Events ({this.props.events.length})</h2>
          <ul>
            {this.props.events.map(renderSidebarEvent)}
          </ul>
        </div>
      </div>
    )
  }

  // handlers for user actions
  // ------------------------------------------------------------------------------------------

  handleDateSelect = (selectInfo) => {
    if (this.state.open2){
      this.eventRegistClose()
    }
    // region 정보도 같이... 

    this.eventRegistOpen(selectInfo.startStr)
    // console.log('handleDateSelect clicked : ' + this.props.events)
    // console.log(selectInfo)
  }

  // handlers that initiate reads/writes via the 'action' props
  // ------------------------------------------------------------------------------------------

  handleDates = (rangeInfo) => {
    this.props.requestEvents(rangeInfo.startStr, rangeInfo.endStr)
      .catch(reportNetworkError)
  }

  handleEventAdd = (addInfo) => {
    this.props.createEvent(addInfo.event.toPlainObject())
      .catch(() => {
        reportNetworkError()
        addInfo.revert()
      })
  }

  handleEventChange = (changeInfo) => {
    this.props.updateEvent(changeInfo.event.toPlainObject())
      .catch(() => {
        reportNetworkError()
        changeInfo.revert()
      })
  }

  handleEventRemove = (removeInfo) => {
    this.props.deleteEvent(removeInfo.event.id)
      .catch(() => {
        reportNetworkError()
        removeInfo.revert()
      })
  }

  hadleStudyReg = (submitData, closeFunc) => {
    this.props.registStudy(submitData, closeFunc)
      .catch(reportNetworkError)
   window.location.reload(); 
  }

}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

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

function mapStateToProps() {
  console.log('map state to props .. .called...')
  const getEventArray = createSelector(
    (state) => state.eventsById,
    getHashValues
  )

  return (state) => {
    return {
      events: getEventArray(state),
      weekendsVisible: state.weekendsVisible
    }
  }
}

export default connect(mapStateToProps, actionCreators)(DemoApp)
