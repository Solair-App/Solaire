import React from 'react';
import { Link } from 'react-router-dom';
import withFirebaseContext from '../Firebase/withFirebaseContext';
import Button from '@material-ui/core/Button';



const Dashboard = () => (
  <div>
    <p>
      Welcome to your app
    </p>
    <p>
      <Link to="/profile">
        <Button
          size="large"
          type="button"
          color="primary"
          variant="contained"
          style={{ position: 'fixed center', marginTop: '8%', borderRadius: '20px' }}
          className="Button">
          My profile
    </Button>
      </Link>
    </p>
  </div>
);

export default withFirebaseContext(Dashboard);
