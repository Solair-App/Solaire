import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import Button from '@material-ui/core/Button';
import withFirebaseContext from './Firebase/withFirebaseContext';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
    const { auth } = this.props;
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.users(user);
      }
    });
  }

    login = (choice) => {
      const { auth, googleProvider, facebookProvider } = this.props;
      if (choice === 'google') {
        // auth.signInWithPopup(googleProvider) //à remplacer sur une app mobile
        //     .then((result) => {
        //         const user = result.user;
        //         this.setState({
        //             user
        //         }, this.users(user));
        //     });
        auth.signInWithRedirect(googleProvider)
          .then(() => auth.getRedirectResult())
          .then((result) => {
            const { user } = result;
            this.setState({
              user,
            });
            // this.props.history.push("/dashboard");
          }).catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
          });
      }

      if (choice === 'facebook') {
        // auth.signInWithPopup(facebookProvider) //à remplacer sur une app mobile
        //     .then((result) => {
        //         const user = result.user;
        //         this.setState({
        //             user
        //         }, this.users(user));
        //     });
        auth.signInWithRedirect(facebookProvider)
          .then(() => auth.getRedirectResult())
          .then((result) => {
            const { user } = result;
            this.setState({
              user,
            });
            // this.props.history.push("/dashboard");
          }).catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
          });
      }
    }

    users = (user) => {
      // Récupération du Firestore grâce à context
      const { firestore } = this.props;
      // Envoi d'infos dans le cloud Firestore
      firestore.doc(`users/${user.uid}`).set({
        name: user.displayName,
        uid: user.uid,
      }, { merge: true });
      this.props.history.push('/dashboard');
    }


    render() {
      const { user } = this.state;
      return (
        <div className="signin" style={{ color: 'black' }}>
          <img src="./assets/logo.png" alt="logo" />
          <h1>Elearning</h1>
          <h3>Apprendre en s’amusant de façon ludique</h3>
          {user
            ? <p>Signed in!</p>
            : (
              <>
                <p> Please sign in</p>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => this.login('google')}
                >
                Sign in with Google
                </Button>

                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => this.login('facebook')}
                >
                Sign in with Facebook
                </Button>

                <Link to="/signin">
                  <Button
                    variant="contained"
                    color="secondary"
                  >
                  Sign in with Email
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
