import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Welcome from './compoments/Welcome';
import FirebaseProvider from './Firebase/FirebaseProvider';
import Quiz from './compoments/Quiz';


class App extends Component {
  render() {
    return (
      <div className="App">
        <FirebaseProvider>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Welcome} />
            </Switch>
          </BrowserRouter>
        </FirebaseProvider>
        <Quiz />
      </div>
    );
  }
}

export default App;
