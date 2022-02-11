import React, {useState, useEffect, useContext} from 'react'
import { Context } from '../../context/Context'

function Location() {
	
    const [getLocation, setGetLocation] = useState('unknown')
    const [context, updateContext] = useContext(Context)
    let saveLocation = context.location
    console.log(saveLocation)
   

	useEffect(() => {
        if ("geolocation" in navigator) {
            console.log("location available")
    
            navigator.geolocation.getCurrentPosition( pos => { 

                    onSuccess(pos, setGetLocation, getLocation)

                    updateContext({
                    // location: setGetLocation(`${getLocation}`)
                    location: JSON.stringify(getLocation)
                    })
                
            }, error => {
                    console.log(error.message)
                    localStorage.setItem('location', JSON.stringify({getLocation: 'unknown'}))
            })
        }else {
            console.log("No location available");
        }
    }, [])


	return (
		<div>
			
		</div>
	)

}


async function lookupPosition(lat, lon) {
    try{
        const response = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=fc8da077c40644d5be62e50ef583818d`)
		const data = await response.json()
        
		console.log('data', data)
        
		if( data.error ){
            console.log('There was an error: ', data.error.message)
			return null
		}else {
            const locationData = data.features[0].properties
			return locationData
		}
	} catch(error){
        console.log('Sorry we could not get your position: ', error.message)
		return null
	}
}

async function onSuccess(pos, setGetLocation, getLocation) {
    const location = await lookupPosition(pos.coords.latitude, pos.coords.longitude)
    
        if( location ) {
            getLocation = `${location.city}, ${location.country}`
            setGetLocation(getLocation)
            localStorage.setItem('location', JSON.stringify({getLocation: getLocation}))
            console.log('getLocation', getLocation)
            // console.log(`city: ${location.city} country: ${location.country}`) 
        } else {
            console.log('adress missing')
            setGetLocation('location missing')
        }
    }


export default Location
