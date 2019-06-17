import React from 'react';
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import { mapDispatchToProps } from '../../../actions/action';
import { mapStateToProps } from '../../dashboard/Dashboard';
import UseTabs from './UseTabs';
import ListLessons from './ListLessons';
import BottomNav from '../../dashboard/BottomNav';

class MyLessons extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }


  componentDidMount() {
    this.getMarkers();
  }

  getMarkers() {
    const { state } = this.props;
    if (!state) {
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
          mapDispatchToProps(markers, 'userLessons');
        });
    }
  }

  render() {
    const { state } = this.props;
    return (
      <div>
        {' '}
        <UseTabs />
        { state ? state.parcours.map((x, i) => <ListLessons data={x} key={`${i + 1}a`} />) : <p>loading..</p>}
        <BottomNav />

      </div>
    );
  }
}

export default connect(mapStateToProps, { mapDispatchToProps })(MyLessons);
