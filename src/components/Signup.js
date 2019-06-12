import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import withFirebaseContext from '../Firebase/withFirebaseContext';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connected: false,
    };
    const { auth } = this.props;

    auth.onAuthStateChanged((user) => {
      if (user) {
        auth.getRedirectResult().then((result) => {
          // eslint-disable-next-line prefer-destructuring
          const newuser = result.user;
          if (newuser) {
            this.users(newuser);
          }
        });
      }
    });
  }

  login = (choice) => {
    const { auth, googleProvider, facebookProvider } = this.props;
    if (choice === 'google') {
      auth.signInWithRedirect(googleProvider);
      this.setState({ connected: true });
    }

    if (choice === 'facebook') {
      auth.signInWithRedirect(facebookProvider);
      this.setState({ connected: true });
    }
  }

  users = (user) => {
    // Récupération du Firestore grâce à context
    const { firestore } = this.props;
    // Envoi d'infos dans le cloud Firestore
    firestore.doc(`usersinfo/${user.uid}`).set({
      name: user.displayName,
      uid: user.uid,
    }, { merge: true });
    const { history } = this.props;
    history.push('/mydashboard');
  }


  render() {
    const { connected } = this.state;
    return (
      <div className="signin" style={{ color: 'black' }}>
        <img src="./assets/logo.png" alt="logo" />
        <h1 style={{ margin: '1%' }}>Elearning</h1>
        <h3 style={{ margin: '1%' }}>Apprendre en s’amusant de façon ludique</h3>
        {
          connected
            ? <p>Signed in!</p>
            : (
              <>
                <h3 style={{ color: 'white', margin: '1%' }}> Please sign in</h3>
                <Button
                  variant="outlined"
                  onClick={() => this.login('google')}
                  style={{
                    marginTop: '10px',
                    width: '300px',
                  }}
                  className="Button"
                >
                  Sign up with Google
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => this.login('facebook')}
                  style={{
                    marginTop: '10px',
                    width: '300px',
                  }}
                  className="Button"
                >
                  Sign up with Facebook
                </Button>
                <Link to="/signin" style={{ textDecoration: 'none' }}>
                  <Button
                    variant="outlined"
                    style={{
                      marginTop: '10px',
                      marginBottom: '20px',
                      width: '300px',
                    }}
                    className="Button"
                  >
                    Sign up with Email
                  </Button>
                </Link>
                <p><Link to="/connect">Already have an account?</Link></p>
              </>
            )
        }
      </div>

    );
  }
}

export default withRouter(withFirebaseContext(Signup));
