import React, { Component } from 'react';
import withFirebaseContext from './Firebase/withFirebaseContext';
import { Link } from 'react-router-dom';


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            user: null,
         }
    }
    componentDidMount() {
        const { auth } = this.props
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user });
            }
        });
    }
    render() { 
        const { user } = this.state;
        return ( 
            <div>
                 {user
                    ? <>
                    <p>Welcome to your app {user.displayName}!</p>
                    <p><Link to="/profile">My profile</Link></p>
                    </>
                    : <p>Please sign in</p>
                }
                
            </div>
         );
    }
}
 
export default withFirebaseContext(Dashboard);