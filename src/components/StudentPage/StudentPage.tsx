import React, { useState, useEffect } from 'react';
import styles from "./StudentPage.module.scss"
import {RouteChildrenProps, Redirect} from "react-router-dom";
import people from "../../assets/people.json";
import StudentPageModel from "../../models/StudentPage";
import StudentUitl from '../../utils/StudentUtil';

export interface Params
{
	id:string
}

const StudentPage: React.FC<RouteChildrenProps<Params>> = (props) =>
{
	const [personData, setPersonData] = useState<StudentPageModel|null>(null);
	const uid = props.match?.params.id;
	useEffect(()=>{
		async function fetchPpl()
		{
			if (uid)
			{
				let pplDat = await  StudentUitl.fetchStudentData(uid);
				if (pplDat)
					setPersonData(pplDat);
			}
		}

		fetchPpl();
	},[uid]);

	if (!uid)
		return <Redirect to="/"/>;

	if (!people.includes(uid))
	{
		return <Redirect to="/404" />;
	}

	if (!personData)
		return(<p>Betöltés ...</p>);

	return (
		<div>
			<h2>{personData.name}</h2>
		</div>
	);
}

export default StudentPage;
