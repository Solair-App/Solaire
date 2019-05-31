import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Welcome from "./Welcome";
import textFields from "./components/parcours/CreateParcours";
class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/CreateSlide" component={textFields} />
            <Route exact path="/" component={Welcome} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
