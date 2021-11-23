import React from 'react'
import { Link } from 'react-router-dom'
import galleryLogo from './photo-album.png'
import homeLogo from './home.png'

function footer() {
    return (
        
            <footer className="footer">
                <div className="linkWrapper">
                <Link to="/"><img src={homeLogo} alt="" height="40px" /></Link>
                </div>
                <div className="linkWrapper">
                <Link to="/gallery"><img src={galleryLogo} alt="" height="40px" /></Link>
                </div>
            </footer>
        
    )
}

export default footer
