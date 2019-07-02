import React, { Component } from 'react';
import RadioButtonUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonChecked from '@material-ui/icons/RadioButtonChecked';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ArrowBack from '@material-ui/icons/ArrowBack';
import LockOpen from '@material-ui/icons/LockOpen';
import DeleteIcon from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import Rating from 'material-ui-rating';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import SimpleModal from '../../SimpleModal';
import withFirebaseContext from '../../../Firebase/withFirebaseContext';
import PostCommentaires from './PostCommentaires';
import ViewCommentaires from './ViewCommentaires';
import { mapDispatchToProps } from '../../../actions/action';

const mapStateToProps = state => ({
  state,
});

class seeParcours extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parcours: [],
      userInfo: {},
      canVote: true,
      open: false,
      commentaire: { pseudo: '', commentaire: 'qsd' },
      loaded: 0,
    };
    const { match } = this.props;
    this.parcours = match.params.parcoursId;
  }

  componentDidMount() {
    const { firestore } = this.props;
    this.getInfo();

    let userRef;
    if (localStorage.getItem('userId')) {
      userRef = firestore.doc(`usersinfo/${localStorage.getItem('userId')}`);
      this.getUserInfo(userRef);
    } else {
      const { auth } = this.props;
      auth.onAuthStateChanged((user) => {
        if (user) {
          userRef = firestore.doc(`usersinfo/${user.uid}`);
          this.getUserInfo(userRef);
        }
      });
    }
    if (
      localStorage.getItem(`canVote${this.parcours}`) === true
      || !localStorage.getItem(`canVote${this.parcours}`)
    ) {
      this.setState({
        canVote: true,
      });
    }
    if (localStorage.getItem(`canVote${this.parcours}` === false)) {
      this.setState({
        canVote: false,
      });
    }
    this.getParcours();
  }

  getParcours = () => {
    const { firestore } = this.props; console.log('hello');
    const docRef = firestore.collection('parcours').doc(this.parcours);
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          this.setState({ parcours: doc.data(), loaded: 1 }, console.log(doc.data()));
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  }

  getUserInfo = (userRef) => {
    userRef.get().then((doc) => {
      if (doc.exists) {
        const userInfo = doc.data();
        this.setState({
          userInfo,
        });
      }
    });
  }

  sendCommentaire = (text) => {
    const { rating } = this.state;
    this.setState({
      commentaire: { pseudo: text.name, commentaire: text.message, rating },
    });
  };

  answerCommentaire = (text) => {
    this.setState({
      commentaire: { pseudo: text.name, commentaire: text.message },
    });
  }

  redirect = (url) => {
    const { history } = this.props;
    history.push({
      pathname: url,
      state: { parcours: true },
    });
  };

  sendRatings = (rating) => {
    const { parcours } = this.state;
    let determineRating;
    if (parcours.votants.length === 0) {
      determineRating = rating;
    } else {
      determineRating = parcours.rating * parcours.votants.length;

      determineRating += rating;

      determineRating /= parcours.votants.length + 1;
    }
    const newRating = determineRating;
    this.setState({
      rating,
      // eslint-disable-next-line react/no-unused-state
      newRating,
    });

    firebase
      .firestore()
      .collection('parcours')
      .doc(this.parcours)
      .update({
        rating: newRating,
        votants: firebase.firestore.FieldValue.arrayUnion({
          id: localStorage.getItem('userId'),
          userRating: rating,
        }),
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
    firebase
      .firestore()
      .collection('parcours')
      .doc(this.parcours)
      .update({
        apprenants: firebase.firestore.FieldValue.arrayUnion(
          localStorage.getItem('userId'),
        ),
      });

    firestore
      .collection('parcours')
      .doc(this.parcours)
      .collection('cours')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          cours.push({ id: doc.id, data: doc.data() });
        });
        const currentParcours = [{ id: this.parcours, content: cours }];
        mapDispatchToProps(currentParcours, 'cours');
      });
  };

  goToCourse = (type, data, id) => {
    const { history } = this.props;
    localStorage.setItem('coursData', JSON.stringify(data));
    history.push({
      pathname: `/parcours/${this.parcours}/${type}/${id}`,
      state: { data },
    });
  };

  delete = (idCours) => {
    const { firestore, history } = this.props;
    firestore
      .collection('parcours')
      .doc(this.parcours)
      .delete()
      .then(() => {
        console.log(`Document ${idCours} successfully deleted!`);
      })
      .catch((error) => {
        console.error('Error removing document: ', error);
      });
    history.push({
      pathname: '/mydashboard',
      state: { coursDelete: true },
    });
  };

  togleModal = () => {
    const { open } = this.state;
    this.setState({ open: !open });
  };

  haveUserAlreadyVoted = () => {
    const { parcours } = this.state;


    if (
      parcours.votants.map(item => item.id === localStorage.getItem('userId')).includes(true)
    ) {
      const lastRating = parcours.votants.filter(votants => votants.id.includes(localStorage.getItem('userId')));

      this.setState({
        canVote: false,
        rating: lastRating[0].userRating,
        loaded: 0,
      });
    }
  };

  canUserRate = () => {
    const { parcours, canVote, rating } = this.state;

    if (canVote === true && parcours && parcours.apprenants) {
      return (
        <div>
          <Rating
            value={0}
            onChange={value => this.sendRatings(value)}
          />
        </div>
      );
    }
    return <Rating readOnly value={rating || parcours.rating} />;
  };

  render() {
    const { state, history } = this.props;
    const {
      parcours, open, commentaire, rating, loaded, userInfo,
    } = this.state;
    console.log(parcours);
    return (
      <div>
        <ArrowBack
          style={{ position: 'fixed', left: '10px', top: '10px' }}
          onClick={() => {
            history.push('/mydashboard');
          }}
        />
        <SimpleModal
          open={open}
          idCours="Id"
          togle={this.togleModal}
          deleted={this.delete}
        />
        <h1>
          {parcours && parcours.name}
          {' '}
          {' '}
          {' '}

          {(parcours && parcours.creator === localStorage.getItem('userId')) || (userInfo && userInfo.is_admin)
            ? (
              <>
                <Link to={`/createparcours/${this.parcours}/addcours`}><Edit /></Link>
                <DeleteIcon onClick={this.togleModal} />
              </>
            )
            : undefined
          }
        </h1>
        <p>
            Nombre d&apos;élèves :
          {' '}

          { parcours && parcours.apprenants ? parcours.apprenants.length : null}
        </p>
        <p>{parcours && parcours.description}</p>

        {loaded === 1 ? this.haveUserAlreadyVoted() : null}

        <Rating readOnly value={parcours.rating} />

        {state
          && state.cours
          && state.cours[0].content.map(cours => (
            <div key={Math.floor(Math.random() * 50000)}>

              <p
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {cours.data.graduate
                  && cours.data.graduate.includes(localStorage.getItem('userId'))
                  ? <RadioButtonChecked /> : <RadioButtonUnchecked />}
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
        <PostCommentaires
          sendCommentaire={this.sendCommentaire}
          userRate={this.canUserRate}
          rating={rating}
          getParcours={this.getParcours}
        />
        <ViewCommentaires
          currentParcours={this.parcours}
          currentCommentaire={commentaire}
          commentaires={parcours.commentaires}
          rating={rating}
          getParcours={this.getParcours}
          answerCommentaire={this.answerCommentaire}
        />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { mapDispatchToProps },
)(withRouter(withFirebaseContext(seeParcours)));
