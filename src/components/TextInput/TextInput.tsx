import React from 'react';
import styles from "./TextInput.module.scss"

export interface Props
{
	value:string,
	onChangeValue:(newVal:string)=>void;
	multiline?:boolean,
	style?:React.CSSProperties,
	rows?:number
}

const TextInput:React.FC<Props> = (props:Props) =>
{
	if (props.multiline)
	{
		return (<textarea style={props.style} value={props.value} onChange={(ss) => { props.onChangeValue(ss.target.value) }} rows={props.rows ? props.rows : 4} className={styles.inp}/>);
	}

	return (
		<input style={props.style} type={"text"} value={props.value} onChange={(ss)=>{props.onChangeValue(ss.target.value);}} className={styles.inp}/>
	);
}

export default TextInput;
