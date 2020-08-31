import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
 // import { loginUser } from '../../../_actions/user_action'
import { withRouter } from 'react-router-dom';

// for ui
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';

import clsx from 'clsx';


import { makeStyles } from '@material-ui/core/styles';





function LoginPage(props) {   

    const useStyles = makeStyles((theme) => ({
        margin: {
          margin: theme.spacing(1),
        },
        textField: {
            width: '25ch',
          }
      }));

    const classes = useStyles();
    const [Email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState("false");
    const dispatch = useDispatch();

    const onEmailHandler = (event) => {
        setEmail(event.target.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.target.value)
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const onSubmitHandler = (event) => {
        event.preventDefault(); // default referesh prevent

        console.log('here')

        let body = {
            email: Email,
            password: password
        }

        // dispatch(loginUser(body))
        //     .then(response => {
        //         if (response.payload.loginSuccess) {
        //             props.history.push('/')
        //         } else {
        //             alert('Error')
        //         }
        //     })
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh'
        }}>
            <form style={{ display:'flex', flexDirection:"column"}}
            >
                <TextField      
                    className={classes.margin}              
                    id="input-with-icon-textfield"
                    label="Email"
                    InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                        <AccountCircle />
                        </InputAdornment>
                    ),
                    }}
                />
                <FormControl className={clsx(classes.margin, classes.textField)}>
                    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                    <Input
                        id="standard-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={onPasswordHandler}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                        }
                    />
                </FormControl>
                <br />
                <DialogActions>
            <Button variant="contained" onClick={onSubmitHandler}>
                로그인
            </Button>
            <Button variant="contained">
                회원가입
            </Button>
            </DialogActions>
            </form>
        </div>
    )
}

export default withRouter(LoginPage)