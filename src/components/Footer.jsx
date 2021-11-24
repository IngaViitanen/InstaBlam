import React from 'react'
import { Link } from 'react-router-dom'
import galleryLogo from './photo-album.png'
import homeLogo from './home.png'

function footer() {
    return (
        
            <footer className="footer">
                <div className="linkWrapper">
                <Link to="/">
                <div>
                    <img src={homeLogo} alt="" height="40px" />
                </div>
                </Link>
                </div>

                <div className="linkWrapper">
                <Link to="/gallery">
                <div>
                    <img src={galleryLogo} alt="" height="40px" />
                </div>
                </Link>
                </div>
            </footer>
        
    )
}

export default footer
