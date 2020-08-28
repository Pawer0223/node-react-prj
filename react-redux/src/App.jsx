import React from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin, { buildTimeColsModel } from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import actionCreators from './actions'
import { getHashValues } from './utils'
import { requestStudyList } from './requests'

import RegisteStudy from './components/views/RegisterPage/RegisteStudy'
import StudyList from './components/views/StudyInfos/StudyList'
import SearchPage from './components/views/SearchPage/SearchPage'


class App extends React.Component {

  state = {
    open: false,
    studyList: "",
    open2: false,
    registForm: "",
    rangeInfo: ""
  };

  handlerangeInfo = (info) => {
    this.setState(state => ({
      rangeInfo: info
    }))
  };

  handleStudyListOpen = (clickInfo) => {

    requestStudyList(clickInfo).then((result) => {
      if (!result.success){
        alert('get Study Infos Error !!');
      } else {
        this.setState(state => ({
          open: true,
          studyList: <StudyList
                        studyList= {result.studyList}
                     />
        }))
      }
    })
  };

  handleStudyListClose = () => {
    this.setState(state => ({
      open: false,
      studyList: ""
    }))
  };


  handleStudyRegOpen = (startStr) => {
    this.setState(state => ({
      open2: true,
      // region 정보도 같이... 
      registForm: <RegisteStudy
                    clickedDate= {startStr}
                    hadleStudyReg = {this.hadleStudyReg}
                  />
    }))
  };

  handleStudyRegClose = () => {
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
            eventClick={this.handleEventClick}
            eventAdd={this.handleEventAdd}
            eventChange={this.handleEventChange} // called for drag-n-drop/resize
            eventRemove={this.handleEventRemove}
          />
      </div>
      <div>
        {this.state.studyList}
        {this.state.registForm}
      </div>
    </div>
    )
  }

  renderSidebar() {
    let totalLen = 0;
    
    this.props.events.forEach(study => {
      totalLen += study.title;  
    });
    return (
      <div className='demo-app-sidebar'>
        <div className='demo-app-sidebar-section'>
          <h2>Match Study</h2>
          <ul>
            <li>지역을 검색하시면, 스터디 정보가 달력에 표시됩니다.( 파란색 바 )</li>
            <li>스터디가 없다면, 달력에 아무것도 표시되지 않습니다.</li>
            <li>날짜를 선택하여 새로운 스터디를 등록할 수 있습니다.</li>
            <li>지역 검색의 최소 단위는 행정동 명칭 입니다.</li>
          </ul>
        </div>
        <div className='demo-app-sidebar-section'>
          <SearchPage 
            reloadEventsFunc = {this.props.requestEvents}
            rangeInfo = {this.state.rangeInfo}
          />
        </div>
        <div className='demo-app-sidebar-section'>
          <label>
            <input
              type='checkbox'
              checked={this.props.weekendsVisible}
              onChange={this.props.toggleWeekends}
            ></input>
            weekends
          </label>
        </div>
        <div className='demo-app-sidebar-section'>
          <h2>All Events ({totalLen})</h2>
          {/* <ul>
            {this.props.events.map(renderSidebarEvent)}
          </ul> */}
        </div>   
      </div>
    )
  }

  // handlers for user actions
  // ------------------------------------------------------------------------------------------

  handleDateSelect = (selectInfo) => {
    if (this.state.open2){
      this.handleStudyRegClose()
    }
    // region 정보도 같이... 
    this.handleStudyRegOpen(selectInfo.startStr)
    // console.log('handleDateSelect clicked : ' + this.props.events)
    // console.log(selectInfo)
  }

  handleEventClick = (clickInfo) => {
    if (this.state.open){
      this.handleStudyListClose()
    }
    this.handleStudyListOpen(clickInfo)
  }

  // handlers that initiate reads/writes via the 'action' props
  // ------------------------------------------------------------------------------------------
  handleDates = (rangeInfo) => {
    this.handlerangeInfo(rangeInfo);
    this.props.requestEvents(rangeInfo.startStr, rangeInfo.endStr, undefined)
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
      {/* <i>{plainEventObject.title}</i> */}
    </li>
  )
}

function reportNetworkError() {
  alert('This action could not be completed')
}

function mapStateToProps() {
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

export default connect(mapStateToProps, actionCreators)(App)
