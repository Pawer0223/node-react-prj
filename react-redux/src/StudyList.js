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

  useEffect(() => {
    axios.get('http://localhost:5000/api/test')
    .then(response => {console.log(response.data)})
  }, [])

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
    let start = props.studyList.length - 1 - ((currentPage - 1) * perPageCnt);
    if (start < 0) start = 0;
    let end = start - perPageCnt + 1;
    if (end < 0) end = 0

    for (let i = start; i >= end; i--) {
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