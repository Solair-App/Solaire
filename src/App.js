import React from 'react';
import './App.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Welcome from './Welcome';
import CreateParcours from './components/parcours/CreateParcours';
import AddCours from './components/cours/AddCours';
import Quiz from './components/Quiz';

const App = () => (
  <div className="App">
    <BrowserRouter>
      <Switch>
      <Route path="/Quiz" component={Quiz} />
        <Route path="/CreateParcours" component={CreateParcours} />
        <Route path="/AddCours" component={AddCours} />
        <Route exact path="/" component={Welcome} />
      </Switch>
    </BrowserRouter>
  </div>
);


export default App;
