import React, { Component } from 'react';
import withFirebaseContext from './Firebase/withFirebaseContext';
import { withRouter } from "react-router";


const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
  };

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            passwordOne: '',
            passwordTwo: '',
            error: null,
        }
    }


    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    onSubmit = event => {
        const { username, email, passwordOne } = this.state;
        const { auth } = this.props;
        auth.createUserWithEmailAndPassword(email, passwordOne)
            .then((result) => {
                const user = result.user;
                console.log(user)
                this.setState({ ...INITIAL_STATE }, this.users(user, username));
                this.props.history.push("/dashboard");
            })
            .catch(error => {
                this.setState({ error });
            });

        event.preventDefault();
    };
    
    users = (user, username) => {
        //Récupération du Firestore grâce à context
        const { firestore } = this.props;
        //Envoi d'infos dans le cloud Firestore
        firestore.doc(`users/${user.uid}`).set({
            name: username,
            uid: user.uid,
        }, { merge: true });
    }

    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error, } = this.state;
        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';
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