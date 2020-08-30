import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import { requestStudyDetail } from '../../../requests';

function getModalStyle() {
  const top = 55;
  const left = 55;

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

export default function StudyDetail(props) {

  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [body, setBody] = React.useState(
  <div style={modalStyle} className={classes.paper} >
    <h2 id="simple-modal-title">스터디 내용</h2>
    <p id="simple-modal-description">
      no content...
    </p>
  </div>);

  const handleOpen = () => {
    requestStudyDetail(props.studyId).then(result => {
 
     if (!result.success){
        alert('detail modal open error !! ')
      }else {
        let content = result.content;
        let station = result.station;

        console.log('here .. result ')
        console.log(result)
        console.log(JSON.stringify(result))

        setBody(
          <div style={modalStyle} className={classes.paper} >
            <h2 id="simple-modal-title">스터디 소개</h2>
            <p id="simple-modal-description">
            <li>장소 : {station}</li>
            <li>내용 :
              {
                content.split('\n').map((line, index) => {
                  return (<span key={index}>{line}<br /></span>)
                })
              }
            </li>
            <li>참가 인원: 프로필 똥그라미?!</li>
            </p>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            닫기
          </Button>
          <Button onClick={handleClose} color="primary">
            참가하기
          </Button>
        </DialogActions>
          </div>
        );
        setOpen(true);
      }
    })
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{display: "contents"}}>
      <Button onClick={handleOpen} color="primary">Detail</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}