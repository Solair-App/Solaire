import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import withFirebaseContext from '../../Firebase/withFirebaseContext';

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
            localStorage.setItem('userId', user.uid);
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
      email: user.email,
      is_admin: false,
      uid: user.uid,
    }, { merge: true });
    const { history } = this.props;
    history.push('/mydashboard');
  }


  render() {
    const { connected } = this.state;
    return (
      <div className="signin" style={{ color: 'black' }}>
        <img style={{ margin: '8%' }} src="./assets/logo.png" alt="logo" />
        <h1 style={{ color: '#138787', margin: '5%' }}>Solair</h1>
        <h4 style={{ color: '', margin: '5%' }}>Apprendre en s’amusant de façon ludique</h4>
        {
          connected
            ? <p>Signed in!</p>
            : (
              <>
                <h5 style={{ color: '', margin: '1%' }}> Please sign in</h5>
                <Button
                  variant="outlined"
                  onClick={() => this.login('google')}
                  style={{
                    backgroundColor: '#138787',
                    color: 'white',
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
                    backgroundColor: '#138787',
                    color: 'white',
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
                      backgroundColor: '#138787',
                      color: 'white',
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
