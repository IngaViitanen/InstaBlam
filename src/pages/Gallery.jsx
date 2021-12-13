import React, { useContext, useEffect } from 'react'
import { Context } from '../context/Context'
import PublishPhoto from '../components/gallery/PublishPhoto'
// import { deletePhoto, downloadPhoto } from '../components/gallery/GallerySpecs'

function Gallery() {

    const [context, updateContext] = useContext(Context)
    const allPhotos = context.savedPhotos
    console.log(context.savedPhotos)
    // const linkRef = useRef(null);

	// function DeletePhoto() {
	// 	deletePhoto(context, updateContext, key.id);
	// }

    useEffect( () => {
		let currentStorage = localStorage.getItem('instaBlamData')
		let data = JSON.parse(currentStorage)
		console.log('currentstorage data', data)

		if (data !== null || undefined) {
			updateContext(data)
		} else {
			localStorage.setItem('instaBlamData', JSON.stringify(context))
		} 
	
	}, [])

    // useEffect(() => {
    //     localStorage.removeItem('instaBlamData', JSON.stringify(context))
    // }, [deleteImg])

    function deleteImg(imgIndex){
        console.log(imgIndex)
        let galleryArray = [...context.savedPhotos]
        let index = imgIndex
        console.log('index', index)
        galleryArray.splice(index, 1)
        console.log('gallery array', galleryArray)
        // localStorage.removeItem('instaBlamData', JSON.stringify(context, index))
        updateContext(context.savedPhotos)
    }

	// function download() {
	// 	downloadPhoto(src, linkRef);
	// }

    
    return (
        <div>
            <h1>Gallery</h1>
            
            {allPhotos.map((img, index) => {
            return  <div>
                    <button onClick={() => deleteImg(index)}>DELETE</button>
                    <img src={( `${img.src}` )} alt={img.alt} key={img.id} height="100px" />
                    <p>Date: {img.date}</p>
                    <p>Location: {img.location}</p>
                    </div>
            })}
            {/* {allPhotos.map((img) => ( */}
                {/* ))} */}
           
            <PublishPhoto />
        </div>
    )
}

export default Gallery
