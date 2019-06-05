
import React, { Component } from 'react';
import { withRouter } from 'react-router';
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
    const isInvalid = email === '';
    return (
      <>
        {sent
          ? <p>Email sent</p>
          : (
            <form onSubmit={this.onSubmit}>
              <input
                name="email"
                value={email}
                onChange={this.onChange}
                type="text"
                placeholder="Email Address"
              />
              <button disabled={isInvalid} type="submit">
                Reset My Password
              </button>
              {error && <p>{error.message}</p>}
            </form>
          )
        }
      </>
    );
  }
}

export default withRouter(withFirebaseContext(PasswordForget));
