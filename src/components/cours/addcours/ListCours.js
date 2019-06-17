import React, { Component } from 'react';
import RadioButtonUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import LockOpen from '@material-ui/icons/LockOpen';
import { Link } from 'react-router-dom';
import withFirebaseContext from '../../../Firebase/withFirebaseContext';

class ListCours extends Component {
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
    const idParcours = localStorage.getItem('id');
    localStorage.setItem('parcoursId', idParcours);
    firestore.collection('parcours').doc(localStorage.getItem('id')).collection('cours').get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          cours.push({ id: doc.id, data: doc.data() });
          // doc.data() is never undefined for query doc snapshots
          this.setState({ allCourses: cours });
        });
      });
  }

  render() {
    const { allCourses } = this.state;
    return (
      <div>
        {allCourses && allCourses.map(cours => (
          <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <RadioButtonUnchecked />
              <img src={`./assets/${cours.data.type}.png`} style={{ width: '4em' }} alt={cours.data.type} />
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start',
              }}
              >
                <Link to={{ pathname: `/${cours.data.type}`, state: { id: cours.id } }}>
                  {cours.data.name}
                </Link>
                <p>
                  {cours.data.description}
                </p>
              </div>
            </div>
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

        <p style={{ marginTop: '10px' }}>
          <RadioButtonUnchecked style={{ marginRight: '10px' }} />
          Certification
        </p>
      </div>
    );
  }
}

export default withFirebaseContext(ListCours);
