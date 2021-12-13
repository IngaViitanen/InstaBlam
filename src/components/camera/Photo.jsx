import React from 'react'
import { useNavigate } from 'react-router'
import { Context } from '../../context/Context'

function Photo() {
    const navigate = useNavigate()
    // const [context] = useContext(Context)
    // const newPhoto = context.takenPhoto
    // console.log(newPhoto)

    const next = () => {
        navigate('/SaveForm')
    }


    return (
        <div>
           <button onClick={next}>SAVE</button>
        </div>
    )
}

export default Photo
