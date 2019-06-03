import React, { Component } from 'react';
import withFirebaseContext from './Firebase/withFirebaseContext';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";



class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            loading: true,
        }
        const { auth } = this.props
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user }, this.props.history.push("/dashboard"));
            }
            this.setState({ loading: false });
        });
    }

    login = (choice) => {
        const { auth, googleProvider, facebookProvider } = this.props;
        if (choice === 'google') {
            auth.signInWithPopup(googleProvider) //à remplacer sur une app mobile 
            .then((result) => {
                const user = result.user;
                this.setState({
                    user
                }, this.users(user));
            });   
            // auth.signInWithRedirect(googleProvider)
            //     .then(()=> {return auth.getRedirectResult();})
            //     .then((result) => {
            //         const user = result.user;
            //         this.setState({
            //             user
            //         }, this.users(user));
            //         // this.props.history.push("/dashboard");
            //     }).catch((error)=>{
            //         const errorMessage = error.message;
            //         console.log(errorMessage)
            //     });
        }

        if (choice === 'facebook') {
            auth.signInWithPopup(facebookProvider) //à remplacer sur une app mobile 
            .then((result) => {
                const user = result.user;
                this.setState({
                    user
                }, this.users(user));
            });   
            // auth.signInWithRedirect(facebookProvider)
            //     .then(()=> {return auth.getRedirectResult();})
            //     .then((result) => {
            //         const user = result.user;
            //         this.setState({
            //             user
            //         }, this.users(user));
            //         // this.props.history.push("/dashboard");
            //     }).catch((error)=>{
            //         const errorMessage = error.message;
            //         console.log(errorMessage)
            //     });
        }
    }

    users = (user) => {

        //Récupération du Firestore grâce à context
        const { firestore } = this.props;
        //Envoi d'infos dans le cloud Firestore
        firestore.doc(`users/${user.uid}`).set({
            name: user.displayName,
            uid: user.uid,
        }, { merge: true });
    }


    render() {
        const { loading } = this.state;
        return (
            <div className="home" style={{ color: 'black' }}>
                {loading
                    ? <p>Please wait</p>
                    : <p>Please sign in</p>
                }
                {loading
                    ? (<p>Wait</p>)
                    : (
                        <>
                            <button onClick={() => this.login('google')}>Sign up with Google</button>
                            <button onClick={() => this.login('facebook')}>Sign up with Facebook</button>
                            <Link to="/signup">
                                <button>Sign up with Email</button>    
                            </Link>
                            <p><Link to="/connect">Already have an account?</Link></p>
                        </>
                    )
                }
            </div>
        );
    }
}

export default withRouter(withFirebaseContext(Welcome));