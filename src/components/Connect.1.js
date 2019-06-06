import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import withFirebaseContext from '../Firebase/withFirebaseContext';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

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
        history.push('/dashboard');
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

    return (
      <>
        <form onSubmit={this.onSubmit}>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                name="email"
                label="Email Address"
                className='textfield'
                currentValue={email}
                onChange={this.onChange}
                style={{ marginTop: '5%', width: '50%' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                name="password"
                label="password"
                className='textfield'
                currentValue={password}
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
            className="Button">
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
