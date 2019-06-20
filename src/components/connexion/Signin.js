/* eslint-disable jsx-quotes */
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import withFirebaseContext from '../../Firebase/withFirebaseContext';


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
        localStorage.setItem('userId', user.uid);
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
    const { username, email } = this.state;
    // Envoi d'infos dans le cloud Firestore
    firestore.doc(`usersinfo/${user.uid}`).set({
      name: username,
      email,
      uid: user.uid,
    }, { merge: true });
    const { history } = this.props;
    history.push('/mydashboard');
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
        <form onSubmit={this.onSubmit} className="classesContainer" autoComplete="off">
          <Grid container>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="name"
                label="Full Name"
                name="username"
                className='textfield'
                value={username}
                onChange={this.onChange}
                style={{ marginTop: '5%', width: '50%' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="email"
                label="Email Address"
                name="email"
                className='textfield'
                currentValue={email}
                onChange={this.onChange}
                style={{ marginTop: '5%', width: '50%' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>

              <TextField
                required
                id="password"
                label="Password"
                name="passwordOne"
                className='textfield'
                value={passwordOne}
                type="password"
                onChange={this.onChange}
                style={{ marginTop: '5%', width: '50%' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>

              <TextField
                required
                id="password"
                label="Confirm Password"
                name="passwordTwo"
                className='textfield'
                value={passwordTwo}
                type="password"
                onChange={this.onChange}
                style={{ marginTop: '5%', width: '50%' }}
              />
            </Grid>
          </Grid>
          <Button
            size="large"
            disabled={isInvalid}
            type="submit"
            color="primary"
            variant="contained"
            style={{ position: 'fixed center', marginTop: '8%', borderRadius: '20px' }}
            className="Button"
          >
            Sign Up
          </Button>
          {error && <p>{error.message}</p>}
        </form>
      </div>
    );
  }
}

export default withRouter(withFirebaseContext(Signup));
