import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MainPageContainer from '../MainPageContainer/MainPage-container';
import NavMenuWrapper from '../NavMenuWrapper';
import FaceRecognitionPage from '../FaceRecognitionPage';
import PageMakerPage from '../PageMakerPage';
import AiUtil from "../../utils/AiUtil";
import StudentPage from '../StudentPage';

const App = () =>
{
	useEffect(()=>{
		async function loadFaceApi()
		{
			AiUtil.init();
		}
		loadFaceApi();
	},[ ]);

	return (
		<BrowserRouter>
			<NavMenuWrapper>
				<Switch>
					<Route exact path="/" component={MainPageContainer}/>
					<Route exact path="/recognise" component={FaceRecognitionPage}/>
					<Route exact path="/upload" component={PageMakerPage} />
					<Route exact path="/p/:id" component={StudentPage} />
				</Switch>
			</NavMenuWrapper>
		</BrowserRouter>
	);
}

export default App;
