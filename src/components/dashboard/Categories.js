import React, { Component } from 'react';
import { withRouter } from 'react-router';
import ArrowBack from '@material-ui/icons/ArrowBack';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import withFirebaseContext from '../../Firebase/withFirebaseContext';
import Category from './Category';


class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allParcours: [],
      searchField: '',
    };
    const { match } = this.props;
    this.category = match.params.category;
  }

  componentDidMount() {
    this.getCategoryParcours();
  }

  handleChange = (e) => {
    this.setState({
      searchField: e.target.value,
    });
  };

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
    const { allParcours, searchField } = this.state;
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
          <div className="Categories">
            <h1>{`Parcours ${this.category}`}</h1>
            <div style={{ display: 'flex', marginLeft: 4, justifyContent: 'center' }}>
              <SearchIcon style={{ marginRight: '5px' }} />
              <TextField
                className="searchCategory"
                name="searchField"
                onChange={this.handleChange}
                placeholder="Rechercher..."
                value={searchField}
              />
            </div>
          </div>
        </div>
        <div className="parcours" style={{ paddingBottom: '60px' }}>
          <ul className="allParcours">
            {allParcours.length > 0 && allParcours.filter(
              res => res.data.tags.includes(searchField),
            ).map(parcours => (
              <Category data={parcours} />
            ))}
          </ul>
        </div>
      </>
    );
  }
}

export default withRouter(withFirebaseContext(Categories));
