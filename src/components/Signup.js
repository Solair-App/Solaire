import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import withFirebaseContext from '../Firebase/withFirebaseContext';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
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
    }

    if (choice === 'facebook') {
      auth.signInWithRedirect(facebookProvider);
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
    history.push('/dashboard');
  }


  render() {
    const { user } = this.state;
    return (
      <div className="signin" style={{ color: 'black' }} >
        {
          user
            ? <p>Signed in!</p>
            : (
              <>
                <p> Please sign in</p>
                <button type="button" onClick={() => this.login('google')}>Sign up with Google</button>
                <button type="button" onClick={() => this.login('facebook')}>Sign up with Facebook</button>
                <Link to="/signin">
                  <button type="button">Sign up with Email</button>
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
