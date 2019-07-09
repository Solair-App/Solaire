import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import withFirebaseContext from '../../Firebase/withFirebaseContext';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connected: true,
    };
  }

  componentDidMount() {
    if (localStorage.getItem('connected') === null) {
      this.setState({ connected: false });
    }
    setTimeout(() => this.setState({ connected: false }, localStorage.removeItem('connected')), 3000);

    const { auth } = this.props;
    auth.onAuthStateChanged((user) => {
      localStorage.removeItem('connected');
      if (user) {
        auth.getRedirectResult().then((result) => {
          // eslint-disable-next-line prefer-destructuring
          const newuser = result.user;
          if (newuser) {
            localStorage.removeItem('connected');
            localStorage.setItem('userId', user.uid);
            this.users(newuser);
          }
        });
      }
    });
  }

  login = (choice) => {
    const { auth, googleProvider } = this.props;
    if (choice === 'google') {
      auth.signInWithRedirect(googleProvider);
      this.setState({ connected: true });
      localStorage.setItem('connected', true);
    }
  }

  users = (user) => {
    // Récupération du Firestore grâce à context
    const { firestore } = this.props;
    // Envoi d'infos dans le cloud Firestore

    firestore.doc(`usersinfo/${user.uid}`).get()
      .then((docSnapshot) => {
        const { history } = this.props;
        if (docSnapshot.exists) {
          history.push('/mydashboard');
        } else {
          firestore.doc(`usersinfo/${user.uid}`).set({
            name: user.displayName,
            email: user.email,
            is_admin: false,
            uid: user.uid,
            url: 'https://i.ibb.co/TMTd967/Logo-solair.png',
          }, { merge: true });
          history.push('/mydashboard');
        }
      });
  }


  render() {
    const { connected } = this.state;
    return (
      <div className="signin" style={{ color: 'black' }}>
        <img style={{ margin: '5%', width: '80%', marginTop: '15%' }} src="https://i.ibb.co/TMTd967/Logo-solair.png" alt="logo" />
        <h1 style={{ color: '#138787', margin: '5%' }}>Solair</h1>
        <h4 style={{ color: '', margin: '5%' }}>Apprendre en s’amusant de façon ludique</h4>
        {
          connected
            ? <img className="loadingType" src="https://i.ibb.co/TMTd967/Logo-solair.png" alt="loading" />
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
                <p><Link to="/connect" style={{ color: '#E15920' }}>Already have an account?</Link></p>
              </>
            )
        }
      </div>

    );
  }
}

export default withRouter(withFirebaseContext(Signup));
