import React, { useRef, useEffect } from 'react';
import Webcam from "react-webcam";
import useWindowDimensions from '../../hooks/useWindowDimension';
import useTimer from '../../hooks/useTimer';
import * as faceapi from "face-api.js";

export interface Props
{

}

async function test(img:string)
{
	await faceapi.nets.faceRecognitionNet.load("/aimodels");
	console.log("segg");
	let desc = await faceapi.detectAllFaces(img).withFaceLandmarks().withFaceDescriptors();
	console.log("fail");
	desc.forEach(xx=>{
		console.log("face :",xx);x
	})
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
			test(img);
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
