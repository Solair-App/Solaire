import React, { Component } from 'react';
import RadioButtonUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import LockOpen from '@material-ui/icons/LockOpen';
import { Link } from 'react-router-dom';
import withFirebaseContext from '../../../Firebase/withFirebaseContext';
import Commentaires from './Commentaires';


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
          this.setState({ allCourses: cours });
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
            <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <RadioButtonUnchecked />
              <img src={`./assets/${cours.data.type}.png`} style={{ width: '4em' }} alt={cours.data.type} />
              <Link to={{ pathname: `/${cours.data.type}`, state: { id: cours.id } }}>
                {cours.data.name}
              </Link>
            </p>
            <p>
              {cours.data.description}
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
        <Commentaires />
      </div>
    );
  }
}

export default withFirebaseContext(seeParcours);
