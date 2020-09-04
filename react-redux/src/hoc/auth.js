import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import actionCreators from '../actions';
import { connect } from 'react-redux'

export default function (SpecificComponent, option, adminRoute = null ){

    // true 로그인 x => 접근 가능
    // false 로그인 x => 접근 불가능
    function AuthenticationCheck(props) {
        
        useEffect(() => {  
            props.auth(props, option);
        }, [])
        
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