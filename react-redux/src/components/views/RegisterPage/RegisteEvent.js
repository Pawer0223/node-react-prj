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

export default function RegisteEvent() {

  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Time
  // The first commit of Material-UI
  const [startTime, setStartTime] = React.useState(new Date('1900-01-01T00:00:00'));
  const [endTime, setEndTime] = React.useState(new Date('1900-01-02T02:00:00'));

  const handleStart = (date) => {
    setStartTime(date);
  };

  const handleEnd = (date) => {
    setEndTime(date);
  };

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
  const [subjectId, setSubjectId] = React.useState('');

  const handleChange = (event) => {
    setSubjectId(event.target.value);
  };
;

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Study Regist</DialogTitle>
        <DialogContent>
          <DialogContentText>
            스터디를 등록해 주세요.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="ex) Study 모집"
            type="text"
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
          onChange={handleChange}
          displayEmpty
          className={classes.selectEmpty}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={0}><em>Project</em></MenuItem>
          <MenuItem value={1}>모각코</MenuItem>
          <MenuItem value={2}>강의</MenuItem>
        </Select>
        <br />
        <TextField
          id="maxPeople"
          label="모집 인원"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </FormControl>              
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}