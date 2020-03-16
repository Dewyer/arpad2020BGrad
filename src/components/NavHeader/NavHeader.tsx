import React from 'react';
import styles from "./NavHeader.module.scss"
import DrawerToggleButton from '../DrawerToggleButton';
import Drawer from "rc-drawer";
import { Link } from 'react-router-dom';
import NavButton, { NavButtonData } from '../NavButton/NavButton';
import camIcon from "../../assets/camera.png";
import listIcon from "../../assets/list.png";
import lottoIcon from "../../assets/lotto.png";
import Toggle from "react-toggle";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon,faSun } from '@fortawesome/free-solid-svg-icons';

import
{
	enable as enableDarkMode,
	disable as disableDarkMode,
	auto as followSystemColorScheme,
} from 'darkreader';

export interface Props
{

}

export interface State
{
	drawerOpen:boolean,
	darkModeOn:boolean
}

class NavHeader extends React.Component<Props,State>
{
	constructor(props:Props)
	{
		super(props);

		this.state = {
			drawerOpen:false,
			darkModeOn:false
		};
	}

	toggleDarkMode(newIsDarkModeOn:boolean)
	{
		if (newIsDarkModeOn)
		{
			enableDarkMode({
				brightness: 100,
				contrast: 90,
				sepia: 10,
			});
		}
		else
		{
			disableDarkMode();
		}
		this.setState({darkModeOn:newIsDarkModeOn});
	}

	render(){

		const navList:NavButtonData[ ] = [
			{to:"/recognise",title:"Face Recognition",img:camIcon},
			{ to: "/", title: "Class list", img: listIcon },
			{ to: "#", title: "Lotto", img: lottoIcon },
		];

		const night = <FontAwesomeIcon icon={faMoon} color="white" style={{fontSize:"0.65rem"}}/>;
		const day = <FontAwesomeIcon icon={faSun} color="white" style={{ fontSize: "0.65rem" }} />;

		return (
			<div className={styles.container}>
				<div className={styles.headerPart}>
					<img src={require("../../assets/clover.png")} alt="Clover logo"/>
					<span>E-Tabló</span>
				</div>
				<div className={styles.navPart}>
					<span className={styles.darkreader}>
						<Toggle
							id="dm-status"
							defaultChecked={this.state.darkModeOn}
							onChange={(ev)=>{this.toggleDarkMode(ev.target.checked)}}
							icons={{
								checked:night,
								unchecked:day
							}}
						/>
						<label htmlFor='dm-status'>Sötét mód</label>
					</span>
					{navList.map(x=><NavButton data={x}/>)}
				</div>
			</div>
		);
	}
}

export default NavHeader;
