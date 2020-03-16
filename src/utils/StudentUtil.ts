import StudentPage, { StudentPagePayload } from "../models/StudentPage";
import AiUtil from "./AiUtil";
import FaceDescriptor from "../models/FaceDescriptor";
import uuid from "uuid";
import StudentPageModel from "../models/StudentPage";

export default abstract class StudentUitl
{
	public static async init()
	{

	}

	public static async fetchStudentData(uid:string) : Promise<StudentPageModel | null>
	{
		try
		{
			let peopleDataStr = await fetch(`/people/${uid}.json`);
			let pplData = await peopleDataStr.json() as StudentPageModel;
			return pplData;
		}
		catch
		{
			return null;
		}
	}

	public static async loadFileToBase64(ff:File) : Promise<string>
	{
		let pp = new Promise<string>((res,rej)=>
		{
			var fr = new FileReader();
			fr.addEventListener("load",(e)=>
			{
				if (e.target){
					res(e.target!.result as string);
				}
				else
				{
					rej("Err no target");
				}
			});
			fr.readAsDataURL(ff);
		});
		let res = await pp;
		return res;
	}

	public static async makeStudentPageObject(payload: StudentPagePayload) : Promise<StudentPage | undefined>
	{
		let tabloBase = await this.loadFileToBase64(payload.tabloPhoto);
		let tabloDesc = await AiUtil.matchSingleFaceFromBase64(tabloBase);
		console.log(tabloBase);
		if (!tabloDesc)
		{
			return undefined;
		}
		let teaching:FaceDescriptor[ ] =[ ];
		for (let ii = 0;ii< payload.teacherPhotos.length;ii++)
		{
			let teacherPhoto = payload.teacherPhotos[ii];
			let baseTeacher = await this.loadFileToBase64(teacherPhoto);
			let descriptor = await AiUtil.matchSingleFaceFromBase64(baseTeacher);
			if (descriptor)
			{
				teaching.push(descriptor);
			}
		}

		return {
			name:payload.name,
			description:payload.description,
			ownPhotosBase64:[ ],
			tabloDescriptor:tabloDesc!,
			tabloBase64:tabloBase,
			teachingDescriptor:teaching,
			id:uuid.v4(),
			status:payload.status
		};
	}
}
