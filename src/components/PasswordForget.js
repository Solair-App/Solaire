
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import ArrowBack from '@material-ui/icons/ArrowBack';
import withFirebaseContext from '../Firebase/withFirebaseContext';


const INITIAL_STATE = {
  email: '',
  error: null,
  sent: false,
};

class PasswordForget extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email } = this.state;
    const { auth } = this.props;
    const { history } = this.props;
    auth.sendPasswordResetEmail(email).then(() => {
      this.setState({ sent: true });
      setTimeout(() => history.push('/connect'), 1500);
    }).catch((error) => {
      this.setState({ error });
    });
    event.preventDefault();
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, error, sent } = this.state;
    const { history } = this.props;
    const isInvalid = email === '';
    return (
      <>
        {sent
          ? <p>Email envoyé</p>
          : (
            <>
              <div className="topFond">
                <ArrowBack
                  style={{ position: 'absolute', left: '9px', top: '13px' }}
                  onClick={() => {
                    history.push('/signin');
                  }}
                />
                <h1>Réinitialiser son mot de passe</h1>
              </div>
              <form onSubmit={this.onSubmit}>
                <Grid container>

                  <Grid item xs={12}>
                    <TextField
                      required
                      name="email"
                      label="Votre email"
                      className="textfield"
                      currentValue={email}
                      type="text"
                      onChange={this.onChange}
                      style={{ marginTop: '5%', marginBottom: '50px', width: '50%' }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      size="large"
                      disabled={isInvalid}
                      type="submit"
                      color="primary"
                      variant="contained"
                      style={{ position: 'fixed center', marginTop: '8%', borderRadius: '20px' }}
                      className="Button"
                    >
                Réinitialiser
                    </Button>
                  </Grid>
                </Grid>
                {error && <p>{error.message}</p>}
              </form>
            </>
          )
        }
      </>
    );
  }
}

export default withRouter(withFirebaseContext(PasswordForget));
