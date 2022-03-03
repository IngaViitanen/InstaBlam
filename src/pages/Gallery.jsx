import React, { useContext, useEffect } from 'react'
import { Context } from '../context/Context'
import Footer from '../components/Footer'
import download from '../images/download.png'
import garbage from '../images/garbage.png'

function Gallery() {
    // const [location, setLocation] = useState(img.location.getLocation)
    const [context, updateContext] = useContext(Context)
    const allPhotos = context.savedPhotos
    console.log('Gallery number of photos: ', allPhotos.length)

    useEffect(() => {
		let gallery = localStorage.getItem('instaBlamData')
		let data = JSON.parse(gallery)
		console.log('gallery: ', data)

		if (data !== null || undefined) {
			updateContext(data)
		} else {
			localStorage.setItem('instaBlamData', JSON.stringify(context))
		} 
	}, [])

    function deletePhoto(imgID){
        console.log(imgID)
        let index = imgID
        allPhotos.splice(index, 1)
        updateContext({
            savedPhotos: allPhotos
        })
        // window.alert('Are you sure you want to delete this photo?')
    }

    
    return (
        <div >
            <h1>instaBlam</h1>
            <div className='gallery'>
            {allPhotos.map((image, index) => {
            return  <div key={image.id} className='card'>
                    <div className='card-grid'>
                    <div className='card-flex'>
                    <div className='delNdownBTN'>
                        <a className='a-tag-wrap' href={image.src} download >
                            <img 
                            src={download} 
                            alt="icons created by Debi Alpa Nugraha - Flaticon" 
                            className='downloadButton' 
                            height="25px"/></a>
                        <img 
                        onClick={() => deletePhoto(index)} 
                        className='deleteButton'
                        src={garbage}
                        height="20px"
                        alt='garbage can'
                        />
                    </div>
                    <img 
                        className='imageStyle' 
                        src={( `${image.src}` )} 
                        alt={( `${image.alt}` )} 
                        key={image.id} 
                        height="200px" 
                    />
                    <div className='p-card-flex'>
                    <p className='imgP'>Date: {image.date}</p>
                    <p className='imgP'>Location: {(`${image.location.getLocation}`)}</p>
                    </div>
                    </div>
                    </div>
                    </div>
            })}
            </div> 
            <Footer />
        </div>
    )
}

export default Gallery
