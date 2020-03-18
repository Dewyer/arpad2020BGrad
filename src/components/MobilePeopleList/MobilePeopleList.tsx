import React from 'react';
import styles from "./MobilePeopleList.module.scss"
import { UserListItem } from '../../models/UserListItem';
import MobilePeopleListItem from '../MobilePeopleListItem';

export interface Props
{
	users:UserListItem[]
}

const MobilePeopleList:React.FC<Props> = (props) =>
{
	return (
		<div className={styles.container}>
			<div className={styles.headerPart}>
				<h2>Az osztály diákjai és tanárai voltak:</h2>
				<p>2014-2020</p>
			</div>
			{props.users.map(dd=><MobilePeopleListItem data={dd} />)}
		</div>
	);
}

export default MobilePeopleList;
