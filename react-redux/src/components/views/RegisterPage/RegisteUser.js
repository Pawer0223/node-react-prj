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

  const errorStyle = {'textAlign': 'left', 'color': 'red', 'marginTop': '0px', 'height' : '15px', 'display': 'none'}
  

  const pwCheck = (pw, inputValue) => {
    let error = document.getElementById('pwError');
    if ((pw != '' || inputValue != '')){
      if (pw !== inputValue){
        error.style.display = 'block';
        setPwIsSame(true);
      }
      if (pw === inputValue){
        error.style.display = 'none';
        setPwIsSame(false);
      }
    }
    if (pw === '' || inputValue === ''){
      error.style.display = 'none';
      setPwIsSame(false);
    }
  }

  const emailCheck = (email) => {
    console.log('email : ' + email )
    let error = document.getElementById('emailError');
    if (email === '') {
      setEmailIsTrue(false);
      error.style.display = 'none';
    } else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      error.style.display = 'none';
      setEmailIsTrue(false);
    } else {
      error.style.display = 'block';
      setEmailIsTrue(true);
    }
  }

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  // Time
  // The first commit of Material-UI
  const [email, setEmail] = React.useState('');
  const [nickName, setNickName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [profile, setProfile] = React.useState('');
  const [pwIsSame, setPwIsSame] = React.useState(false);
  const [emailIsTrue, setEmailIsTrue] = React.useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    props.setRegistForm('')
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
    emailCheck(event.target.value);
  };
  const handleNickName = (event) => {
    setNickName(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
    pwCheck(confirmPassword, event.target.value)
  };
  const handleConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
    pwCheck(password, event.target.value)
  };
  const handleProfile = (event) => {
    let files = event.target.files;
    setProfile(files[0]);
  };

  const validationCheck = () => {
    let success = 0;

    if (email === ""){
      alert('email을 입력해 주세요.')
    } else if (nickName === ""){
      alert('별명을 입력해 주세요.')
    } else if (password === ""){
      alert('비밀번호를 입력해 주세요.')
    } else {
      success = 1;
    }
    return success;
  }

  const submitData = () => {
    if (validationCheck()){
          const formData = new FormData();

          formData.append('email', email)
          formData.append('nickName', nickName)
          formData.append('password', password)
          formData.append('profile', profile)

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
            error={emailIsTrue}
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
          <p id='emailError' style={errorStyle}>email형식이 올바르지 않습니다.</p>
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
            error={pwIsSame}
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
            error={pwIsSame}
            onChange={handleConfirmPassword}
            type="password"
            value={confirmPassword}
            fullWidth
          /><br />
          <p id='pwError' style={errorStyle}>비밀번호가 일치하지 않습니다.</p>
          <TextField
            id="profile_img"
            name='profile_img'
            onChange={handleProfile}
            type="file"
            helperText="프로필 사진을 등록해 주세요."
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