import React from 'react'
import { Link } from 'react-router-dom'
import cameraLogo from '../images/add-photo.png'

function footer() {
    return (
        
            <footer className="footer">
                <Link to="/camera" className="cameraPageTag">
                    <img src={cameraLogo} alt="to camera logo" height="50px"/>
                </Link>
            </footer>
        
    )
}

export default footer
