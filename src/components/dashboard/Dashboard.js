import React, { Component } from 'react';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import List from './List';
import useDashButton from './DashButton';
import BottomNav from './BottomNav';

import { handleParcours } from '../../actions/action';

const mapStateToProps = state => ({
  state,
});


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    this.getMarkers();
  }

  getMarkers() {
    // eslint-disable-next-line no-shadow
    const { state, handleParcours } = this.props;

    const markers = [];
    if (state === undefined) {
      firebase.firestore().collection('parcours').get()
        .then((querySnapshot) => {
          querySnapshot.docs.forEach((doc) => {
            markers.push(doc.data());
          });

          handleParcours(markers);
        });
    }
  }


  render() {
    const { state } = this.props;
    return (

      <div style={{ display: 'block', textAlign: 'left' }}>

        {' '}

        { state ? <List data={state} /> : <p>loading.. </p> }


        <useDashButton />

        <BottomNav />
      </div>
    );
  }
}

export default connect(mapStateToProps, { handleParcours })(Dashboard);
