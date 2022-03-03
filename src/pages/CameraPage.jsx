import React from 'react'
import Camera from '../components/camera/Camera'
import { ContextProvider } from '../context/Context'
import { Link } from 'react-router-dom'

function CameraPage() {


    return (
        <div>
            <ContextProvider>
            <div className='backToHomePage'>
			<Link to="/">
			<button className='backBtn'>{'<-- back to home page'}</button>
			</Link>
			</div>
            {/* <h1>Camera</h1> */}
            <Camera />
            </ContextProvider>
        </div>
    )
}

export default CameraPage
