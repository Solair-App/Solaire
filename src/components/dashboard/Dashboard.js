import React, { Component } from 'react';
import * as firebase from 'firebase';
import { connect } from 'react-redux';

import List from './List';
import BottomNav from './BottomNav';
import InputBar from './InputBar';
import { mapDispatchToProps } from '../../actions/action';

export const mapStateToProps = state => ({
  state,
});

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchField: '',
      filter: '',
      currentValue: 'All',
      parcours: [],
    };
  }

  componentDidMount() {
    this.getMarkers();
    this.getCategoryFromDB();
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

  handleChange = (e) => {
    if (e.target.value === 'All') {
      this.setState({
        filter: '',
        currentValue: 'All',
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
    if (e.target.value !== 'All' && e.target.name === 'filter') {
      this.setState({
        currentValue: e.target.value,
        filter: e.target.value,
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
      <div style={{ display: 'block', textAlign: 'left', marginBottom: 120 }}>
        {parcours && state && state.thématique ? (
          <div>
            <InputBar
              handleChange={this.handleChange}
              currentFilterValue={currentValue}
              currentValue={searchField}
            />
            {Object.entries(this.sortIntoCategory())
              .filter(result => result[0].includes(filter) && result[1].filter(res => res.data.tags.includes(searchField)).length > 0)
              .map((results, index) => (
                <div key={`${index + 200}q`}>
                  {' '}
                  {results[1].length > 0 ? (
                    <h1
                      style={{
                        fontSize: 19,
                        marginLeft: 5,
                        color: '#4C4C4C',
                        fontWeight: '500',
                      }}
                    >
                      {' '}
                      {results[0]}
                      {' '}
                    </h1>
                  ) : null}
                  {' '}
                  <List data={results[1]} searchField={searchField} />
                  {' '}
                </div>
              ))}
          </div>
        ) : (
          <p>loading.. </p>
        )}
        <BottomNav />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { mapDispatchToProps },
)(Dashboard);
