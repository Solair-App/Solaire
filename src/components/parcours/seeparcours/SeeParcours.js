import React, { Component } from 'react';
import RadioButtonUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import LockOpen from '@material-ui/icons/LockOpen';
import withFirebaseContext from '../../../Firebase/withFirebaseContext';


class seeParcours extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allCourses: [],
    };
    this.getInfo();
  }

  getInfo = () => {
    const { firestore } = this.props;
    const cours = [];
    firestore.collection('parcours').doc(localStorage.getItem('id')).collection('cours').get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          cours.push({ id: doc.id, data: doc.data() });
          // doc.data() is never undefined for query doc snapshots
          this.setState({ allCourses: cours }, console.log(this.state.allCourses));
        });
      });
  }

  // name et type de cours à mettre dans slide, vidéo et quizz

  render() {
    const { allCourses } = this.state;
    return (
      <div>
        {allCourses.map(cours => (
          <>
            <p>
              <RadioButtonUnchecked />
              {cours.id}
              {' '}
            </p>
            <div>
              <ArrowDownward />
            </div>
            <div>
              <LockOpen />
              <div>
                <ArrowDownward />
              </div>
            </div>
          </>
        ))}
      </div>
    );
  }
}

export default withFirebaseContext(seeParcours);
