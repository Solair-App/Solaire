import React from 'react';
import './App.scss';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Welcome from './components/Welcome';
import FirebaseProvider from './Firebase/FirebaseProvider';
import CreateParcours from './components/parcours/addparcours/CreateParcours';
import AddCours from './components/cours/addcours/AddCours';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Form from './components/Form';
import Dashboard from './components/Dashboard';
import Connect from './components/Connect';
import PasswordForget from './components/PasswordForget';
import Profile from './components/Profile';
import SlideFormateur from './components/SlideFormateur';
import SlideApprenant from './components/SlideApprenant';


const App = () => (
  <div className="App">
    <FirebaseProvider>
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route path="/CreateParcours" component={CreateParcours} />
          <Route path="/form" component={Form} />
          <Route path="/AddCours" component={AddCours} />
          <Route path="/slideApprenant" component={SlideApprenant} />
          <Route path="/slide" component={SlideFormateur} />
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
          <Route path="/connect" component={Connect} />
          <Route path="/reset" component={PasswordForget} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </HashRouter>
    </FirebaseProvider>
  </div>
);


export default App;
