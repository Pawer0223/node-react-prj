import React from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin, { buildTimeColsModel } from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { withRouter } from 'react-router-dom';

import actionCreators from '../../../actions'
import { getHashValues } from '../../../utils'
import { requestStudyList } from '../../../requests'
import Button from '@material-ui/core/Button';

import RegisteStudy from '../RegisterPage/RegisteStudy'
import StudyList from '../StudyInfos/StudyList'
import SearchPage from '../SearchPage/SearchPage'


class Main extends React.Component {

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

    let region = this.props.events[0].region;

    requestStudyList(clickInfo, region).then((result) => {
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

    let region = '';

    if (this.props.events.length  > 0)
      region = this.props.events[0].region;

    this.setState(state => ({
      open2: true,
      // region 정보도 같이... 
      registForm: <RegisteStudy
                    clickedDate= {startStr}
                    hadleStudyReg= {this.hadleStudyReg}
                    region= {region}
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
              left: 'next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek'
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
    
    let region ='';
    let regionComment = '';
    let title = '';
    let loginUserInfo = this.props.userInfo.loginUserInfo;
    let name = 'UNKNOWN';

    if (loginUserInfo !== undefined) {
      name = loginUserInfo.name;
    }

    this.props.events.forEach((study, index) => {
      totalLen += study.title;  
      if (index === 0) {
        region = study.region;
        title = study.title
      }
    });

    regionComment = region;
    if (title === 0){
      regionComment += '(의) 첫 번째 Study를 등록해 주세요 :)'
    }

    console.log("#####################")
    console.log(loginUserInfo);

    return (
      <div className='demo-app-sidebar'>
        <div className='demo-app-sidebar-section'>
          <h2>{name}님 반갑습니다.</h2>
          <Button color="primary">
            logout
          </Button>
          <ul>
            <li>지역을 검색하시면, 스터디 정보가 달력에 표시됩니다.( 파란색 바 )</li>
            <li>스터디가 없다면, 달력에 아무것도 표시되지 않습니다.</li>
            <li>날짜를 선택하여 새로운 스터디를 등록할 수 있습니다.</li>
            <li>지역 검색의 단위는 행정동 명칭 입니다.</li>
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
          <h2>ongoing study({totalLen})</h2>
          <h3>{regionComment}</h3>
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

    console.log('loginUserInfo : ' , JSON.stringify(this.props.userInfo.loginUserInfo))

    if (this.state.open2){
      this.handleStudyRegClose()
    }
    let start = selectInfo.start;

    if ((start.getMonth() + start.getDate()) < (new Date().getMonth() + new Date().getDate())) {
      alert('오늘 날짜 이후로만 등록 가능합니다.')
    } else {
      this.handleStudyRegOpen(selectInfo.startStr)
    }
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
    let region = undefined;

    if (this.props.events.length > 0) {
      region = this.props.events[0].region;
    }

    this.handlerangeInfo(rangeInfo);
    this.props.requestEvents(rangeInfo.startStr, rangeInfo.endStr, region)
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
      weekendsVisible: state.weekendsVisible,
      userInfo: state.user
    }
  }
}

export default connect(mapStateToProps, actionCreators)(withRouter(Main))