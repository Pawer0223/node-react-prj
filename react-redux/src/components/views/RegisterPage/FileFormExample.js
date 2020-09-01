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


  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('email',event.target.email.value);
    formData.append('pwd', event.target.pwd.value);
    formData.append('profile_img', event.target.profile_img.files[0]);
    formData.append('name', event.target.name.value);
    formData.append('nickname', event.target.nickname.value);
    formData.append('phone', event.target.phone.value);

    requestUserReg(formData)
  }

  return (
    <div>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <form name='accountFrm' onSubmit={handleSubmit} encType='multipart/form-data'>
            <p>
              email : 
              <input type='text' name='email'></input>
            </p>
            <p>
              pw : 
              <input type='password' name='pwd'></input>
            </p>
            <p>
              pwConfirm : 
              <input type='password' name='pwdcheck'></input>
            </p>
            <p>
              nickname : 
              <input type='text' name='nickname'></input>
            </p>
            <p>
              fileUpload : 
              <input type='file' accept='image/jpg,impge/png,image/jpeg,image/gif' name='profile_img'></input>
            </p>
            <p><input type='submit' value='회원가입'></input></p>
        </form>
    </Dialog>
    </div>
  );
}