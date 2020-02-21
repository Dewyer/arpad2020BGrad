import * as faceapi from "face-api.js";
import FaceDescriptor from "../models/FaceDescriptor";
import StudentPage from "../models/StudentPage";
import FacePoolEntry from "../models/FacePoolEntry";
import { FaceMatcher } from "face-api.js";

export default abstract class AiUtil
{
	static loaded: boolean;
	static facePool:FacePoolEntry[ ] = [ ];
	static faceMatcher:FaceMatcher;

	public static async init()
	{
		if (!this.loaded)
		{
			await faceapi.nets.faceRecognitionNet.load("/aimodels");
			await faceapi.nets.ssdMobilenetv1.load("/aimodels");
			await faceapi.nets.faceLandmark68Net.load("/aimodels");
			console.log("AI util loaded models");
			await this.loadALlFaceData();
			console.log("Loading people face data");
			console.log(this.facePool.length," entries loaded");

		}
		this.loaded = true;
	}

	public static floatArrayFromObj(obj:any):Float32Array
	{
		let arr:number[ ] = [ ];
		for(let ii in obj)
		{
			arr.push(obj[ii]);
		}
		let fasz = new Float32Array(arr);
		return fasz;
	}

	public static async loadALlFaceData()
	{
		let persons:string[ ] = require("../assets/people.json");
		for (let ii = 0; ii < persons.length;ii++)
		{
			let peopleDataStr = await fetch(`/people/${persons[ii]}.json`);
			const peopleData:StudentPage = await peopleDataStr.json();
			let entry:FacePoolEntry ={
				personId:peopleData.id,
				possibilities:Array.from(peopleData.teachingDescriptor)
			};
			entry.possibilities.push(peopleData.tabloDescriptor);
			this.facePool.push(entry);
			console.log(peopleData.name);
		}
		console.log(this.facePool);
		const labeledDescriptors = this.facePool.map(xx=>{

			let fas:Float32Array[ ] = xx.possibilities.map(ll=>this.floatArrayFromObj(ll.descriptor));
			return (new faceapi.LabeledFaceDescriptors(
				xx.personId,
				fas));
		});
		this.faceMatcher = new FaceMatcher(labeledDescriptors);
	}

	public static async witchFaceFromBase64(b64:string):Promise<string>
	{
		const desc = await this.matchSingleFaceFromBase64(b64);
		if (desc)
		{
			const match = this.faceMatcher.matchDescriptor(desc.descriptor);
			return match.label;
		}
		return "";
	}

	public static async matchSingleFaceFromBase64(b64: string): Promise<FaceDescriptor | undefined>
	{
		const img = new Image();
		img.src = b64;
		let desc = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
		return desc;
	}

}
