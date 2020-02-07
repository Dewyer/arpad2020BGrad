import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MainPageContainer from '../MainPageContainer/MainPage-container';
import NavMenuWrapper from '../NavMenuWrapper';

const App = () =>
{
	return (
		<BrowserRouter>
			<NavMenuWrapper>
				<Switch>
					<Route path="/" component={MainPageContainer}/>
				</Switch>
			</NavMenuWrapper>
		</BrowserRouter>
	);
}

export default App;
