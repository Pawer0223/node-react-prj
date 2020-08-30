import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import StudyDetail from './StudyDetail'
import Pagination from '@material-ui/lab/Pagination';
import axios from 'axios'

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

function getSubject(subjectId){
    switch (subjectId) {
      case 0:
        return 'Project'
      case 1:
        return '모각코'
      case 2:
        return '책 완독'
      case 3:
        return '강의'
      case 4:
        return 'Algorithm'
      case 5:
        return '기타'
      default:
        return '없던건데?'
    }
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

  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(true);
  const [prevPage, setPrevPage] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [studyList, setStudyList] = React.useState([]);
  const perPageCnt = 5;
  let pageCnt =  parseInt(props.studyList.length / perPageCnt);

  if ((props.studyList.length % perPageCnt) != 0)
    pageCnt++;

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleCurrentPage = (event, selectPage) => {
    setCurrentPage(selectPage)
  }

  const handlePrevPage = () => {
    setPrevPage(currentPage);
  }

  const handleStudyList = (currentPage) => {
    
    let list = [];
    let start = ((currentPage - 1) * perPageCnt);
    let end = start + perPageCnt;
    if (end > props.studyList.length) 
      end = props.studyList.length
    
    for (let i = start; i < end; i++) {
      let stdInfo = props.studyList[i];
      list.push(<li key={i}>{getSubject(stdInfo.subject)} / {stdInfo.startTime}~{stdInfo.endTime} / ({stdInfo.joinPeople} / {stdInfo.maxPeople}) / <StudyDetail studyId={stdInfo.studyId}/> </li>)
    }
    setStudyList(list);
  }

  if (prevPage != currentPage){
    handleStudyList(currentPage);
    handlePrevPage();
  }
   
  return (
    <div>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div style={modalStyle} className={classes.paper}>
        <h2 id="simple-modal-title">Study List</h2>
          <div id="simple-modal-description">
            {studyList}
            <Pagination count={pageCnt} shape="rounded" page={currentPage} onChange={handleCurrentPage}/>
          </div>
      </div>
    </Modal>
    </div>
  );
}