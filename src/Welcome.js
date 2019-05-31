import React, { Component } from "react";
import withFirebaseContext from "./Firebase/withFirebaseContext";

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }
  componentDidMount() {
    console.log(this.props);
    const { auth } = this.props;
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      }
    });
  }
  login = () => {
    const { auth, googleProvider } = this.props;
    auth
      .signInWithPopup(googleProvider) //à remplacer sur une app mobile
      .then(result => {
        const user = result.user;
        this.setState(
          {
            user
          },
          this.users(user)
        );
      });
  };

  users = user => {
    //Récupération du Firestore grâce à context
    const { firestore } = this.props;

    //Envoi d'infos dans le cloud Firestore
    firestore.doc(`users/${user.uid}`).set(
      {
        name: user.displayName,
        uid: user.uid,
        score: ""
      },
      { merge: true }
    );
  };

  logout = () => {
    const { auth } = this.props;
    auth.signOut().then(() => {
      this.setState({
        user: null
      });
    });
  };

  render() {
    const { user } = this.state;
    return (
      <div className="home" style={{ color: "black" }}>
        {user ? <p>Hello, {user.displayName}</p> : <p>Please sign in</p>}
        {user ? (
          <button onClick={this.logout}>Log Out</button>
        ) : (
          <button onClick={this.login}>Log In</button>
        )}
      </div>
    );
  }
}

export default withFirebaseContext(Welcome);
