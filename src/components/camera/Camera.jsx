import { useState, useEffect, useRef, useContext } from 'react'
import '../../App.css'
import { Context } from '../../context/Context'
import PublishPhoto from '../savephoto/PublishPhoto'
import Location from '../location/Location'

const Camera = () => {
    const [context, updateContext] = useContext(Context)
	const [canUseMd, setCanUseMd] = useState(false)
	const [statusMessage, setStatusMessage] = useState('')
	const [cameraIsOn, setCameraIsOn] = useState(false)
	// const [counter, setCounter] = useState(3)
    const photoRef = useRef(null)
	const videoRef = useRef(null)
    const [hasPhoto, setHasPhoto] = useState(false)
	const [saveLocation, setSaveLocation] = useState('')
	const [takenPhoto, setTakenPhoto] = useState(null)
	let getLocation = localStorage.getItem('location')

	
	
	const handleCameraToggle = () => {
		if( cameraIsOn ) {
			cameraOff(videoRef.current, () => setCameraIsOn(false))
		} else {
			cameraOn(videoRef.current, setStatusMessage, () => setCameraIsOn(true))
		}
	}

	useEffect(() => {
		// let getLocation = localStorage.getItem('location')
		let locationData = JSON.parse(getLocation)
		if(locationData !== null || undefined){
			setSaveLocation(locationData)
		} else{
			setSaveLocation('no location was found')
		}
		console.log('locationData', locationData)

		let getInstablamData = localStorage.getItem('instaBlamData')
		let galleryData = JSON.parse(getInstablamData)
		if(galleryData){
			updateContext({location: galleryData})
		}else{
			console.log('galleryData missing')
		}

		if('mediaDevices' in navigator){
			setCanUseMd( 'mediaDevices' in navigator )
		}
	}, [getLocation])


    async function takePhoto() {
        const width = 640 //414
        const height = 640 //width / (16/9)

        let video = videoRef.current
        let photo = photoRef.current

        photo.width = width
        photo.height = height

		// setTimeout(() => {
			try{
				let contextPhoto = photo.getContext('2d')
				contextPhoto.drawImage(video, 0, 0, width, height)
				
				let newPhoto = photo.toDataURL({type: 'image/png;base64'})
				
				updateContext({
					takenPhoto: newPhoto,
					location: saveLocation
				})
				console.log('context is being updated')
				console.log(saveLocation)
				
				//to be able to send taken photo with props to PublishPhoto.jsx
				setTakenPhoto(newPhoto)
				setHasPhoto(true)
	
				return newPhoto
	
			}catch(err){
				console.log('something went wrong, ' + err.message)
				return null
			}
		// }, 1000);
    }

    
    const closePhoto = () => {
        let photo = photoRef.current
        let contextPhoto = photo.getContext('2d')
        contextPhoto.clearRect(0,0, photo.width, photo.height)
        setHasPhoto(false)
    }



	return (
		<div className="videoContainer">
		
		{canUseMd ? <video ref={videoRef}></video> : null}
			<div className='buttons-grid'>
				<button className="onOffButton" onClick={handleCameraToggle}>
				{cameraIsOn ? 'OFF' : 'turn camera on'}
				</button>

				{
				cameraIsOn ?  
				<button 
				className="takePhotoButton" 
				onClick={takePhoto}>
				</button> 
				: null 
				} 

			</div>
            <div className={'result ' + (hasPhoto ? 'hasPhoto' : '')}>
                <canvas ref={photoRef}></canvas>
				<div className='closeSaveButtons'>
                <button className="closePhotoButton" onClick={closePhoto}>TAKE NEW PHOTO</button>
				<Location />
				<PublishPhoto takenPhotoSrc={takenPhoto}/>
				</div>
            </div>
			<p> {statusMessage} </p>
		</div>
	)
}



async function cameraOff(videoElement, whenDone) {
	videoElement.srcObject = null
	// console.log(videoElement.srcObject)
	whenDone()
}
async function cameraOn(videoElement, showMessage, whenDone) {
	const constraints = {
		video: { facingMode: 'user', width: 640, height: 640 }
		//1920, 1080
	}
	try {
		const stream = await navigator.mediaDevices.getUserMedia(constraints)
		videoElement.srcObject = stream
		videoElement.addEventListener('loadedmetadata', () => {
			videoElement.play()
			whenDone()
			console.log(stream)
		})
	} catch(error) {
		console.log('Could not use camera: ', error.message);
		showMessage('Sorry, could not use your camera. Did you give me permission? If you did, check that you are not using your camera on another app or page')
	}
}


export default Camera