import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import withFirebaseContext from '../../Firebase/withFirebaseContext';
import '../../SCSS/SignUp.scss';


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
    setTimeout(() => this.setState({ connected: false }, localStorage.removeItem('connected')), 5000);

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
          history.push('/tuto');
        }
      });
  }


  render() {
    const { connected } = this.state;
    return (
      <div className="signin" style={{ color: 'black' }}>
        <img src="https://i.ibb.co/TMTd967/Logo-solair.png" alt="logo" className="image" />
        <h1 className="title">Solair</h1>
        <h4 className="accroche">Apprendre en s’amusant de façon ludique</h4>
        {
          connected
            ? <img className="loadingType" src="https://i.ibb.co/TMTd967/Logo-solair.png" alt="loading" />
            : (
              <>
                <h5 className="pleaseSign"> Please sign in</h5>
                <Fab
                  variant="extended"
                  size="medium"
                  aria-label="Add"
                  className="Button"
                  onClick={() => this.login('google')}
                >
                  Sign up with Google
                </Fab>
                <Link to="/signin" style={{ textDecoration: 'none' }}>
                  <Fab
                    variant="extended"
                    size="medium"
                    aria-label="Add"
                    className="Button"
                  >
                    Sign up with Email
                  </Fab>
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
