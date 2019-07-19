/* eslint-disable jsx-quotes */
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import ArrowBack from '@material-ui/icons/ArrowBack';
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
    };
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  isContentNull = () => {
    const {
      passwordOne, passwordTwo, email, username,
    } = this.state;
    if (passwordOne !== passwordTwo
      || passwordOne === ''
      || email === ''
      || username === '') {
      return true;
    }
    return false;
  };

  onSubmit = (event) => {
    const { email, passwordOne } = this.state;
    const { auth } = this.props;
    if (this.isContentNull()) {
      this.setState({ error: 'Veuillez renseigner toutes les informations' });
    } else {
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
    }
  };

  users = (user) => {
    // Récupération du Firestore grâce à context
    const { firestore } = this.props;
    const { username, email } = this.state;
    // Envoi d'infos dans le cloud Firestore
    firestore.doc(`usersinfo/${user.uid}`).set({
      name: username,
      email,
      is_admin: false,
      uid: user.uid,
      url: 'https://i.ibb.co/TMTd967/Logo-solair.png',
    }, { merge: true });
    const { history } = this.props;
    history.push('/tuto');
  }

  render() {
    const { history } = this.props;
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    return (
      <div className="emailLog" style={{ color: 'black' }}>
        <div className="topFond">
          <ArrowBack
            style={{ position: 'absolute', left: '9px', top: '13px' }}
            onClick={() => {
              history.push('/signup');
            }}
          />
          <h1>Inscription avec un email</h1>
        </div>
        <form onSubmit={this.onSubmit} className="classesContainer" autoComplete="off">
          <Grid container style={{ marginBottom: '20px' }}>
            <Grid item xs={12}>
              <TextField
                required
                id="name"
                label="Prénom et nom"
                name="username"
                className='textfield'
                value={username}
                onChange={this.onChange}
                style={{ marginTop: '5%', width: '50%' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="email"
                label="Email"
                name="email"
                className='textfield'
                currentValue={email}
                onChange={this.onChange}
                style={{ marginTop: '5%', width: '50%' }}
              />
            </Grid>
            <Grid item xs={12}>

              <TextField
                required
                id="password"
                label="Mot de passe"
                name="passwordOne"
                className='textfield'
                value={passwordOne}
                type="password"
                onChange={this.onChange}
                style={{ marginTop: '5%', width: '50%' }}
              />
            </Grid>
            <Grid item xs={12}>

              <TextField
                required
                id="password"
                label="Confirmer mot de passe"
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
            type="submit"
            color="primary"
            variant="contained"
            style={{
              position: 'fixed center', borderRadius: '20px', backgroundColor: '#138787', color: 'white',
            }}
          >
            S&apos;inscrire
          </Button>
          {error && <p>{error.message}</p>}
        </form>
      </div>
    );
  }
}

export default withRouter(withFirebaseContext(Signup));
