import React, { Component } from 'react';
import RadioButtonUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import LockOpen from '@material-ui/icons/LockOpen';
import DeleteIcon from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import Rating from 'material-ui-rating';
import { Link } from 'react-router-dom';
import SimpleModal from './SimpleModal';
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
      open: false,
    };
    const { match } = this.props;
    this.parcours = match.params.parcoursId;
  }

  componentDidMount() {
    const { state } = this.props;
    this.getInfo();


    if (
      localStorage.getItem(`canVote${this.parcours}`)
        === true
      || !localStorage.getItem(`canVote${this.parcours}`)
    ) {
      this.setState({
        canVote: true,
      });
    } else {
      this.setState({
        canVote: false,
      });
    }

    if (state && state.parcours) {
      const currentParcours = state.parcours.filter(parc => parc.id === this.parcours);
      this.setState({ parcours: currentParcours[0].data });
    } else {
      const { firestore } = this.props;
      const docRef = firestore.collection('parcours').doc(this.parcours);
      docRef.get().then((doc) => {
        if (doc.exists) {
          this.setState({ parcours: doc.data() });
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      }).then(this.haveUserAlreadyVoted())
        .catch((error) => {
          console.log('Error getting document:', error);
        });
    }
  }

  sendRatings = (rating) => {
    const { parcours } = this.state;
    let determineRating;
    if (parcours.votants.length === 0) {
      determineRating = rating;
    } else {
      determineRating = parcours.rating * parcours.votants.length;

      determineRating += rating;

      determineRating /= (parcours.votants.length + 1);
    }

    const newRating = determineRating;
    this.setState({
      rating: determineRating,
    });

    firebase
      .firestore()
      .collection('parcours')
      .doc(this.parcours)
      .update({
        rating: newRating,
        votants: firebase.firestore.FieldValue.arrayUnion(
          localStorage.getItem('userId'),
        ),
      });
    localStorage.setItem(`canVote${this.parcours}`, false);
    this.setState({
      canVote: false,
    });
  };

  getInfo = () => {
    // eslint-disable-next-line no-shadow
    const { firestore, mapDispatchToProps } = this.props;
    const cours = [];
    firebase.firestore().collection('parcours').doc(this.parcours).update({
      apprenants: firebase.firestore.FieldValue.arrayUnion(localStorage.getItem('userid')),
    });

    firestore.collection('parcours').doc(this.parcours).collection('cours').get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          cours.push({ id: doc.id, data: doc.data() });
        });
        const currentParcours = [{ id: this.parcours, content: cours }];
        mapDispatchToProps(currentParcours, 'cours');
      });
  }

  goToCourse = (type, data, id) => {
    const { history } = this.props;
    localStorage.setItem('coursData', JSON.stringify(data));
    console.log(id);
    history.push({
      pathname: `/parcours/${this.parcours}/${type}/${id}`,
      state: { data },
    });
  };

  delete = () => {
    const { firestore, history } = this.props;
    firestore.collection('parcours').doc(this.parcours).delete().then(() => {
      console.log('Document successfully deleted!');
    })
      .catch((error) => {
        console.error('Error removing document: ', error);
      });
    history.push({
      pathname: '/mydashboard',
      state: { coursDelete: true },
    });
  }

  togleModal = () => {
    const { open } = this.state;
    this.setState({ open: !open });
  }

  haveUserAlreadyVoted = () => {
    const { parcours } = this.state;
    if (parcours.votants && parcours.votants.includes(localStorage.getItem('userid'))) {
      this.setState({
        canVote: false,
      });
    }
  }

  // name et type de cours à mettre dans slide, vidéo et quizz
  canUserRate = () => {
    const { parcours, canVote, rating } = this.state;

    if (canVote === true) {
      return (
        <Rating
          value={parcours.rating}
          max={5}
          onChange={value => this.sendRatings(value)}
        />
      );
    }
    return (
      <Rating
        value={rating || parcours.rating}
        max={5}
        readOnly

      />
    );
  };

  render() {
    const { state } = this.props;
    const { parcours, open } = this.state;
    return (
      <div>
        <SimpleModal open={open} togle={this.togleModal} deleted={this.delete} />
        <h1>
          {parcours && parcours.name}
          {' '}
          {parcours && parcours.creator === localStorage.getItem('userid')
            ? (
              <>
                <Link to={`/createparcours/${this.parcours}/addcours`}><Edit /></Link>
                <DeleteIcon onClick={this.togleModal} />
              </>
            )
            : undefined
          }
        </h1>
        <p>{parcours && parcours.description}</p>
        {this.canUserRate()}
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
                  {' '}

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
