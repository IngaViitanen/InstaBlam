import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/Context'
// import PublishPhoto from '../components/gallery/PublishPhoto'

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
            <h1>Gallery</h1>
            <div className='gallery'>
            {allPhotos.map((img, index) => {
            return  <div className='card'>
                    <div className='card-grid'>
                    <div className='card-flex'>
                    <button onClick={() => deletePhoto(index)} className='deleteButton'>X</button>
                    <img 
                        className='imageStyle' 
                        src={( `${img.src}` )} 
                        alt={( `${img.alt}` )} 
                        key={img.id} 
                        height="120px" 
                    />
                    <div className='p-card-flex'>
                    <p className='imgP'>Date: {img.date}</p>
                    <p className='imgP'>Location: {(`${img.location.getLocation}`)}</p>
                    </div>
                    <a href={img.src} download ><button className='downloadButton'>DOWNLOAD</button></a>
                    </div>
                    </div>
                    </div>
            })}
            </div> 
            {/* <PublishPhoto /> */}
        </div>
    )
}

export default Gallery
