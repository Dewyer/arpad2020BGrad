import * as faceapi from "face-api.js";

type FaceDescriptor = faceapi.WithFaceDescriptor<faceapi.WithFaceLandmarks<{
	detection: faceapi.FaceDetection;
}, faceapi.FaceLandmarks68>>;

export default FaceDescriptor
