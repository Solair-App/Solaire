import React from 'react';
import './App.scss';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Welcome from './components/Welcome';
import FirebaseProvider from './Firebase/FirebaseProvider';
import CreateParcours from './components/parcours/addparcours/CreateParcours';
import AddCours from './components/cours/addcours/AddCours';
import Signin from './components/connexion/Signin';
import Signup from './components/connexion/Signup';
import Form from './components/supports/video/Form';
import Dashboard from './components/dashboard/Dashboard';
import Connect from './components/connexion/Connect';
import PasswordForget from './components/PasswordForget';
import Profile from './components/Profile';
import SlideFormateur from './components/supports/slides/SlideFormateur';
import SlideApprenant from './components/supports/slides/SlideApprenant';
import CreateQuiz from './components/supports/quiz/CreateQuiz';
import SeeParcours from './components/parcours/seeparcours/SeeParcours';
import Quiz from './components/supports/quiz/Quiz';
import CreateQuestion from './components/supports/quiz/CreateQuestion';
import Video from './components/supports/video/Video';
import CreateSlider from './components/supports/slides/CreateSlider';


const App = () => (
  <div className="App">
    <FirebaseProvider>
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route path="/CreateParcours" component={CreateParcours} />
          <Route path="/addvideo" component={Form} />
          <Route path="/video" component={Video} />
          <Route path="/AddCours" component={AddCours} />
          <Route path="/addquiz" component={CreateQuiz} />
          <Route path="/addquestion" component={CreateQuestion} />
          <Route path="/parcours" component={SeeParcours} />
          <Route path="/slide" component={SlideApprenant} />
          <Route path="/createslider" component={CreateSlider} />
          <Route path="/addslide" component={SlideFormateur} />
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
          <Route path="/connect" component={Connect} />
          <Route path="/reset" component={PasswordForget} />
          <Route path="/mydashboard" component={Dashboard} />
          <Route path="/profile" component={Profile} />
          <Route path="/quiz" component={Quiz} />
        </Switch>
      </HashRouter>
    </FirebaseProvider>
  </div>
);


export default App;
