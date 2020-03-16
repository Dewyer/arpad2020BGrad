import React, { useState } from 'react';
import styles from "./PageMakerPage.module.scss"
import FormElementWrapper from '../FormElementWrapper';
import TextInput from '../TextInput';
import MultiFileUploader from '../MultiFileUploader';
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
import Button from '../Button';
import FileUpload from '../MultiFileUploader/FileUpload';
import { StudentPagePayload } from '../../models/StudentPage';
import StudentUitl from '../../utils/StudentUtil';
import Download from "../Download";
import snake from "to-snake-case";

export interface Props
{

}

const mdParser = new MarkdownIt();

const PageMakerPage: React.FC<Props> = (props: Props) =>
{
	const [personName, setPersonName] = useState("");
	const [statusText, setStatusText] = useState("");

	const [description, setDescription] = useState("");
	const [ownPhotos, setOwnPhotos] = useState<File[]>([]);
	const [teacherPhotos, setTeacherPhotos] = useState<File[]>([]);
	const [tabloPhoto, setTabloPhoto] = useState<File | null>(null);
	const [loading, setLoading] = useState(false);
	const [userPageJsonObj, setUserPageJsonObj] = useState<{ name: string, content: string } | undefined>(undefined);

	const finished = personName !== "" && description !== "" && tabloPhoto && teacherPhotos.length !== 0;

	async function makeFile()
	{
		let payload: StudentPagePayload =
		{
			name: personName,
			description: description,
			ownPhotos: ownPhotos,
			tabloPhoto: tabloPhoto!,
			teacherPhotos: teacherPhotos,
			status:statusText
		}

		setLoading(true);
		const obj = await StudentUitl.makeStudentPageObject(payload);
		setLoading(false);
		if (obj)
		{
			setUserPageJsonObj({ name: snake(personName.toLowerCase()) + ".json", content: JSON.stringify(obj) });
		}
		else
		{
			alert("Error, no faces or something");
		}
	}

	return (
		<div className={styles.container}>
			<h2>Rakd össze az oldalad!</h2>
			<p>Vagy ne</p>

			<FormElementWrapper title={"Neved: "} style={{ marginBottom: "1rem" }}>
				<TextInput value={personName} onChangeValue={setPersonName} />
			</FormElementWrapper>
			<FormElementWrapper title={"Státuszod: pl: 'Igazgató','Tanár' diák esetén üres"} style={{ marginBottom: "1rem" }}>
				<TextInput value={statusText} onChangeValue={setStatusText} />
			</FormElementWrapper>
			<FormElementWrapper title={"Leírásod: "} containerStyle={{ width: "100%" }}>
				<MdEditor
					value={description}
					renderHTML={(text) => mdParser.render(text)}
					onChange={(val) => { setDescription(val.text) }}
					style={{ height: "22rem", marginBottom: "1rem" }}
				/>
			</FormElementWrapper>
			<FormElementWrapper title="Tabló fotó" style={{ marginBottom: "1rem" }}>
				<FileUpload singular handleChange={(vv) =>
				{
					if (vv)
					{
						if (vv.length >= 1)
						{
							setTabloPhoto(vv[0]);
						}
					}
				}} />
			</FormElementWrapper>
			<MultiFileUploader
				style={{ marginBottom: "1rem" }}
				title="Saját Képek"
				onChangeUploadedFiles={setOwnPhotos}
			/>
			<MultiFileUploader
				style={{ marginBottom: "1rem" }}
				title="FACE AI Tanító képek"
				onChangeUploadedFiles={setTeacherPhotos}
			/>
			{userPageJsonObj ?
				<Download file={userPageJsonObj.name} content={userPageJsonObj.content}><Button style={{ marginTop: "2rem" }} title="Letöltés" /></Download> :
				<Button disabled={loading || !finished} style={{ marginTop: "2rem" }} title="Létrehozás" onClick={makeFile} />
			}
		</div>
	);
}

export default PageMakerPage;
