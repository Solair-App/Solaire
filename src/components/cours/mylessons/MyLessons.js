import React from 'react';

import * as firebase from 'firebase';

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
    this.getUserLessons();
    this.setState({
      currentUser: localStorage.getItem('userId'),
    });
  }

  getUserLessons() {
    // eslint-disable-next-line no-shadow


    const markers = [];

    firebase
      .firestore()
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

  handleChange = (e, newValue) => {
    this.setState({
      currentValue: newValue,
    });
  };

  render() {
    const { currentUser, currentValue, userLessons } = this.state;
    return (
      <div>
        {' '}
        <UseTabs changeTabs={this.handleChange} currentValue={currentValue} />
        {userLessons ? (
          userLessons
            .filter(parcours => (currentValue === 0
              ? parcours.data.creator === currentUser
              : parcours.data.apprenants.includes(currentUser)
                  && parcours.data.creator !== currentUser))
            .map((x, i) => <ListLessons data={x} key={`${i + 1}a`} />)
        ) : (
          <p>loading..</p>
        )}
        <BottomNav />
      </div>
    );
  }
}

export default MyLessons;
