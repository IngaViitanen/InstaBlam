import React from 'react'
import { Link } from 'react-router-dom'
import '../App.css';
import cameraLogo from './add-photo.png'

function Home() {
    return (
        <div className="home">
            <header>
            <h1>InstaBlam</h1>
            </header>
            <main className="home-main">
            <p>Take a picture !</p>
            <Link to="/camera" className="cameraPageTag"><img src={cameraLogo} alt="" height="80px"/></Link>
            </main>
        </div>
    )
}

export default Home
