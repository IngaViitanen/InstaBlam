import { useState, useEffect, useRef } from 'react'
import '../../App.css'

const Camera = () => {
	const [canUseMd, setCanUseMd] = useState(false)
	const [statusMessage, setStatusMessage] = useState('')
	const [cameraIsOn, setCameraIsOn] = useState(false)
    const photoRef = useRef(null)
	const videoRef = useRef(null)
    const [hasPhoto, setHasPhoto] = useState(false)
	const handleCameraToggle = () => {
		if( cameraIsOn ) {
			cameraOff(videoRef.current, () => setCameraIsOn(false))
		} else {
			cameraOn(videoRef.current, setStatusMessage, () => setCameraIsOn(true))
		}
	}

    const takePhoto = () => {
        const width = 414
        const height = width / (16/9)

        let video = videoRef.current
        let photo = photoRef.current

        photo.width = width
        photo.height = height

        let context = photo.getContext('2d')
        context.drawImage(video, 0, 0, width, height)
        setHasPhoto(true)
    }

    const closePhoto = () => {
        let photo = photoRef.current
        let context = photo.getContext('2d')
        context.clearRect(0,0, photo.width, photo.height)
        setHasPhoto(false)
    }

	useEffect(() => {
		// Körs en gång, när komponenten blir mounted
		setCanUseMd( 'mediaDevices' in navigator )
	}, [])

	return (
		<div className="videoContainer">
		{canUseMd ? <video ref={videoRef}></video> : null}
			<div>
				<button onClick={handleCameraToggle}>
				{cameraIsOn ? 'Turn camera off' : 'Turn camera on'}
				</button>
                <button className="cameraButton" onClick={takePhoto}>Take picture</button>
			</div>
            <div className={'result ' + (hasPhoto ? 'hasPhoto' : '')}>
                <canvas ref={photoRef}></canvas>
                <button className="cameraButton" onClick={closePhoto}>CLOSE</button>
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
		showMessage('Sorry, could not use your camera. Did you give me permission? Check that that you are not already using your camera in another app.')
	}
}


export default Camera