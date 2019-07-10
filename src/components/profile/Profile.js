import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Button from '@material-ui/core/Button';
import LocationOn from '@material-ui/icons/LocationOn';
import AlternateEmail from '@material-ui/icons/AlternateEmail';
import FormatQuote from '@material-ui/icons/FormatQuote';
import Fab from '@material-ui/core/Fab';
import { connect } from 'react-redux';
import Edit from '@material-ui/icons/Edit';
import BottomNav from '../dashboard/BottomNav';
import withFirebaseContext from '../../Firebase/withFirebaseContext';
import './profile.scss';
import { mapDispatchToProps } from '../../actions/action';

export const mapStateToProps = state => ({
  state,
});

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
      error: null,
    };
  }

  componentDidMount() {
    const { firestore, state } = this.props;
    let docRef;
    if (!state || !state.profile) {
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
    } else {
      this.setState({ userInfo: state.profile });
    }
    // eslint-disable-next-line no-shadow
    const { mapDispatchToProps } = this.props;

    mapDispatchToProps(3, 'bottomNav');
  }

  getInfo = (docRef) => {
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const userInfo = doc.data();
          this.setState({
            userInfo,
          });
        }
      })
      .catch((error) => {
        this.setState({ error });
      });
  };

  logout = () => {
    const { auth } = this.props;
    const { history } = this.props;

    auth.signOut().then(
      () => {
        history.push('/signup');
      },
      (error) => {
        console.log(error);
      },
    );
  };

  redirect = (url) => {
    const { history } = this.props;
    history.push({
      pathname: url,
      state: { parcours: true },
    });
  };

  render() {
    const { userInfo, error } = this.state;

    return (
      <div style={{ paddingBottom: '70px' }}>
        {userInfo ? (
          <>
            <div className="fond">
              <ArrowBack
                style={{
                  position: 'fixed',
                  left: '10%',
                  top: '2%',
                  color: 'white',
                }}
                onClick={() => {
                  this.redirect('/mydashboard');
                }}
              />
              <div style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
              >
                <h1 className="titreprofil">Mon compte</h1>
                <Edit
                  style={{ color: 'white' }}
                  onClick={() => {
                    this.redirect('/changeprofile');
                  }}
                />
              </div>
              <p>
                <img
                  className="photo"
                  alt="Profil img"
                  src={
                    userInfo.url
                      ? userInfo.url
                      : 'http://www.stleos.uq.edu.au/wp-content/uploads/2016/08/image-placeholder-350x350.png'
                  }
                />
              </p>

              <p className="name">{userInfo.name}</p>
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

<<<<<<< HEAD
=======
            <Fab
              variant="extended"
              size="medium"
              aria-label="Add"
              onClick={() => {
                this.redirect('/changeprofile');
              }}
              style={{
                width: '300px',
                color: 'white',
                marginTop: '10px',
                marginBottom: '10px',
                backgroundColor: '#138787',
              }}
            >
              <SaveIcon className="saveicon" />
              Changer mes informations
            </Fab>

>>>>>>> dev
            {userInfo.is_admin && (
              <Button
                variant="outlined"
                name="admin"
                onClick={() => {
                  this.redirect('/admin');
                }}
                className="Button"
                style={{
                  width: '300px',
                  marginBottom: '10px',
                  marginLeft: '10px',
                  marginRight: '10px',
                }}
              >
                Modifier les catégories de l&apos;application
              </Button>
            )}

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

            {error && <p>{error.message}</p>}
          </>
        ) : (
          <>
            <p>
              <img className="loadingType" src="https://i.ibb.co/TMTd967/Logo-solair.png" alt="loading" />
            </p>
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
        )}
        <BottomNav />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { mapDispatchToProps },
)(withRouter(withFirebaseContext(Profile)));
