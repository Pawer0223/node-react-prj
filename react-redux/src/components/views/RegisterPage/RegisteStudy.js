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

function getTimeAmonut(time){
  let result = time.getMonth() + time.getDate() + time.getMinutes() + time.getMinutes();
  console.log('calc Result : ' + result)
  return result;
} 

export default function RegisteStudy(props) {

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
  const [content, setContent] = React.useState('');
  const [open, setOpen] = React.useState(true);
  // Time
  // The first commit of Material-UI
  const [startTime, setStartTime] = React.useState(new Date());
  const [endTime, setEndTime] = React.useState(new Date());
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
    let startT = getTimeAmonut(startTime);
    let endT = getTimeAmonut(endTime);
    let nowT = getTimeAmonut(new Date());
    let success = 0;

    console.log('startT : ' , startT , 'endT : ', endT)

    if (content === ""){
      alert('스터디 내용을 입력해 주세요.')
    } else if (endT <= startT){
      alert('종료시간을 시작시간보다 크게 설정해주세요.')
    } else if (startT < nowT) {
      alert('현재시간 이후부터 등록할 수 있습니다.')
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
            region: props.region   // selectRegion , props에서 받기
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
            {props.region}(의) 스터디를 등록해 주세요.
          </DialogContentText>              
          <TextField
            id="content"
            label="스터디 내용을 1000자 이내로 자유롭게 작성해주세요"
            onChange={handleContent}
            multiline
            fullWidth
          />
          <TextField
            id="station"
            label="스터디 장소를 적어주세요 (미 입력시 온라인 스터디로 지정)"
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
          <MenuItem value={4}>Algorithm</MenuItem>
          <MenuItem value={5}>기타</MenuItem>
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
            취소
          </Button>
          <Button onClick={submitData} color="primary">
            등록
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}