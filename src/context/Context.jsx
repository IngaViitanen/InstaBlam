import React, { createContext, useState, useEffect } from 'react'
import photoExample from './snoopy.jpeg'
import photoExample2 from './charlieBrown.jpg'

export const Context = createContext()

export const ContextProvider = ({children}) => {
    const [context, setContext] = useState({ location: null, takenPhoto: null, savedPhotos: [
        {
            id: 1,
            src: photoExample,
            alt: 'home logo',
            date: new Date().toLocaleDateString(),
            desc: 'Snoopy',
            location: 'unknown'
        }, 
        {
            id: 2,
            src: photoExample2,
            alt: 'logo',
            date: new Date().toLocaleDateString(),
            desc: 'Charlie Brown',
            location: 'unknown'

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