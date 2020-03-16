import React, { useState, useEffect } from 'react';
import styles from "./StudentPage.module.scss"
import {RouteChildrenProps, Redirect} from "react-router-dom";
import people from "../../assets/people.json";
import StudentPageModel from "../../models/StudentPage";
import StudentUitl from '../../utils/StudentUtil';
import MarkdownIt from 'markdown-it';

export interface Params
{
	id:string
}

const mdParser = new MarkdownIt();

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
		<div className={styles.container}>
			<h2 className={styles.name}>{personData.name}</h2>
			<img className={styles.tabloImg} src={personData.tabloBase64} alt="Tablo kep"/>
			<div className={styles.description} dangerouslySetInnerHTML={{__html:mdParser.render(personData.description)}}/>
		</div>
	);
}

export default StudentPage;
