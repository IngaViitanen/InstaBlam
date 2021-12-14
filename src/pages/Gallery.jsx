import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/Context'
import PublishPhoto from '../components/gallery/PublishPhoto'
// import { deletePhoto, downloadPhoto } from '../components/gallery/GallerySpecs'

function Gallery() {

    const [context, updateContext] = useContext(Context)
    const allPhotos = context.savedPhotos
    let [gallery, setGallery] = useState(allPhotos)
    console.log('allPhotos ', allPhotos)
    // const linkRef = useRef(null);

	// function DeletePhoto() {
	// 	deletePhoto(context, updateContext, key.id);
	// }

    useEffect( () => {
		let currentStorage = localStorage.getItem('instaBlamData')
		let data = JSON.parse(currentStorage)
		console.log('currentstorage: ', data)

		if (data !== null || undefined) {
			updateContext(data)
            setGallery(data)
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
    }

	// function download() {
	// 	downloadPhoto(src, linkRef);
	// }

    
    return (
        <div>
            <h1>Gallery</h1>
            
            {allPhotos.map((img, index) => {
            return  <div className='card'>
                    <div className='card-grid'>
                    <button onClick={() => deletePhoto(index)} method='REMOVE'>DELETE</button>
                    <img src={( `${img.src}` )} alt={( `${img.alt}` )} key={img.id} height="100px" />
                    <p>Date: {img.date}</p>
                    <p>Location: {(`${img.location.getLocation}`)}</p>
                    </div>
                    </div>
            })}
            {/* {allPhotos.map((img) => ( */}
                {/* ))} */}
           
            <PublishPhoto />
        </div>
    )
}

export default Gallery
