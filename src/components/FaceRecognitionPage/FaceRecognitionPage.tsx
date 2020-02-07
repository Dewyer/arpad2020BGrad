import React, { useRef, useEffect } from 'react';
import Webcam from "react-webcam";
import useWindowDimensions from '../../hooks/useWindowDimension';
import useTimer from '../../hooks/useTimer';

export interface Props
{

}

function FaceRecognitionPage(props: Props)
{
	const webcam = useRef<Webcam>(null);
	const dimensions = useWindowDimensions();
	const previewDimensions = { height: dimensions.height - 180, width: (dimensions.height - 180)/9*16};

	useTimer(()=>{
		let img = webcam.current!.getScreenshot();
		//console.log("Image :",img!.length);
		if (img)
		{
			console.log("img len: ",img.length);
		}
	});

	const videoConstraints = {
		width: 1280,
		height: 720,
		facingMode: "user"
	};

	return (
		<div>
			<h2>Rakd az arcot a kamera kép közepére!</h2>
			<Webcam
				audio={false}
				height={previewDimensions.height}
				ref={webcam as any}
				screenshotFormat="image/png"
				width={previewDimensions.width}
				videoConstraints={videoConstraints}
				mirrored={true}
			/>
		</div>
	);
}

export default FaceRecognitionPage;
