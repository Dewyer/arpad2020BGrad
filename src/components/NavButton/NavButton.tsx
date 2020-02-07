import React from 'react';
import styles from "./NavButton.module.scss"
import { Link } from 'react-router-dom';

export interface NavButtonData
{
	to:string,
	title:string,
	img:any
}

export interface Props
{
	data:NavButtonData
}

const NavButton:React.FC<Props> = (props:Props) =>
{

	return (
		<Link className={styles.navBtn} to={props.data.to}>
			<img src={props.data.img} alt={props.data.title} />
			<span>{props.data.title}</span>
		</Link>
	);
}

export default NavButton;
