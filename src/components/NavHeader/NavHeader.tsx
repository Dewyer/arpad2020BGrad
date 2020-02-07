import React from 'react';
import styles from "./NavHeader.module.scss"
import DrawerToggleButton from '../DrawerToggleButton';
import Drawer from "rc-drawer";
import { Link } from 'react-router-dom';
import NavButton, { NavButtonData } from '../NavButton/NavButton';
import camIcon from "../../assets/camera.png";
import listIcon from "../../assets/list.png";
import lottoIcon from "../../assets/lotto.png";

export interface Props
{

}

export interface State
{
	drawerOpen:boolean
}

class NavHeader extends React.Component<Props,State>
{
	constructor(props:Props)
	{
		super(props);

		this.state = {
			drawerOpen:false
		};
	}

	render(){

		const navList:NavButtonData[ ] = [
			{to:"/recognise",title:"Face Recognition",img:camIcon},
			{ to: "/", title: "Class list", img: listIcon },
			{ to: "#", title: "Lotto", img: lottoIcon },

		];
		return (
			<div className={styles.container}>
				<div className={styles.headerPart}>
					<img src={require("../../assets/clover.png")} alt="Clover logo"/>
					<span>E-Tabló</span>
				</div>
				<div className={styles.navPart}>
					{navList.map(x=><NavButton data={x}/>)}
				</div>
			</div>
		);
	}
}

export default NavHeader;
