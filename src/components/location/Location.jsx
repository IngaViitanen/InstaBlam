import React, {useState, useEffect, useContext} from 'react'
import { Context } from '../../context/Context'

function Location() {
	
    const [getLocation, setGetLocation] = useState('location unknown')
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
                    console.log('position', pos)
                    onSuccess(pos, setGetLocation, getLocation)
                    updateContext({
                    location: setGetLocation(getLocation.city)
                    })
                    // console.log('update', )
                
                }, error => {
                    console.log(error.message)
                    localStorage.setItem('location', JSON.stringify({getLocation: 'unknown'}))
                })
                // console.log("Latitude is :", pos.coords.latitude);
                // console.log("Longitude is :", pos.coords.longitude);
        } else {
            console.log("No location available");
        }
    }, [])

	// useEffect(() => {
    //     updateContext({
    //         location: setGetLocation(newLocation.city)
    //     })
	// }, [onSuccess])

    // updateContext({
    //     location: setGetLocation(newLocation.country, newLocation.city)
    // })

	

	return (
		<div>
			
		</div>
	)
}

async function onSuccess(pos, setGetLocation, getLocation) {
	const location = await getPosition(pos.coords.latitude, pos.coords.longitude)
	
		if( location ) {
			console.log('LOCATION: ', location)
            console.log('city', location.city, 'country', location.country)
			setGetLocation(location.city)
            // setGetLocation({
                // country: location.country,
                // city: location.city
            // })
			localStorage.setItem('location', JSON.stringify({getLocation: getLocation}))
            console.log(getLocation)
            
		} else {
            console.log('adress missing')
			setGetLocation('location missing')
		}
    }

async function getPosition(lat, lon) {
	try{
		const response = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=45e7e4a19c20475eaf163157be54b5aa`)
		const data = await response.json()

		// console.log('data', data)

		if( data.error ){
			console.log('We could not get your position.', data.error.message)
			return null
		} else {
			const locationData = data.features[0].properties
			return locationData
		}
	} catch(error){
		console.log('Could not get position because; ', error.message)
		return null
	}
}


export default Location
