import React, { useEffect } from 'react'
import axios from 'axios'

function LandingPage() {

    useEffect(() => {
        axios.get('http://localhost:5000/api/test')
        .then(response => console.log(response.data))
    },[])

    return (
        <div>
            LandingPage eee
        </div>
    )
}

export default LandingPage