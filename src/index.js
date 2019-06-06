import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import FirebaseProvider from './Firebase/FirebaseProvider';

<<<<<<< HEAD
ReactDOM.render(<FirebaseProvider><App /></FirebaseProvider>, document.getElementById('root'));
=======
const startApp = () => {
  ReactDOM.render(
    <App />, document.getElementById('root'),
  );
  serviceWorker.register();
};

if (window.cordova) {
  document.addEventListener('deviceready', startApp, false);
} else {
  startApp();
}

>>>>>>> aeafa087b3dadd5a64aedb345ad4fd2e81be22d9

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
