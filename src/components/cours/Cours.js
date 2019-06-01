import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import * as firebase from 'firebase';
import TypeCours from './TypeCours';
import withFirebaseContext from '../../Firebase/withFirebaseContext';

class Cours extends Component {
  constructor(props) {
    super(props);
    this.state = {

      data: {},
    };
  }

  componentDidMount() {
    this.getDataBaseData();
  }

getDataBaseData= () => {
  const db = firebase.firestore();
  const parcours = db.collection('parcours').doc('5');
  parcours
    .get()
    .then((doc) => {
      const parcoursData = doc.data();
      this.setState({
        data: parcoursData,
      });
    });
}

render() {
  const { data } = this.state;
  return (

    <div>
      <h1>{data.name}</h1>
      <TypeCours />
      <Button
        fullWidth
        size="large"
        color="secondary"

        variant="contained"
        style={{
          position: 'fixed', bottom: '0', left: '0', borderRadius: '20px',
        }}
      >
        Valider
      </Button>
    </div>
  );
}
}

export default withFirebaseContext(Cours);
