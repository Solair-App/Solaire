import React, { Component } from 'react';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import List from './List';
import BottomNav from './BottomNav';
import InputBar from './InputBar';
import { mapDispatchToProps } from '../../actions/action';

const mapStateToProps = state => ({
  state,
});

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchField: '',
      filter: '',
      currentValue: 'All',
    };
  }

  componentDidMount() {
    this.getMarkers();
    this.getCategoryFromDB();
  }

  getMarkers() {
    // eslint-disable-next-line no-shadow
    const { mapDispatchToProps } = this.props;

    const markers = [];

    firebase
      .firestore()
      .collection('parcours')
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          markers.push({ data: doc.data(), id: doc.id });
        });
        mapDispatchToProps(markers, 'parcours');
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
    } if (e.target.value !== 'All' && e.target.name === 'filter') {
      this.setState({

        currentValue: e.target.value,
        filter: e.target.value,
      });
    }
  }


  getCategoryFromDB = () => {
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
  };

  render() {
    const { state } = this.props;

    const { searchField, filter, currentValue } = this.state;
    return (
      <div key="qsdqsd" style={{ display: 'block', textAlign: 'left' }}>
        {' '}
        {state && state.thématique ? (
          <div>
            <InputBar
              handleChange={this.handleChange}
              currentFilterValue={currentValue}
              currentValue={searchField}

            />
            {state.thématique.filter(result => result.includes(filter)).map((results, index) => (
              <>
                {' '}
                <h1 key={`${index + 1}b `}>
                  {results}
                  {' '}

                </h1>
                <List
                  key={`${index + 1}a`}
                  data={state.parcours}
                  thématique={results}
                  currentSearch={searchField}
                />
                {' '}
              </>
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
