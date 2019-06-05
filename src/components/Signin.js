import React, { Component } from 'react';
import { withRouter } from 'react-router';
import withFirebaseContext from '../Firebase/withFirebaseContext';


class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      passwordOne: '',
      passwordTwo: '',
      error: null,
      // Math.floor(Math.random()*99999)+'toto'
      // Math.floor(Math.random()*99999)+'toto@mail.fr'
    };
  }


  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = (event) => {
    const { email, passwordOne } = this.state;
    const { auth } = this.props;
    auth.createUserWithEmailAndPassword(email, passwordOne)
      .then((result) => {
        // eslint-disable-next-line prefer-destructuring
        const user = result.user;
        this.users(user);
      })
      .catch((error) => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  users = (user) => {
    // Récupération du Firestore grâce à context
    const { firestore } = this.props;
    const { username } = this.state;
    // Envoi d'infos dans le cloud Firestore
    firestore.doc(`usersinfo/${user.uid}`).set({
      name: username,
      uid: user.uid,
    }, { merge: true });
    const { history } = this.props;
    history.push('/dashboard');
  }

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;
    const isInvalid = passwordOne !== passwordTwo
    || passwordOne === ''
    || email === ''
    || username === '';
    return (
      <div className="emailLog" style={{ color: 'black' }}>
        <form onSubmit={this.onSubmit}>
          <input
            name="username"
            value={username}
            onChange={this.onChange}
            type="text"
            placeholder="Full Name"
          />
          <input
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
          />
          <input
            name="passwordOne"
            value={passwordOne}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
          />
          <input
            name="passwordTwo"
            value={passwordTwo}
            onChange={this.onChange}
            type="password"
            placeholder="Confirm Password"
          />
          <button disabled={isInvalid} type="submit">
            Sign Up
          </button>
          {error && <p>{error.message}</p>}
        </form>
      </div>
    );
  }
}

export default withRouter(withFirebaseContext(Signup));
