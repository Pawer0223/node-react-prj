import React,{ useEffect } from 'react'
import axios from 'axios'

//rfce하면 자동완성..
function LandingPage() {

    useEffect(() => {
        axios.get('http://localhost:5000/api/test')
        .then(response => {console.log(response.data)})
    },[])

    return (
        <div>
            Landingpage
        </div>
    )
}

export default LandingPage
