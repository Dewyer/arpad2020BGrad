import StudentPage, { StudentPagePayload } from "../models/StudentPage";

export default abstract class StudentUitl
{
	public static async init()
	{

	}

	public static async makeStudentPageObject(payload: StudentPagePayload) : Promise<StudentPage>
	{
		return {};
	}
}
