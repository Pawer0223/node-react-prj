import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import axios from 'axios'

function getModalStyle() {
  const top = 50 ;
  const left = 50 ;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function StudyList(props) {

  useEffect(() => {
    axios.get('http://localhost:5000/api/test')
    .then(response => {console.log(response.data)})
  }, [])

  let where = {
    'studyDate': props.eventInfo.start
  }

  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(true);
  const studyList = []

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    // 1. call api .. 나중에 지역 조건도 추가해야 함. 현재는 날짜로만...
    axios.post('http://localhost:5000/api/studies/getStudyList', where)
    .then(response => {
      // 2. setData --> for ... paging... 
      if (!response.data.success){
        alert('스터디 정보 조회에 실패하였습니다.')
        handleClose();
        return ;
      } else {
        // response is json array..
        let data = response.data.studyList;
        let index = 0;
        data.forEach((stdInfo) => {
          studyList.push(<li>{stdInfo.subject} / {stdInfo.startTime}~{stdInfo.endTime} / ({stdInfo.joinPeople} / {stdInfo.maxPeople}) / <a href='/'>상세</a></li>)
          console.log(index + ' 번째 .. ' + JSON.stringify(stdInfo));
          index++
        });
        console.log(' studyList : ' + JSON.stringify(studyList))
      }
    })
    
  return (
    <div>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title"> Study List</h2>
        <p id="simple-modal-description">
          {studyList}
        </p>
    </div>
    </Modal>
    </div>
  );
}