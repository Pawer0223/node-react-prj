import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import actionCreators from '../actions';
import { connect } from 'react-redux'

export default function (SpecificComponent, option, adminRoute = null, apiNm = ''){

    // true 로그인 x => 접근 가능
    // false 로그인 x => 접근 불가능
    function AuthenticationCheck(props) {
        
      console.log("## 1 ##")
        useEffect(() => {  
            props.auth(props, option);
        }, [])
        
        if (apiNm === 'Main') {
          return (
            <SpecificComponent 
              loginUserInfo = {props.loginUserInfo} />
          )
        }

        return (
            <SpecificComponent />
        )

        
    }

    function mapStateToProps() {

        return (state) => {
          return {
            loginUserInfo: state.user
          }
        }
      }

    return connect(mapStateToProps, actionCreators)(AuthenticationCheck)
}