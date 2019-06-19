import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Avatar from '@material-ui/core/Avatar';
import BottomNav from '../dashboard/BottomNav';
import withFirebaseContext from '../../Firebase/withFirebaseContext';

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

  redirect = (url) => {
    const { history } = this.props;
    history.push({
      pathname: url,
      state: { parcours: true },
    });
  }

  render() {
    const { userInfo, error } = this.state;
    return (
      <div>
        <ArrowBack
          style={{ position: 'fixed', left: '10px', top: '10px' }}
          onClick={() => {
            this.redirect('/mydashboard');
          }}
        />
        <h1>Mon compte</h1>
        {' '}
        {userInfo
          ? (
            <>
              <p>
                Hello
                {' '}
                {userInfo.name}
                {' '}
                !
              </p>

              <p>
                Email :
                {' '}
                {userInfo.email ? userInfo.email : 'Pas renseigné'}
              </p>

              <p>
                City :
                {' '}
                {userInfo.city ? userInfo.city : 'Pas renseigné'}
              </p>

              <p>
                A propos de moi :
                {' '}
                {userInfo.bio ? userInfo.bio : 'Pas renseigné'}
              </p>

              <Avatar
                alt="Profile Photo"
                src="/assets/github.png"
                className="avatar"
                style={{
                  margin: '140px',
                  width: '100px',
                  height: '100px',
                }}
              />

              <Button
                variant="outlined"
                name="changeprofile"
                onClick={() => {
                  this.redirect('/changeprofile');
                }}
                className="Button"
                style={{
                  margin: '30px 0 30px 0',
                  width: '300px',
                }}
              >
              Changer mes informations
              </Button>

              <Button
                size="large"
                type="button"
                color="primary"
                onClick={this.logout}
                variant="contained"
                style={{
                  margin: '30px 0 30px 0',
                  width: '300px',
                }}
                className="Button"
              >
                Log Out
              </Button>
              {error && <p>{error.message}</p>}
            </>
          )
          : (
            <>
              <p>Loading your info</p>
              <Button
                size="large"
                type="button"
                color="primary"
                onClick={this.logout}
                variant="contained"
                style={{ position: 'fixed center', marginTop: '8%', borderRadius: '20px' }}
                className="Button"
              >
                Log Out
              </Button>
            </>
          )
        }
        <BottomNav />
      </div>
    );
  }
}

export default withRouter(withFirebaseContext(Profile));
