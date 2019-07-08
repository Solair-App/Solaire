import React, { Component } from 'react';
import { withRouter } from 'react-router';
import ArrowBack from '@material-ui/icons/ArrowBack';
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
    const { history } = this.props;
    return (
      <>
        <div className="parcoursFond">
          <ArrowBack
            style={{ position: 'fixed', left: '10px', top: '10px' }}
            onClick={() => {
              history.push('/mydashboard');
            }}
          />
          <h1>{`Parcours ${this.category}`}</h1>
        </div>
        <div className="parcours" style={{ paddingBottom: '60px' }}>
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
