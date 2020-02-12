import React from 'react';
import styles from "./FormElementWrapper.module.scss"

export interface Props
{
	title:string,
	containerStyle?:React.CSSProperties,
	style?:React.CSSProperties
}

const FormElementWrapper:React.FC<Props> = (props) =>
{
	return (
		<div className={styles.container} style={props.style}>
			<span className={styles.title}>{props.title}</span>
			<div style={props.containerStyle}>{props.children}</div>
		</div>
	);
}

export default FormElementWrapper;
