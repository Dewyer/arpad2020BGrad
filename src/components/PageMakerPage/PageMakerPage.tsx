import React, { useState } from 'react';
import styles from "./PageMakerPage.module.scss"
import FormElementWrapper from '../FormElementWrapper';
import TextInput from '../TextInput';

export interface Props
{

}

const PageMakerPage:React.FC<Props> = (props:Props) =>
{
	const [personName,setPersonName] = useState("");
	const [description, setDescription] = useState("");
	return (
		<div className={styles.container}>
			<h2>Rakd össze az oldalad!</h2>
			<p>Vagy ne</p>

			<FormElementWrapper title={"Neved: "} style={{marginBottom:"1rem"}}>
				<TextInput value={personName} onChangeValue={setPersonName}/>
			</FormElementWrapper>
			<FormElementWrapper title={"Leírásod: "} containerStyle={{ width: "100%"}}>
				<TextInput
					multiline
					value={description}
					onChangeValue={setDescription}
					style={{width:"100%",minWidth:"14rem",maxWidth:"45rem"}}
				/>
			</FormElementWrapper>

			<input type="file" accept="image/*" multiple={false} onChange={(ee)=>{
				let ff = ee.target.files;
				if (ff)
				{
					console.log(ff);
				}
			}}/>
		</div>
	);
}

export default PageMakerPage;
