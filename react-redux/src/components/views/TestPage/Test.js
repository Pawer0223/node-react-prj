import React from 'react'
import { withRouter } from 'react-router-dom'


function TestPage() {

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh'
        }}>
            <h2>테스트용 페이지</h2>
        </div>
    )
}

export default withRouter(TestPage)