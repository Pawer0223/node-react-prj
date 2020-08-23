import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// time
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker
  } from '@material-ui/pickers';

  // selectBox
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { requestMaxId } from '../../../requests'

function makeTime(time){
  let hour = (time.getHours() < 10 ? '0' : '') + time.getHours().toString();
  let minute = (time.getMinutes() < 10 ? '0' : '') + time.getMinutes().toString();
  return hour + ':' + minute;
}

export default function RegisteStudy(props) {

  // console.log('clickedDate : ' + props.clickedDate)
  // console.log('clickedDate : ' + props.eventId)

  // select Box
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  const classes = useStyles();
  const [content, setContent] = React.useState('Controlled');
  const [open, setOpen] = React.useState(true);
  // Time
  // The first commit of Material-UI
  const [startTime, setStartTime] = React.useState(new Date('1900-01-01T00:00:00'));
  const [endTime, setEndTime] = React.useState(new Date('1900-01-02T02:00:00'));
  const [subjectId, setSubjectId] = React.useState('');
  const [maxPeople, setMaxPeople] = React.useState(0);
  const [station, setStation] = React.useState('online');

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleStart = (date) => {
    setStartTime(date);
  };
  const handleEnd = (date) => {
    setEndTime(date);
  };
  const handleSubjectId = (event) => {
    setSubjectId(event.target.value);
  };
  const handleMaxPeople = (event) => {
    setMaxPeople(event.target.value);
  };
  const handleStation = (event) => {
    setStation(event.target.value);
  };
  const handleContent = (event) => {
    setContent(event.target.value);
  };

  const validationCheck = () => {
    let startT = startTime.getHours() + startTime.getMinutes();
    let endT = endTime.getHours() + endTime.getMinutes();
    let success = 0;

    // console.log('open : ' + open +', title : ' + title + ', maxPeople : ' + maxPeople);

    if (content === ""){
      alert('스터디 내용을 입력해 주세요.')
    } else if (endT <= startT) {
      alert('종료시간을 시작시간보다 크게 설정해주세요.')
    } else if (subjectId === ""){
      alert('Subject를 설정해 주세요.')
    } else if (maxPeople < 2){
      alert('모집 인원은 최소2명 입니다.')
    } else {
      success = 1;
    }
    return success
  }

  const submitData = () => {
    if (validationCheck()){
      let startT = makeTime(startTime);
      let endT = makeTime(endTime);
      let maxId = 0;

      requestMaxId().then(result => {

        console.log('regist... study.. result.. ' + JSON.stringify(result))

        if (!result.success){
          alert('get MaxId ... Error !!');
        } else {
          // studyId 만들고, 현재인원은 1로 들어가도록
          let data = {
            studyId: result.maxId + 1,
            content: content,
            startTime: startT,
            endTime: endT,
            maxPeople: maxPeople,
            subject: subjectId,
            studyDate: props.clickedDate,
            station : station,
            region: '경기도 용인시'   // selectRegion , props에서 받기
          }
          props.hadleStudyReg(data, handleClose);
        }
      })
    }
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{props.clickedDate}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            스터디를 등록해 주세요.
          </DialogContentText>              
          <TextField
            id="content"
            label="스터디 내용을 1000자 이내로 자유롭게 작성해주세요"
            onChange={handleContent}
            multiline
            fullWidth
          />
          <TextField
            margin="dense"
            id="station"
            label="api 연동하여 axios 호출 후, 장소 선택 가능하도록"
            type="text"
            onChange={handleStation}
            fullWidth
          />

    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardTimePicker
          margin="normal"
          id="startTime"
          label="Start"
          value={startTime}
          onChange={handleStart}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
        <KeyboardTimePicker
          margin="normal"
          id="endTime"
          label="End"
          value={endTime}
          onChange={handleEnd}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>

      <FormControl className={classes.formControl}>
        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
          Subject
        </InputLabel>
        <Select
          labelId="demo-simple-select-placeholder-label-label"
          id="subject"
          value={subjectId}
          onChange={handleSubjectId}
          displayEmpty
          className={classes.selectEmpty}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={0}><em>Project</em></MenuItem>
          <MenuItem value={1}>모각코</MenuItem>
          <MenuItem value={2}>책 완독</MenuItem>
          <MenuItem value={3}>강의</MenuItem>
          <MenuItem value={4}>기타</MenuItem>
        </Select>
        <br />
        <TextField
          id="maxPeople"
          label="모집 인원"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleMaxPeople}
        />
      </FormControl>              
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={submitData} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}