import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MainPageContainer from '../MainPageContainer/MainPage-container';

const App = () =>
{
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" component={MainPageContainer}/>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
