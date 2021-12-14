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

    // useEffect(() => {
    //     updateContext({
    //         savedPhotos: takenPhotoArr,
    //         takenPhoto: null
    //     })
    // }, [context.savedPhotos])
    
    
    const onPublish = () => {
        
        console.log(takenPhoto)
        
        // if(takenPhoto){
            
            const takenPhotoArr = [...context.savedPhotos, takenPhoto]
            console.log(takenPhotoArr)
            console.log('context.savedPhotos: ', ...context.savedPhotos)
    
        // if(context.takenPhoto){
            updateContext({
            savedPhotos: takenPhotoArr,
            takenPhoto: null
            })
        // }
                
        navigate('/gallery')
			
	}
        
        
         
        return (
            <div >
                <button onClick={onPublish}>Save to gallery</button>
            </div>
        )
    
}

export default PublishPhoto
