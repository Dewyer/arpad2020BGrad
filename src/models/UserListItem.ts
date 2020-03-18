import StudentPageModel from "./StudentPage";

export interface UserListItem
{
	name:string,
	status:string,
	id:string,
	tabloBase64:string
}

export function fromStudentPageModel(st:StudentPageModel) : UserListItem
{
	return {
		name:st.name,
		status:st.status,
		id:st.id,
		tabloBase64:st.tabloBase64
	};
}
