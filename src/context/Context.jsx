import React, { createContext, useState, useEffect } from 'react'
import boat from '../images/boat.jpg'
import lapland from '../images/lapland.jpg'

export const Context = createContext()

export const ContextProvider = ({children}) => {
    const [context, setContext] = useState({getLocation: 'unkown', location: 'unknown', takenPhoto: null, savedPhotos: [
        {
            id: 1,
            src: boat,
            alt: 'Photo by Laurent Gence on Unsplash',
            date: new Date().toLocaleDateString(),
            location: {getLocation: 'Stockholm, Sweden'}
        }, 
        {
            id: 2,
            src: lapland,
            alt: 'Photo by Simon Smith on Unsplash',
            date: new Date().toLocaleDateString(),
            location: {getLocation: 'Lapland, Finland'}

        }
    ] 
})

    useEffect(() => {
        const localData = JSON.parse(localStorage.getItem('instaBlamData'))
        if (localData){
            setContext({
                ...context,
                ...localData
            })
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('instaBlamData', JSON.stringify(context))
    }, [context])

    function updateContext(update){
        setContext((prevState) => {
            return {
                ...prevState,
                ...update
            }
        })
    }

    const value = [context, updateContext]

    return <Context.Provider value={value}>{children}</Context.Provider>

}
