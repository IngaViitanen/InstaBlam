import React, {useState, useEffect, useContext} from 'react'
import { Context } from '../../context/Context'

function Location() {
	
    const [getLocation, setGetLocation] = useState('unknown')
    const [context, updateContext] = useContext(Context)
    let saveLocation = context.location
    console.log(saveLocation)
    // const [canUse, setCanUse] = useState(false)
    // const [pos, setPos] = useState(null)

   

	useEffect(() => {
        if ("geolocation" in navigator) {
            console.log("location available")
    
            navigator.geolocation.getCurrentPosition( pos => { 
                    // setPos(pos.coords);
                    // setCanUse(true) 
                    onSuccess(pos, setGetLocation, getLocation)
                    updateContext({
                    location: setGetLocation(`${getLocation}`)
                    })
                
                }, error => {
                    console.log(error.message)
                    localStorage.setItem('location', JSON.stringify({getLocation: 'unknown'}))
                })
        } else {
            console.log("No location available");
        }
    }, [])

	// useEffect(() => {
    //     if(getLocation !== null){
    //         setGetLocation(`${getLocation}`)
    //     }
    // }, [onSuccess])

	return (
		<div>
			
		</div>
	)
}

async function onSuccess(pos, setGetLocation, getLocation) {
	const location = await getPosition(pos.coords.latitude, pos.coords.longitude)
	
		if( location ) {
			// console.log('LOCATION: ', location)
            console.log(`city: ${location.city} country: ${location.country}`)
			// setGetLocation(location.city, location.country)
            setGetLocation(`${location.city}, ${location.country}`)
			localStorage.setItem('location', JSON.stringify({getLocation: getLocation}))
            console.log({getLocation: getLocation})
            console.log('getLocation', getLocation)
            
		} else {
            console.log('adress missing')
			setGetLocation('location missing')
		}
    }

async function getPosition(lat, lon) {
	try{
		const response = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=fc8da077c40644d5be62e50ef583818d`)
		const data = await response.json()

		console.log('data', data)

		if( data.error ){
			console.log('There was an error: ', data.error.message)
			return null
		} else {
			const locationData = data.features[0].properties
			return locationData
		}
	} catch(error){
		console.log('Sorry we could not get your position: ', error.message)
		return null
	}
}


export default Location
