import React, { Component } from 'react';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import List from './List';
import BottomNav from './BottomNav';
import InputBar from './InputBar';
import { mapDispatchToProps } from '../../actions/action';
import withFirebaseContext from '../../Firebase/withFirebaseContext';


export const mapStateToProps = state => ({
  state,
});

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchField: '',
      filter: '',
      currentValue: 'Tout',
      parcours: [],
    };
  }

  componentDidMount() {
    this.getMarkers();
    this.getCategoryFromDB();
    let docRef;
    if (localStorage.getItem('userId')) {
      docRef = firebase
        .firestore().doc(`usersinfo/${localStorage.getItem('userId')}`);
      this.sendUserInfo(docRef);
    } else {
      const { auth } = this.props;
      auth.onAuthStateChanged((user) => {
        if (user) {
          docRef = firebase
            .firestore().doc(`usersinfo/${user.uid}`);
          localStorage.setItem('userId', user.uid);
          this.sendUserInfo(docRef);
        }
      });
    }
    // eslint-disable-next-line no-shadow
    const { mapDispatchToProps } = this.props;
    mapDispatchToProps(0, 'bottomNav');
  }

  getMarkers() {
    // eslint-disable-next-line no-shadow

    const markers = [];

    firebase
      .firestore()
      .collection('parcours')
      .where('isReadable', '==', true)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          markers.push({ data: doc.data(), id: doc.id });
        });
        this.setState({
          parcours: markers,
        });
      });
  }

  sendUserInfo = (docRef) => {
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const userInfo = doc.data();
          localStorage.setItem('userName', userInfo.name);
          mapDispatchToProps(userInfo, 'profile');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }


  handleChange = (e) => {
    const { history } = this.props;
    if (e.target.value === 'Tout') {
      this.setState({
        filter: '',
        currentValue: 'Tout',
      });
    } else if (e.target.name === 'filter') {
      history.push(`/category/${e.target.value}`);
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  };

  sortIntoCategory = () => {
    const { parcours } = this.state;
    const { state } = this.props;
    const sortedCourse = {};
    let sort = [];

    for (let i = 0; i < state.thématique.length; i += 1) {
      for (let b = 0; b < parcours.length; b += 1) {
        if (parcours[b].data.thématique === state.thématique[i]) {
          sort.push(parcours[b]);
        }
      }

      sortedCourse[state.thématique[i]] = sort;
      sort = [];
    }
    return sortedCourse;
  };

  getCategoryFromDB = () => {
    const { state } = this.props;
    if (!state || !state.thématique) {
      let category = [];
      const forLoop = ['thématique', 'difficulté', 'durée', 'langue'];
      // eslint-disable-next-line no-shadow
      const { mapDispatchToProps } = this.props;
      const firestore = firebase.firestore();
      const db = firestore;
      for (let i = 0; i < forLoop.length; i += 1) {
        const themRef = db.collection('category').doc(forLoop[i]);
        // eslint-disable-next-line no-loop-func
        themRef.get().then((document) => {
          const dbCategory = document.data();

          // eslint-disable-next-line no-restricted-syntax
          for (const [, value] of Object.entries(dbCategory)) {
            category.push(`${value}`);
          }
          mapDispatchToProps(category, 'category', forLoop[i]);
          category = [];
        });
      }
    }
  };

  render() {
    const { state } = this.props;

    const {
      searchField, filter, currentValue, parcours,
    } = this.state;

    return (
      <div style={{
        display: 'block', textAlign: 'left', paddingBottom: 110,
      }}
      >
        {parcours && state && state.thématique ? (
          <div>
            <InputBar
              handleChange={this.handleChange}
              currentFilterValue={currentValue}
              currentValue={searchField}
            />
            <div style={{ position: 'relative', top: 50 }}>
              <div style={{ textAlign: 'center' }}>
                <img className="banner" alt="test" src="https://i.ibb.co/Dpn9ZK0/pattern-solair.png" style={{ marginBottom: -5 }} />
              </div>
              {Object.entries(this.sortIntoCategory())
                .filter(
                  result => result[0].includes(filter)
                  && result[1].filter(res => res.data.tags.includes(searchField))
                    .length > 0,
                )
                .map((results, index) => (
                  <div className="bloc" key={`${index + 200}q`}>
                    {results[1].length > 0 ? (
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h1 style={{ fontSize: 19, marginBottom: -3, marginLeft: 5 }}>
                          {results[0]}
                        </h1>
                        <Link style={{ textDecoration: 'none' }} to={`/category/${results[0]}`}>
                          <p style={{
                            color: '#E15920', paddingRight: '14px', paddingTop: '17px', fontWeight: 'normal', fontSize: 14,
                          }}
                          >
                            PLUS
                          </p>
                        </Link>
                      </div>
                    ) : null}
                    <List data={results[1]} searchField={searchField} />
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <p style={{
            position: 'absolute', height: '85%', width: '100%', top: 50, left: 0, display: 'flex', justifyContent: 'center', alignItems: 'center',
          }}
          >
            <img className="loadingTypeHome" src="https://i.ibb.co/TMTd967/Logo-solair.png" alt="loading" />

          </p>
        )}
        <BottomNav />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { mapDispatchToProps },
)(withRouter(withFirebaseContext(Dashboard)));
