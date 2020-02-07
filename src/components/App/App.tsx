import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MainPageContainer from '../MainPageContainer/MainPage-container';
import NavMenuWrapper from '../NavMenuWrapper';
import FaceRecognitionPage from '../FaceRecognitionPage';

const App = () =>
{
	return (
		<BrowserRouter>
			<NavMenuWrapper>
				<Switch>
					<Route exact path="/" component={MainPageContainer}/>
					<Route exact path="/recognise" component={FaceRecognitionPage}/>
				</Switch>
			</NavMenuWrapper>
		</BrowserRouter>
	);
}

export default App;
