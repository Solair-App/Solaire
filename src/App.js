import React from 'react';
import './App.scss';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Welcome from './Welcome';
import FirebaseProvider from './Firebase/FirebaseProvider';
import CreateParcours from './components/parcours/CreateParcours';
import AddCours from './components/cours/AddCours';
import Signin from './Signin';
import Signup from './Signup';
import Dashboard from './Dashboard';
import Connect from './Connect';
import PasswordForget from './PasswordForget';
import Profile from './Profile';

const App = () => (
  <div className="App">
      <FirebaseProvider>
      <HashRouter>
      <Switch>
        <Route path="/CreateParcours" component={CreateParcours} />
        <Route path="/AddCours" component={AddCours} />
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
