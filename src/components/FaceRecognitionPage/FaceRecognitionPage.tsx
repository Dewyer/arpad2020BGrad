import React, { useRef, useEffect, useState } from 'react';
import Webcam from "react-webcam";
import useWindowDimensions from '../../hooks/useWindowDimension';
import useTimer from '../../hooks/useTimer';
import * as faceapi from "face-api.js";

export interface Props
{

}

async function test(img:string)
{
	console.log("start")
	let imgCanvas = new Image();
	imgCanvas.src = img;
	let desc = await faceapi.detectSingleFace(imgCanvas).withFaceLandmarks().withFaceDescriptor();
	console.log(desc);
}

async function train()
{
	//let res = await fetch("/training/original.png");
	console.log("test 1 ");
	//let blob = await res.blob();
	let img = new Image();
	img.src = "/training/original.png";
	let desc = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
	let test1 = new Image();
	test1.src = "/training/test.jpg";
	let testDesc = await faceapi.detectSingleFace(test1).withFaceLandmarks().withFaceDescriptor();

	console.log("test face ",desc,testDesc);

	const faceMatcher = new faceapi.FaceMatcher([desc]);
	let dd = faceMatcher.matchDescriptor(testDesc!.descriptor)
	console.log("test dist ",dd.distance);
	console.log(faceMatcher.distanceThreshold);
}

function FaceRecognitionPage(props: Props)
{
	const webcam = useRef<Webcam>(null);
	const dimensions = useWindowDimensions();
	const previewDimensions = { height: dimensions.height - 180, width: (dimensions.height - 180)/9*16};
	const [loadedModels,setLoadedModels] = useState(false);

	useEffect(()=>{
		async function loadFaceModels()
		{
			await faceapi.nets.faceRecognitionNet.load("/aimodels");
			await faceapi.nets.ssdMobilenetv1.load("/aimodels");
			await faceapi.nets.faceLandmark68Net.load("/aimodels");
			//await faceapi.nets.faceLandmark68TinyNet.load("/aimodels")
			//await faceapi.nets.tinyFaceDetector.load("/aaimodels");
			setLoadedModels(true);
			console.log("loaded models")

			await train();
		}

		loadFaceModels()
	},[]);

	useTimer(async ()=>{
		let img = webcam.current!.getScreenshot();
		if (loadedModels && img)
		{
			test(img!);
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
				id={"facedec"}
			/>
		</div>
	);
}

export default FaceRecognitionPage;
