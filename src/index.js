import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// в папке conteiners - корневые компоненты со своим state
// в папке components - функциональные компоненты. 

serviceWorker.unregister();
