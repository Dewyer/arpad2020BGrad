import React, { useState, useEffect } from 'react';
import styles from "./PeopleListPage.module.scss"
import useWindowDimensions from '../../hooks/useWindowDimension';
import StudentUitl from '../../utils/StudentUtil';
import MobilePeopleList from '../MobilePeopleList';
import { RouteChildrenProps } from 'react-router-dom';

export interface Props
{

}

const PeopleListPage: React.FC<RouteChildrenProps<Props>> = (props) =>
{
	const windowSize = useWindowDimensions();
	const IsMobile = windowSize.width > 0;
	const [isDataReady, setIsDataReady] = useState<boolean>(StudentUitl.CachedUserList !== undefined);

	useEffect(() =>
	{
		async function startFetch()
		{
			if (!StudentUitl.CachedUserList)
			{
				await StudentUitl.fetchAndCacheUserList();
				setIsDataReady(StudentUitl.CachedUserList !== undefined);
			}
		}

		startFetch();
	}, []);

	if (!isDataReady)
		return (<p>Betöltés...</p>);

	return (
		IsMobile ? <MobilePeopleList users={StudentUitl.CachedUserList!} /> : null
	);
}

export default PeopleListPage;
