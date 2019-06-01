import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Welcome from './Welcome';
import CreateParcours from './components/parcours/CreateParcours';
import Cours from './components/cours/Cours';

const App = () => (
  <div className="App">
    <BrowserRouter>
      <Switch>
        <Route path="/CreateParcours" component={CreateParcours} />
        <Route path="/AddCours" component={Cours} />
        <Route exact path="/" component={Welcome} />
      </Switch>
    </BrowserRouter>
  </div>
);


export default App;
