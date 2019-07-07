import React, { Component } from 'react';
import { withRouter } from 'react-router';
import ArrowBack from '@material-ui/icons/ArrowBack';
import LocationOn from '@material-ui/icons/LocationOn';
import FormatQuote from '@material-ui/icons/FormatQuote';
import withFirebaseContext from '../../../Firebase/withFirebaseContext';
import '../../profile/profile.scss';
import ListLessons from '../../cours/mylessons/ListLessons';


class PublicProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
      userLessons: null,
    };
    const { match } = this.props;
    this.user = match.params.userId;
  }

  componentDidMount() {
    const { firestore } = this.props;
    const docRef = firestore.doc(`usersinfo/${this.user}`);
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
        console.log(error);
      });
    this.getUserLessons();
  }

  getUserLessons = () => {
    // eslint-disable-next-line no-shadow
    const { firestore } = this.props;

    const markers = [];
    firestore
      .collection('parcours')
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          markers.push({ data: doc.data(), id: doc.id });
        });
        this.setState({
          userLessons: markers,
        });
      });
  }


  render() {
    const { userInfo, userLessons } = this.state;
    const { history } = this.props;

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
                  history.goBack();
                }}
              />
              <h1 className="titreprofil">
                Profil de
                {' '}
                {userInfo.name}
              </h1>
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
            </div>

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
          </>
        ) : (
          <>
            <p>
              <img className="loadingType" src="https://i.ibb.co/TMTd967/Logo-solair.png" alt="loading" />
            </p>
          </>
        )}
        <div>
          {userLessons && <h2 className="otherParcours">Ses autres parcours</h2>}
          {userLessons ? (
            userLessons
              .filter(parcours => parcours.data.creator === this.user)
              .map((x, i) => <ListLessons data={x} key={`${i + 1}b`} />)
          ) : (
            null
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(withFirebaseContext(PublicProfile));
