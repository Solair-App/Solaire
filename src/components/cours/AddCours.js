import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import * as firebase from 'firebase';
import Edit from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';
import ListCours from './ListCours';
import TypeCours from './TypeCours';


class AddCours extends Component {
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
  const parcours = db.collection('parcours').doc(localStorage.getItem('id'));
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
      <Link to="CreateParcours">
        <Button color="primary">
          <Edit />
Modifier les options
        </Button>

      </Link>
      <ListCours courseName={data} />

      <TypeCours />
      <Button
        fullWidth
        size="large"
        color="secondary"

        variant="contained"
        style={{position: 'fixed center', bottom: '2%', left: '0%', right: '0%', borderRadius: '20px'}}>
        Valider
      </Button>
    </div>
  );
}
}

export default AddCours;
