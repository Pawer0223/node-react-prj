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

  // console.log('props.event INfo .... ' + JSON.stringify(props.studyList));
  let index = 0;
  props.studyList.forEach((stdInfo) => {
    studyList.push(<li>{stdInfo.subject} / {stdInfo.startTime}~{stdInfo.endTime} / ({stdInfo.joinPeople} / {stdInfo.maxPeople}) / <a href='/'>상세</a></li>)
    console.log(index + ' 번째 .. ' + JSON.stringify(stdInfo));
    index++
  });

    
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