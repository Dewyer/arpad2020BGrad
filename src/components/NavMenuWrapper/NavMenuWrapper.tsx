import React from 'react';
import styles from "./NavMenuWrapper.module.scss"
import NavHeader from '../NavHeader';

export interface Props
{

}

export interface State
{

}

class NavMenuWrapper extends React.Component<Props,State>
{
	constructor(props:Props)
	{
		super(props);

		this.state = {

		};
	}

	render(){
		return (
			<div className={styles.container}>
				<NavHeader />
				<div>
					{this.props.children}
				</div>
				<span>Footer</span>
			</div>
		);
	}
}

export default NavMenuWrapper;
