import React from 'react';
import ReactDOM from 'react-dom';

import './css/index.css';
import App from './App';
import withFeature from './hoc/withFeature.js'
import withStorage from './hoc/withStorage.js'

const NewApp = withStorage(withFeature(App, "label", "labelID", {label: ""}));
ReactDOM.render(
	<NewApp/>, 
	document.getElementById('root')
);

if (module.hot) {
	module.hot.accept();
}
