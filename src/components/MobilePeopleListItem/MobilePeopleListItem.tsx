import React, { useState } from 'react';
import styles from "./MobilePeopleListItem.module.scss"
import { UserListItem } from '../../models/UserListItem';
import { Redirect } from 'react-router-dom';

export interface Props
{
	data:UserListItem
}

const MobilePeopleListItem:React.FC<Props> = (props) =>
{
	const [navToUrl,setNavToUrl] = useState<string|undefined>(undefined);
	if (navToUrl)
	{
		return <Redirect to={`${navToUrl}`} />
	}

	return (
	<div className={styles.container} onClick={()=>{setNavToUrl(`/p/${props.data.id}`)}}>
		<img src={props.data.tabloBase64} alt={props.data.name+" tablokepe"}/>
		<p>{props.data.name} <span>{props.data.status}</span></p>
	</div>);
}

export default MobilePeopleListItem;
