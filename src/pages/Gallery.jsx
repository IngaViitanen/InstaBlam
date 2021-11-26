import React, { useContext } from 'react'
import { Context } from '../context/Context'
import PublishPhoto from '../components/gallery/PublishPhoto'
// import exphoto from '../context/snoopy.jpeg'

function Gallery() {

    const [context] = useContext(Context)
    const allPhotos = context.savedPhotos
    const newPhotos = context.takenPhoto
    console.log(newPhotos)
    
    console.log(context.savedPhotos)


    // let base64Image = atob(Blob.text());
    // const newData = localStorage.getItem('newData');
    const newData = localStorage.getItem('data');
    

    return (
        <div>
            <h1>Gallery</h1>
            {allPhotos.map((img) => (
                <img src={( `${img.src}` )} alt={img.alt} key={img.id} height="100px" />
            ))}
           <img src={`data:image/png;base64${newData}`} alt="taken by user" height="100px"/>
           {/* <PublishPhoto /> */}
        </div>
    )
}

export default Gallery
