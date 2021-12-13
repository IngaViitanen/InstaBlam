import React from 'react'
import Camera from '../components/camera/Camera'
import Location from '../components/location/Location'
import { ContextProvider } from '../context/Context'

function CameraPage() {


    return (
        <div>
            <ContextProvider>
            <h1>Camera</h1>
            <Camera />
            
            </ContextProvider>
        </div>
    )
}

export default CameraPage
