import React, { Component } from 'react';
import withFirebaseContext from './Firebase/withFirebaseContext';
import { withRouter } from "react-router";


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            userInfo: null
        }
        const { auth } = this.props
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    user: user.uid,
                }, this.getInfo(user))
            }
        });
        
    }
    getInfo = (user) => {
        const { firestore } = this.props; 
        const docRef = firestore.doc(`users/${user.uid}`);
        docRef.get().then((doc) => {
            if (doc.exists) {
                const userInfo = doc.data();
                this.setState({
                    userInfo,
                })
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });

    }

    logout = () => {
        const { auth } = this.props
        auth.signOut()
            .then(() => {
                this.setState({
                    user: null
                });
            });
        this.props.history.push("/");
    }

    render() {
        const { userInfo } = this.state;
        return (
            <div>
                {userInfo
                ? 
                <><p>Name:{userInfo.name}</p>
                <button onClick={this.logout}>Log Out</button>
                </>
                : <><p>Loading your info</p>
                <button onClick={this.logout}>Log Out</button>
                    </>
                }

            </div>
        );
    }
}

export default withRouter(withFirebaseContext(Profile));