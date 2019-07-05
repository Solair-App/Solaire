import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';
import LocationOn from '@material-ui/icons/LocationOn';
import AlternateEmail from '@material-ui/icons/AlternateEmail';
import FormatQuote from '@material-ui/icons/FormatQuote';
import Fab from '@material-ui/core/Fab';
import SaveIcon from '@material-ui/icons/Save';
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
      <div style={{ paddingBottom: '70px' }}>

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

                <img className="photo" alt="Profil img" src={userInfo.url ? userInfo.url : 'http://www.stleos.uq.edu.au/wp-content/uploads/2016/08/image-placeholder-350x350.png'} />

                <p className="name">
                  {userInfo.name}
                </p>
              </div>
              <p className="infos">
                <AlternateEmail className="coloricon" />
                {' '}
                {userInfo.email ? userInfo.email : 'Pas renseigné'}
              </p>

              <p className="infos">
                <LocationOn className="coloricon" />
                {' '}
                {userInfo.city ? userInfo.city : 'Pas renseigné'}
              </p>

              <p className="infos">
                <FormatQuote className="coloricon" />
                {' '}
                {userInfo.bio ? userInfo.bio : 'Pas renseigné'}
              </p>
              <Fab
                variant="extended"
                size="medium"
                aria-label="Add"
                onClick={() => {
                  this.redirect('/changeprofile');
                }}
                style={{
                  marginTop: '16px',
                  marginRight: '10px',
                  marginBottom: '10px',
                  width: '300px',
                  color: 'white',
                  backgroundColor: '#138787',
                }}
              >
                <SaveIcon className="saveicon" />
          Changer mes informations
              </Fab>

              {userInfo.is_admin
              && (
              <Button
                variant="outlined"
                name="admin"
                onClick={() => {
                  this.redirect('/admin');
                }}
                className="Button"
                style={{
                  marginTop: '8px',
                  marginBottom: '8px',
                  width: '300px',
                }}
              >
                Modifier les catégories de l&apos;application
              </Button>
              )
              }

              <Fab
                variant="extended"
                size="medium"
                aria-label="Add"
                onClick={this.logout}
                style={{
                  marginTop: '10px',
                  marginLeft: '10px',
                  width: '300px',
                  color: 'white',
                  backgroundColor: '#E15920',
                }}
              >
          Deconnexion
              </Fab>
              {error && <p>{error.message}</p>}
            </>
          )
          : (
            <>
              <p>Loading your info</p>
              <Fab
                variant="extended"
                size="medium"
                aria-label="Add"
                onClick={this.logout}
                style={{
                  width: '300px',
                  color: 'white',
                  backgroundColor: '#E15920',
                }}
              >
          Deconnexion
              </Fab>
            </>
          )
        }
        <BottomNav />
      </div>
    );
  }
}

export default withRouter(withFirebaseContext(Profile));
