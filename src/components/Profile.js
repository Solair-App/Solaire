import React, { Component } from 'react';
import { withRouter } from 'react-router';
import withFirebaseContext from '../Firebase/withFirebaseContext';


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
      error: null,
    };
  }

  componentDidMount() {
    const { auth } = this.props;
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.getInfo(user);
      }
    });
  }

  getInfo = (user) => {
    const { firestore } = this.props;
    const docRef = firestore.doc(`usersinfo/${user.uid}`);
    docRef.get().then((doc) => {
      if (doc.exists) {
        const userInfo = doc.data();
        this.setState({
          userInfo,
        });
      }
    }).catch((error) => {
      this.setState({ error });
    });
  }

  logout = () => {
    const { auth } = this.props;
    const { history } = this.props;

    auth.signOut().then(() => {
      history.push('/signup');
    }, (error) => {
      console.log(error);
    });
  }

  render() {
    const { userInfo, error } = this.state;
    return (
      <div>
        {userInfo
          ? (
            <>
              <p>
                Name:
                {' '}
                {userInfo.name}
              </p>
              <button type="button" onClick={this.logout}>Log Out</button>
              {error && <p>{error.message}</p>}
            </>
          )
          : (
            <>
              <p>Loading your info</p>
              <button type="button" onClick={this.logout}>Log Out</button>
            </>
          )
        }

      </div>
    );
  }
}

export default withRouter(withFirebaseContext(Profile));
