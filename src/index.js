import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// Main Styles CSS
import './styles/scss/main.css';
// Bootstrap 4.3 CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// React Modal Video CSS
import '../node_modules/react-modal-video/scss/modal-video.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
