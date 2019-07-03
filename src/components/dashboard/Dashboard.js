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
              .filter(result => result[0].includes(filter))
              .map((results, index) => (
                <div key={`${index + 200}q`}>
                  {' '}
                  <h1
                    style={{
                      fontSize: 19,
                      marginLeft: 5,
                      color: '#4C4C4C',
                      fontWeight: '500',
                    }}
                  >
                    {results[0]}
                    {' '}
                  </h1>
                  <List data={parcours} searchField={searchField} />
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
