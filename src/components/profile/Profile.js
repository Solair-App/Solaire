import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';
import LocationOn from '@material-ui/icons/LocationOn';
import AlternateEmail from '@material-ui/icons/AlternateEmail';
import FormatQuote from '@material-ui/icons/FormatQuote';
import BottomNav from '../dashboard/BottomNav';
import withFirebaseContext from '../../Firebase/withFirebaseContext';
import './profile.scss';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
      error: null,
    };
  }

  componentDidMount() {
    const { firestore } = this.props;
    let docRef;
    if (localStorage.getItem('userId')) {
      docRef = firestore.doc(`usersinfo/${localStorage.getItem('userId')}`);
      this.getInfo(docRef);
    } else {
      const { auth } = this.props;
      auth.onAuthStateChanged((user) => {
        if (user) {
          docRef = firestore.doc(`usersinfo/${user.uid}`);
          this.getInfo(docRef);
        }
      });
    }
  }

  getInfo = (docRef) => {
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

        {userInfo
          ? (
            <>
              <div className="fond">
                <ArrowBack
                  style={{
                    position: 'fixed', left: '10%', top: '2%', color: 'white',
                  }}
                  onClick={() => {
                    this.redirect('/mydashboard');
                  }}
                />
                <h1 className="titreprofil">Mon compte</h1>

                <p>

                  <img className="photo" alt="Profil img" src={userInfo.url ? userInfo.url : 'http://www.stleos.uq.edu.au/wp-content/uploads/2016/08/image-placeholder-350x350.png'} />

                </p>

                <p className="name">
                  {userInfo.name}
                </p>
              </div>


              <p className="infos">
                <AlternateEmail className="coloricon" />
                {' '}
                Email :
                {' '}
                {userInfo.email ? userInfo.email : 'Pas renseigné'}
              </p>

              <p className="infos">
                <LocationOn className="coloricon" />
                {' '}
                Ville :
                {' '}
                {userInfo.city ? userInfo.city : 'Pas renseigné'}
              </p>

              <p className="infos">
                <FormatQuote className="coloricon" />
                {' '}
                A propos de moi :
                {' '}
                {userInfo.bio ? userInfo.bio : 'Pas renseigné'}
              </p>

              <Button
                variant="outlined"
                name="changeprofile"
                onClick={() => {
                  this.redirect('/changeprofile');
                }}
                className="Button"
                style={{
                  margin: '30px 0 20px 0',
                  width: '300px',
                  backgroundColor: '#F0EDE5',
                  borderColor: '#AF9483',
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
