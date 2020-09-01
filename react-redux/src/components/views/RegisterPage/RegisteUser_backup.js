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

import { requestUserReg } from '../../../requests'


export default function RegisteUser(props) {

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
  const [open, setOpen] = React.useState(true);
  // Time
  // The first commit of Material-UI
  const [email, setEmail] = React.useState('');
  const [nickName, setNickName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [profile, setProfile] = React.useState('');
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    props.setRegistForm('')
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleNickName = (event) => {
    setNickName(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };
  const handleProfile = (event) => {
    setProfile(event.target.value);
  };

  const validationCheck = () => {
    let success = 0;

    if (email === ""){
      alert('email을 입력해 주세요.')
    } else if (nickName === ""){
      alert('별명을 입력해 주세요.')
    } else if (password === "" || password !== confirmPassword){
      alert('비밀번호가 다릅니다.')
    } else {
      success = 1;
    }
    return success;
  }

  const submitData = () => {
    console.log('1')

    if (validationCheck()){
      console.log('2')
          // let userData = {
          //   email: email,
          //   nickName: nickName,
          //   password: password,
          //   profile: profile
          // }

          const formData = new FormData();

          formData.append('email', email)
          formData.append('nickName', nickName)
          formData.append('password', password)
          formData.append('profile', profile.files[0])

          requestUserReg(formData, handleClose);
    }
  }

  return (
    <div>
      <form encType='multipart/form-data'> 
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{props.clickedDate}</DialogTitle>
        <DialogContent style={{ 'width':'400px', 'textAlign': 'center'}}>
          <DialogContentText >
            회원 가입
          </DialogContentText>              
          <TextField
            style={{ 'width': '300px'}}
            id="email"
            name="email"
            label="Email"
            onChange={handleEmail}
            type="email"
            value={email}
          />
          <Button onClick={handleClose} color="primary" style={{ 'marginTop': '12px'}}>
            중복체크
          </Button>
          <br />
          <TextField
            // error
            // helperText="Incorrect entry."
            id="nickName"
            name="nickName"
            label="별명"
            onChange={handleNickName}
            type="text"
            value={nickName}            
            fullWidth
          /><br />
          <TextField
            id="password"
            name='password'
            label="Password"
            onChange={handlePassword}
            type="password"
            value={password}
            fullWidth
          /><br />
          <TextField
            id="passwordCheck"
            label="Confirm Password"
            onChange={handleConfirmPassword}
            type="password"
            value={confirmPassword}
            fullWidth
          /><br />
          <TextField
            id="profile_img"
            name='profile_img'
            onChange={handleProfile}
            type="file"
            helperText="profile upload"
            value={profile}
            fullWidth
          /><br />
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
      </form>
    </div>
  );
}