
export default interface StudentPage
{
	name:string,
}

export interface StudentPagePayload
{
	tabloPhoto:File,
	ownPhotos:File[ ],
	teacherPhotos:File[ ],
	name:string,
	description:string
}
