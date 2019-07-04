import React, { Component } from 'react';
import { withRouter } from 'react-router';
import withFirebaseContext from '../../Firebase/withFirebaseContext';
import Category from './Category';

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allParcours: [],
    };
    const { match } = this.props;
    this.category = match.params.category;
  }

  componentDidMount() {
    this.getCategoryParcours();
  }

  getCategoryParcours = () => {
    const { firestore } = this.props;

    const allParcours = [];

    firestore
      .collection('parcours')
      .where('thématique', '==', this.category)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          allParcours.push({ data: doc.data(), id: doc.id });
        });
        this.setState({
          allParcours,
        });
      });
  };

  render() {
    const { allParcours } = this.state;
    console.log(allParcours);
    return (
      <>
        <h1>{`Parcours ${this.category}`}</h1>
        <div className="parcours">
          <ul className="allParcours">
            {allParcours.length > 0 && allParcours.map(parcours => (
              <Category data={parcours} />
            ))}
          </ul>
        </div>
      </>
    );
  }
}

export default withRouter(withFirebaseContext(Categories));
