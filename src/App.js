import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Welcome from './Welcome';
import CreateParcours from './components/parcours/addparcours/CreateParcours';
import AddCours from './components/cours/addcours/AddCours';
import ParcoursList from './components/dashboard/Dashboard';

const App = () => (
  <div className="App">
    <BrowserRouter>
      <Switch>
        <Route path="/CreateParcours" component={CreateParcours} />
        <Route path="/AddCours" component={AddCours} />
        <Route exact path="/" component={Welcome} />
        <Route path="/ParcoursList" component={ParcoursList} />
      </Switch>
    </BrowserRouter>
  </div>
);


export default App;
