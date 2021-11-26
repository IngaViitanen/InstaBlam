import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Context } from '../../context/Context'
import { nanoid } from 'nanoid'

function PublishPhoto() {

    const [context, updateContext] = useContext(Context)
    const navigate = useNavigate()

    const onPublish = () => {
        // e.preventDefault()

        const takenPhoto = {
            id: nanoid(),
            src: context.takenPhoto,
            date: new Date().toLocaleDateString(),
            alt: 'new user photo'
        }
        console.log(takenPhoto)

        const takenPhotoArr = [takenPhoto, ...context.savedPhotos]
        console.log(takenPhotoArr)

        if (context.takenPhoto){
            updateContext({
                savedPhotos: takenPhotoArr,
                takenPhoto: null
            })
            navigate('/')
        }
        
    }


    return (
        <div onClick={onPublish}>
            <button >Save photo to gallery</button>
        </div>
    )
}

export default PublishPhoto
