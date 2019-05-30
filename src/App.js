import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Welcome from './Welcome';
import FirebaseProvider from './Firebase/FirebaseProvider';


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

      </div>
    );
  }
}

export default App;
