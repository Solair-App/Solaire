import React from 'react';
import { Link } from 'react-router-dom';
import withFirebaseContext from '../Firebase/withFirebaseContext';


const Dashboard = () => (
  <div>
    <p>
        Welcome to your app
    </p>
    <p><Link to="/profile">My profile</Link></p>
  </div>
);

export default withFirebaseContext(Dashboard);
