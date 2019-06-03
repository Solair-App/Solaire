
import React, { Component } from 'react';
import withFirebaseContext from './Firebase/withFirebaseContext';
import { withRouter } from "react-router";

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

    onSubmit = event => {
        const { email } = this.state;
        const { auth } = this.props;
        auth.sendPasswordResetEmail(email).then(() => {
            this.setState({ sent: true }, this.props.history.push("/connect"));
        setTimeout(() => this.setState({ ...INITIAL_STATE }), 1500)
    }).catch(function(error) {
        this.setState({ error });
    });
    event.preventDefault();
};

onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
};

render() {
    const { email, error, sent } = this.state;

    const isInvalid = email === '';

    return (
        <>
            {sent
                ? <p>Email sent</p>
                : <form onSubmit={this.onSubmit}>
                    <input
                        name="email"
                        value={this.state.email}
                        onChange={this.onChange}
                        type="text"
                        placeholder="Email Address"
                    />
                    <button disabled={isInvalid} type="submit">
                        Reset My Password
        </button>

                    {error && <p>{error.message}</p>}
                </form>
            }
        </>
    );
}
}

export default withRouter(withFirebaseContext(PasswordForget));
