import React, { useRef, useEffect, useState } from 'react';
import Webcam from "react-webcam";
import useWindowDimensions from '../../hooks/useWindowDimension';
import useTimer from '../../hooks/useTimer';
import * as faceapi from "face-api.js";
import AiUtil from '../../utils/AiUtil';

export interface Props
{

}

function FaceRecognitionPage(props: Props)
{
	const webcam = useRef<Webcam>(null);
	const dimensions = useWindowDimensions();
	const previewDimensions = { height: dimensions.height - 180, width: (dimensions.height - 180)/9*16};

	useTimer(async ()=>{
		let img = webcam.current!.getScreenshot();
		if  (img)
		{
			const face = await AiUtil.witchFaceFromBase64(img);
			if (face !== "")
			{
			}
			console.log("face: "+face)
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
