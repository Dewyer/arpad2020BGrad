import FaceDescriptor from "./FaceDescriptor";

export default interface StudentPageModel
{
	id:string
	name:string,
	status:string
	description:string,
	ownPhotosBase64:string[ ],
	tabloDescriptor:FaceDescriptor,
	teachingDescriptor:FaceDescriptor[ ],
	tabloBase64:string
	//teacherFaceMarks:any[ ]
}

export interface StudentPagePayload
{
	tabloPhoto:File,
	ownPhotos:File[ ],
	teacherPhotos:File[ ],
	name:string,
	description:string,
	status:string
}
