import React from 'react';

export interface Props
{
	handleChange:(files:FileList | null)=>void,
	singular?:boolean
}
const FileUpload: React.FC<Props> = (props: Props) =>
{
	return (
		<input type="file" accept="image/*" multiple={!props.singular} onChange={(ee) =>{props.handleChange(ee.target.files)}}/>
	);
}

export default FileUpload;
