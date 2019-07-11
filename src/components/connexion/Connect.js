import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import ArrowBack from '@material-ui/icons/ArrowBack';
import withFirebaseContext from '../../Firebase/withFirebaseContext';
import '../../SCSS/SignUp.scss';

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class Connect extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email, password } = this.state;
    const { auth } = this.props;
    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        const { history } = this.props;
        history.push('mydashboard');
      })
      .catch((error) => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };


  render() {
    const { email, password, error } = this.state;
    const isInvalid = password === '' || email === '';
    const { history } = this.props;

    return (
      <>
        <div className="topFond">
          <ArrowBack
            style={{
              position: 'absolute', left: '10px', top: '10px', color: 'white',
            }}
            onClick={() => {
              history.push('/signup');
            }}
          />
          <h1>Connexion avec un email</h1>
        </div>
        <form onSubmit={this.onSubmit}>
          <img src="https://i.ibb.co/TMTd967/Logo-solair.png" alt="logo" className="image" />
          <h1 className="title">Solair</h1>
          <h4 className="accroche">Connection</h4>

          <Grid container>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                name="email"
                label="Email Address"
                className="email"
                currentValue={email}
                onChange={this.onChange}
                style={{ marginTop: '70px', marginBottom: '70px', width: '50%' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                name="password"
                label="password"
                className="password"
                currentValue={password}
                type="password"
                onChange={this.onChange}
                style={{ marginTop: '70px', marginBottom: '70px', width: '50%' }}
              />
            </Grid>
          </Grid>
          <Button
            size="large"
            disabled={isInvalid}
            type="submit"
            color="primary"
            variant="contained"
            style={{ position: 'fixed center', marginTop: '500px', borderRadius: '20px' }}
            className="Button"
          >
            Sign IN
          </Button>
          {error && <p>{error.message}</p>}
        </form>
        <p><Link to="/reset">Forgot Password?</Link></p>
      </>
    );
  }
}
export default withRouter(withFirebaseContext(Connect));
