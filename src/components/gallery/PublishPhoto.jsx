import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Context } from '../../context/Context'
import { nanoid } from 'nanoid'

function PublishPhoto({ takenPhotoSrc }) {

    const [context, updateContext] = useContext(Context)
    // const [canUseGeo, setCanUseGeo] = useState(false)
    const navigate = useNavigate()

    
    const takenPhoto = {
        id: nanoid(),
        src: takenPhotoSrc,
        date: new Date().toLocaleDateString(),
        alt: 'new user photo',
        location: context.location
    }
    
    
    const onPublish = () => {
        // console.log(takenPhoto)
        
        const takenPhotoArray = [...context.savedPhotos, takenPhoto]
        console.log('PublishPhoto: number of photos is ', takenPhotoArray.length)

        // takePhoto(takenPhotoArray)
        // console.log('takePhoto', takePhoto)
        // console.log('context.savedPhotos: ', ...context.savedPhotos)
        // if(takenPhoto !== null){
        updateContext({
            savedPhotos: takenPhotoArray,
            takenPhoto: null
        })
            
        // navigate('/gallery')
        // }
	}
        
    
        
         
        return (
            <div >
                <button className='saveToGalleryButton' onClick={onPublish}>SAVE PHOTO</button>
            </div>
        )
    
}

export default PublishPhoto
