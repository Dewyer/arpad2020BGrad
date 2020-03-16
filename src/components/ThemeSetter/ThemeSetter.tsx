import React, { useState, useEffect } from 'react';
import styles from "./ThemeSetter.module.scss"
import Toggle from "react-toggle";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import
{
	enable as enableDarkMode,
	disable as disableDarkMode,
	auto as followSystemColorScheme,
} from 'darkreader';

export interface Props
{

}

const ThemeSetter:React.FC<Props> = (props:Props) =>
{
	function toggleDarkMode(newIsDarkModeOn: boolean)
	{
		if (newIsDarkModeOn)
		{
			enableDark();
		}
		else
		{
			disableDarkMode();
		}
		setIsDarkTheme(newIsDarkModeOn);
		localStorage.setItem("darkmode",newIsDarkModeOn+"");
	}

	function enableDark()
	{
		enableDarkMode({
			brightness: 100,
			contrast: 90,
			sepia: 10,
		});
	}
	const [isDarkTheme,setIsDarkTheme] = useState(false);

	useEffect(()=>{
		let lastSetting = localStorage.getItem("darkmode");
		if (lastSetting)
		{
			let willbeDarkMode = lastSetting === "true";
			setIsDarkTheme(willbeDarkMode);
			if (willbeDarkMode)
			{
				enableDark();
			}
		}
	},[])

	const night = <FontAwesomeIcon icon={faMoon} color="white" style={{ fontSize: "0.65rem" }} />;
	const day = <FontAwesomeIcon icon={faSun} color="white" style={{ fontSize: "0.65rem" }} />;

	return (
		<span className={styles.darkreader}>
			<Toggle
				id="dm-status"
				defaultChecked={isDarkTheme}
				onChange={(ev) => { toggleDarkMode(ev.target.checked) }}
				icons={{
					checked: night,
					unchecked: day
				}}
				checked={isDarkTheme}
			/>
			<label htmlFor='dm-status'>Sötét mód</label>
		</span>
	);
}

export default ThemeSetter;
