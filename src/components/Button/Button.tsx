import React, { CSSProperties } from 'react';
import styles from "./Button.module.scss"

export interface Props
{
	title:string,
	onClick?:()=>void,
	style?:CSSProperties,
	disabled?:boolean
}

const Button:React.FC<Props> = (props:Props) =>
{
	return (
		<button disabled={props.disabled} style={props.style} className={styles.btn} onClick={props.onClick}>
			{props.title}
		</button>
	);
}

export default Button;
