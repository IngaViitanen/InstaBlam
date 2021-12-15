import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Context } from '../../context/Context'
import { nanoid } from 'nanoid'

function PublishPhoto() {

    const [context, updateContext] = useContext(Context)
    // const [canUseGeo, setCanUseGeo] = useState(false)
    const navigate = useNavigate()

    
    const takenPhoto = {
        id: nanoid(),
        src: context.takenPhoto,
        date: new Date().toLocaleDateString(),
        alt: 'new user photo',
        location: context.location
    }
    
    
    const onPublish = () => {
        
        console.log(takenPhoto)
            
        const takenPhotoArr = [...context.savedPhotos, takenPhoto]
        console.log(takenPhotoArr)
        console.log('context.savedPhotos: ', ...context.savedPhotos)
    
        // if(context.takenPhoto){
            updateContext({
            savedPhotos: takenPhotoArr,
            takenPhoto: null
            })
            
            navigate('/gallery')
        // }
                
			
	}
        
        
         
        return (
            <div >
                <button className='saveToGalleryButton' onClick={onPublish}>SAVE PHOTO</button>
            </div>
        )
    
}

export default PublishPhoto
