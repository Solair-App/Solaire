import React from 'react';
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import { Link } from 'react-router-dom';
import { mapDispatchToProps } from '../../../actions/action';
import UseTabs from './UseTabs';
// eslint-disable-next-line import/no-named-as-default
import ListLessons from './ListLessons';
import BottomNav from '../../dashboard/BottomNav';
import '../../../SCSS/MyLessons.scss';

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

    // eslint-disable-next-line no-shadow
    const { mapDispatchToProps } = this.props;

    mapDispatchToProps(2, 'bottomNav');
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
        <div className="mylessons">
          {userLessons ? (
            userLessons
              .filter(parcours => (currentValue === 0
                ? parcours.data.creator === currentUser
                : parcours.data.apprenants.includes(currentUser)
                  && parcours.data.creator !== currentUser))
              .map((x, i) => (
                <Link style={{ textDecoration: 'none' }} to={{ pathname: `/parcours/${x.data.id}` }}>
                  {' '}
                  <ListLessons data={x} key={`${i + 1}a`} />
                  {' '}
                </Link>
              ))
          ) : (
            <p style={{
              position: 'absolute', height: '85%', width: '100%', top: 50, left: 0, display: 'flex', justifyContent: 'center', alignItems: 'center',
            }}
            >
              <img className="loadingTypeHome" src="https://i.ibb.co/TMTd967/Logo-solair.png" alt="loading" />
            </p>
          )}
        </div>
        <BottomNav />
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  state,
});
export default connect(mapStateToProps, { mapDispatchToProps })(MyLessons);
