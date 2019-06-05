import React from 'react';
import './App.css';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Welcome from './components/Welcome';
import FirebaseProvider from './Firebase/FirebaseProvider';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Connect from './components/Connect';
import PasswordForget from './components/PasswordForget';
import Profile from './components/Profile';

const App = () => (
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

export default App;
