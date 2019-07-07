import React, { Component } from 'react';
import { withRouter } from 'react-router';
import withFirebaseContext from '../Firebase/withFirebaseContext';


class Welcome extends Component {
  componentDidMount() {
    const { auth } = this.props;
    auth.onAuthStateChanged((user) => {
      if (user) {
        const { history } = this.props;
        localStorage.setItem('userId', user.uid);
        history.push('/mydashboard');
      } else {
        const { history } = this.props;
        history.push('/signup');
      }
    });
  }

  render() {
    return (
      <div className="home" style={{ color: 'black' }}>
        <img className="loadingType" src="https://i.ibb.co/TMTd967/Logo-solair.png" alt="loading" />
      </div>
    );
  }
}

export default withRouter(withFirebaseContext(Welcome));
