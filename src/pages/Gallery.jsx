import React, { useContext } from 'react'
import { Context } from '../context/Context'
// import exphoto from '../context/snoopy.jpeg'

function Gallery() {

    const [context] = useContext(Context)
    const allPhotos = context.savedPhotos
    console.log(context.savedPhotos)

    // let base64Image = atob(Blob.text());
    // localStorage.getItem('newData');

    return (
        <div>
            <h1>Gallery</h1>
            {allPhotos.map((img) => (
                <img src={( `${img.src}` )} alt={img.alt} key={img.id} height="100px" />
            ))}
           {/* <img src={`data:image/png;base64`} alt="something" height="100px"/> */}
            {/* <img src={exphoto} alt="" /> */}
        </div>
    )
}

export default Gallery
