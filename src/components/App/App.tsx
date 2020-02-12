import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MainPageContainer from '../MainPageContainer/MainPage-container';
import NavMenuWrapper from '../NavMenuWrapper';
import FaceRecognitionPage from '../FaceRecognitionPage';
import PageMakerPage from '../PageMakerPage';

const App = () =>
{
	return (
		<BrowserRouter>
			<NavMenuWrapper>
				<Switch>
					<Route exact path="/" component={MainPageContainer}/>
					<Route exact path="/recognise" component={FaceRecognitionPage}/>
					<Route exact path="/upload" component={PageMakerPage} />
				</Switch>
			</NavMenuWrapper>
		</BrowserRouter>
	);
}

export default App;
