import React, { CSSProperties } from 'react';
import styles from "./MultiFileUploader.module.scss"
import FormElementWrapper from '../FormElementWrapper';
import FileUpload from './FileUpload';

export type UploadedFile = File;

export interface Props
{
	title:string,
	onChangeUploadedFiles: (files: UploadedFile[ ])=>void,
	style?:CSSProperties,
	singular?:boolean
}

const MultiFileUploader: React.FC<Props> = (props: Props) =>
{

	const handleNewFileChange=(fileList:FileList | null)=>{
		if (fileList)
		{
			let allFiles:File[ ] = [ ];
			for (let ii =0 ;ii < fileList.length;ii++)
			{
				let thisFile = fileList.item(ii);
				if (thisFile)
				{
					allFiles.push(thisFile);
				}
			}
			props.onChangeUploadedFiles(allFiles)
		}
		else
		{
			props.onChangeUploadedFiles([ ]);
		}
	};
	return (
		<FormElementWrapper
			title={props.title}
			style={props.style}
		>
			<FileUpload singular={props.singular} handleChange={handleNewFileChange} />
		</FormElementWrapper>
	);
}
export default MultiFileUploader;
