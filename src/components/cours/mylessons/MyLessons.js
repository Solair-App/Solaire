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
    this.state = {
      currentUser: '',
      currentValue: 0,
    };
  }


  componentDidMount() {
    this.getMarkers();
    this.setState({
      currentUser: localStorage.getItem('userid'),
    });
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
        mapDispatchToProps(markers, 'userLessons');
      });
  }

  handleChange = (e, newValue) => {
    this.setState({

      currentValue: newValue,
    });
  }

  render() {
    const { state } = this.props;
    const { currentUser, currentValue } = this.state;
    return (
      <div>
        {' '}
        <UseTabs changeTabs={this.handleChange} currentValue={currentValue} />
        { state ? state.parcours.filter(parcours => (currentValue === 0 ? parcours.data.creator === currentUser : Object.entries(parcours.data.apprenants).map(x => x.includes(currentUser)))).map((x, i) => <ListLessons data={x} key={`${i + 1}a`} />) : <p>loading..</p>}
        <BottomNav />

      </div>
    );
  }
}

export default connect(mapStateToProps, { mapDispatchToProps })(MyLessons);
