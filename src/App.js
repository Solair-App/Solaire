import React, { Component } from 'react';
import './App.css';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Welcome from './Welcome';
import FirebaseProvider from './Firebase/FirebaseProvider';
import Signin from './Signin';
import Signup from './Signup';
import Dashboard from './Dashboard';
import Connect from './Connect';
import PasswordForget from './PasswordForget';
import Profile from './Profile';



class App extends Component {
  render() {
    return (
      <div className="App">
        <FirebaseProvider>
          <HashRouter>
            <Switch>
              <Route exact path="/" component={Welcome} />
              <Route exact path="/signin" component={Signin} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/connect" component={Connect} />
              <Route exact path="/reset" component={PasswordForget} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/profile" component={Profile} />
            </Switch>
          </HashRouter>
        </FirebaseProvider>

      </div>
    );
  }
}

export default App;
