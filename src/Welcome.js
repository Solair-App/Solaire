import React, { Component } from 'react';
import withFirebaseContext from './Firebase/withFirebaseContext';
import { withRouter } from "react-router";



class Welcome extends Component {
   
    componentDidMount() {
        const { auth } = this.props
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.props.history.push("/dashboard");
            }else{
                this.props.history.push("/signup");
            }
        });
    }

    render() {

        return (
            <div className="home" style={{ color: 'black' }}>
               <p>Loading the app...</p>
            </div>
        );
    }
}

export default withRouter(withFirebaseContext(Welcome));