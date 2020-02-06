import React from 'react';

export interface Props
{

}

export interface State
{

}

class MainPageContainer extends React.Component<Props,State>
{
	constructor(props:Props)
	{
		super(props);

		this.state = {

		};
	}

	render(){
		return (
			<h2>Szuper oldalunk!</h2>
		);
	}
}

export default MainPageContainer;
