import React from 'react';
import styles from "./DrawerToggleButton.module.scss"

export interface Props
{
	onClick?():void
}

const DrawerToggleButton:React.FC<Props> = (props:Props) =>
{

	return (
		<button className={styles.btn} onClick={props.onClick}>
			<img src={require("../../assets/list.png")} alt="Open Drawer Button"/>
		</button>
	);
}

export default DrawerToggleButton;
