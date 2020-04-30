import React from 'react';
import styles from "./Construction.module.scss"

export interface Props
{

}

const Construction:React.FC<Props> = (props:Props) =>
{

	return (
		<div className={styles.container}>
			<img src={require("../../assets/post.png")} />
			<h2>Ez az oldal fejlesztés alatt van !</h2>
			<a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Addig is</a>
		</div>
	);
}

export default Construction;
