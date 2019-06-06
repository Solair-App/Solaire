import React from 'react';
import './App.scss';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Welcome from './Welcome';
import CreateParcours from './components/parcours/addparcours/CreateParcours';
import AddCours from './components/cours/addcours/AddCours';
import Dashboard from './components/dashboard/Dashboard';

const App = () => (
  <div className="App">
    <HashRouter>
      <Switch>
        <Route path="/CreateParcours" component={CreateParcours} />
        <Route path="/AddCours" component={AddCours} />
        <Route exact path="/" component={Welcome} />
        <Route path="/Dashboard" component={Dashboard} />
      </Switch>
    </HashRouter>
  </div>
);


export default App;
