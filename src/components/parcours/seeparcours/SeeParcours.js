import React, { Component } from 'react';
import RadioButtonUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import LockOpen from '@material-ui/icons/LockOpen';
import DeleteIcon from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import Rating from 'material-ui-rating';
import withFirebaseContext from '../../../Firebase/withFirebaseContext';
import { mapDispatchToProps } from '../../../actions/action';

const mapStateToProps = state => ({
  state,
});

class seeParcours extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parcours: [],
      canVote: true,

    };
  }

  componentDidMount() {
    const { location, state } = this.props;

    if (location.state && location.state.parcoursId) {
      localStorage.setItem('parcoursId', location.state.parcoursId);
      this.getInfo();
    } else {
      this.getInfo();
    }
    this.parcours = null;
    if (localStorage.getItem('canVote') === true && !localStorage.getItem('canVote')) {
      this.setState({
        canVote: true,
      });
    } else {
      this.setState({
        canVote: false,
      });
    }
    if (state && state.parcours) {
      const currentParcours = state.parcours.filter(
        parc => parc.id === localStorage.getItem('parcoursId'),
      );
      this.setState({ parcours: currentParcours[0].data });
    } else {
      const { firestore } = this.props;
      const docRef = firestore
        .collection('parcours')
        .doc(localStorage.getItem('parcoursId'));
      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            this.setState({ parcours: doc.data() });
          } else {
            // doc.data() will be undefined in this case
            console.log('No such document!');
          }
        })
        .catch((error) => {
          console.log('Error getting document:', error);
        });
    }
  }

  sendRatings = (rating) => {
    const { parcours } = this.state;


    let determineRating = parcours.rating
        * parcours.votants.length;

    determineRating += rating;
    const newRating = determineRating / parcours.votants.length + 1;


    firebase
      .firestore()
      .collection('parcours')
      .doc(localStorage.getItem('parcoursId'))
      .update({
        rating: newRating,
        votants: firebase.firestore.FieldValue.arrayUnion(
          localStorage.getItem('userId'),
        ),
      });
    localStorage.setItem('canVote', false);
  };

  getInfo = () => {
    const { state } = this.props;
    if (
      (state && !state.cours)
      || !state
      || (state && state.cours[0].id !== localStorage.getItem('parcoursId'))
    ) {
      // eslint-disable-next-line no-shadow
      const { firestore, mapDispatchToProps } = this.props;
      const cours = [];
      firebase
        .firestore()
        .collection('parcours')
        .doc(localStorage.getItem('parcoursId'))
        .update({
          apprenants: firebase.firestore.FieldValue.arrayUnion(
            localStorage.getItem('userid'),
          ),
        });

      firestore
        .collection('parcours')
        .doc(localStorage.getItem('parcoursId'))
        .collection('cours')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            cours.push({ id: doc.id, data: doc.data() });
          });
          const currentParcours = [
            { id: localStorage.getItem('parcoursId'), content: cours },
          ];
          mapDispatchToProps(currentParcours, 'cours');
        });
    }
  };

  goToCourse = (type, data, id) => {
    const { history } = this.props;
    localStorage.setItem('coursId', id);
    history.push({
      pathname: `/${type}`,
      state: { data },
    });
  };

  // name et type de cours à mettre dans slide, vidéo et quizz

  render() {
    const { state } = this.props;
    const { parcours } = this.state;


    return (
      <div>


        <h1>
          {parcours && parcours.name}
          {' '}
          {parcours && parcours.creator === localStorage.getItem('userid') ? (
            <>
              {' '}
              <Rating
                value={parcours.rating}
                max={5}

                onChange={value => this.sendRatings(value)}
              />

              <Edit />
              <DeleteIcon />
            </>
          ) : (
            undefined
          )}
        </h1>
        <p>{parcours && parcours.description}</p>

        {state
          && state.cours
          && state.cours[0].content.map((cours, index) => (
            <div key={`${index + 1}k`}>
              <p
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <RadioButtonUnchecked />
                <img
                  src={`./assets/${cours.data.type}.png`}
                  style={{ width: '4em' }}
                  alt={cours.data.type}
                />
                <button
                  type="button"
                  onClick={() => this.goToCourse(cours.data.type, cours.data, cours.id)
                  }
                >
                  {cours.data.name}
                </button>
              </p>
              <p>{cours.data.description}</p>
              <div>
                <ArrowDownward />
              </div>
              <div>
                <LockOpen />
                <div>
                  <ArrowDownward />
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { mapDispatchToProps },
)(withFirebaseContext(seeParcours));
