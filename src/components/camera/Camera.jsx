import { useState, useEffect, useRef, useContext } from 'react'
import '../../App.css'
import { Context } from '../../context/Context'
import PublishPhoto from '../gallery/PublishPhoto'
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

	
	
	const handleCameraToggle = () => {
		if( cameraIsOn ) {
			cameraOff(videoRef.current, () => setCameraIsOn(false))
		} else {
			cameraOn(videoRef.current, setStatusMessage, () => setCameraIsOn(true))
		}
	}

	useEffect(() => {
		let getLocation = localStorage.getItem('location')
		let locationData = JSON.parse(getLocation)
		setSaveLocation(locationData)
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
	}, [])


    async function takePhoto() {
        const width = 414
        const height = width / (16/9)

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
			<div>
				<button className="onOffButton" onClick={handleCameraToggle}>
				{cameraIsOn ? 'Turn camera off' : 'Turn camera on'}
				</button>
                <button className="cameraButton" onClick={takePhoto}></button>
			</div>
            <div className={'result ' + (hasPhoto ? 'hasPhoto' : '')}>
				
                <canvas ref={photoRef}></canvas>
				
                <button className="cameraButton" onClick={closePhoto}>GO BACK</button>
				<Location />
				<PublishPhoto takenPhotoSrc={takenPhoto}/>
            </div>
			<p> {statusMessage} </p>
		</div>
	)
}



async function cameraOff(videoElement, whenDone) {
	videoElement.srcObject = null
	whenDone()
}
async function cameraOn(videoElement, showMessage, whenDone) {
	const constraints = {
		video: { facingMode: 'user', width: 1980, height: 1080 }
	}
	try {
		const stream = await navigator.mediaDevices.getUserMedia(constraints)
		videoElement.srcObject = stream
		videoElement.addEventListener('loadedmetadata', () => {
			videoElement.play()
			whenDone()
		})
	} catch(error) {
		console.log('Could not use camera: ', error.message);
		showMessage('Sorry, could not use your camera. Did you give me permission? If you did, check that you are not using your camera on another app or page')
	}
}


export default Camera