import React, { createContext, useState, useEffect } from 'react'
import photoExample from './snoopy.jpeg'
import photoExample2 from './charlieBrown.jpg'

export const Context = createContext()

export const ContextProvider = ({children}) => {
    const [context, setContext] = useState({stream: null, takenPhoto: null, savedPhotos: [
        {
            id: 1,
            src: photoExample,
            alt: 'home logo',
            date: new Date().toLocaleDateString(),
            description: 'example  desc'
        }, 
        {
            id: 2,
            src: photoExample2,
            alt: 'logo',
            date: new Date().toLocaleDateString(),
            description: 'example  desc 2'
        }
    ] 
})

    useEffect(() => {
        const localData = JSON.parse(localStorage.getItem('data'))
        if (localData){
            setContext({
                ...context,
                ...localData
            })
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('data', JSON.stringify(context))
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
