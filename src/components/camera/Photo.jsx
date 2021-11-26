import React, {useContext} from 'react'
import { Context } from '../../context/Context'

function Photo() {

    const [context] = useContext(Context)
    const photo = context.takenPhoto

    return (
        <div>
            <img src={photo} alt="your new pic"></img>
        </div>
    )
}

export default Photo
