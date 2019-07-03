import React, { Component } from 'react';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';
import * as firebase from 'firebase';
import Rating from 'material-ui-rating';
import { withRouter } from 'react-router';
import SimpleModal from '../../SimpleModal';
import withFirebaseContext from '../../../Firebase/withFirebaseContext';
import PostCommentaires from './PostCommentaires';
import ViewCommentaires from './ViewCommentaires';
import ParcoursDetails from './ParcoursDetails';
import CoursDetails from './CoursDetails';
import ShareIcon from './ShareIcon';

class seeParcours extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parcours: [],
      userInfo: {},
      commentSent: false,
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
    this.sendApprenant();

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
    const { firestore } = this.props;
    const docRef = firestore.collection('parcours').doc(this.parcours);
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          this.setState({ parcours: doc.data(), loaded: 1 });
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  };

  getUserInfo = (userRef) => {
    userRef.get().then((doc) => {
      if (doc.exists) {
        const userInfo = doc.data();
        this.setState({
          userInfo,
        });
      }
    });
  };

  sendCommentaire = (text) => {
    const { rating } = this.state;
    this.setState({
      commentSent: true,
      commentaire: { pseudo: text.name, commentaire: text.message, rating },
    });
  };

  answerCommentaire = (text) => {
    this.setState({
      commentaire: { pseudo: text.name, commentaire: text.message },
    });
  }

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

  sendApprenant = () => {
    firebase
      .firestore()
      .collection('parcours')
      .doc(this.parcours)
      .update({
        apprenants: firebase.firestore.FieldValue.arrayUnion(
          localStorage.getItem('userId'),
        ),
      });
  };

  delete = (idCours) => {
    const { firestore, history } = this.props;
    firestore
      .collection('parcours')
      .doc(this.parcours)
      .delete()
      .then(() => { })
      .catch((error) => {
        console.error(`Error removing document ${idCours}`, error);
      });
    history.push('/mydashboard');
  };

  togleModal = () => {
    const { open } = this.state;
    this.setState({ open: !open });
  };

  haveUserAlreadyVoted = () => {
    const { parcours } = this.state;
    if (
      parcours.votants
        .map(item => item.id === localStorage.getItem('userId'))
        .includes(true)
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
          <Rating value={0} onChange={value => this.sendRatings(value)} />
        </div>
      );
    }
    return <Rating readOnly value={rating || parcours.rating} />;
  };

  newComment = () => {
    this.setState({ commentSent: false });
  }

  render() {
    const { history } = this.props;
    const {
      parcours, open, commentaire, commentSent, rating, loaded, userInfo,
    } = this.state;
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
        <ParcoursDetails
          parcours={parcours}
          currentParcours={this.parcours}
          userInfo={userInfo}
          loaded={loaded}
          haveUserAlreadyVoted={this.haveUserAlreadyVoted}
          togleModal={this.togleModal}
        />
        <CoursDetails parcours={this.parcours} />
        <ShareIcon />
        {commentSent
          ? (
            <>
              <p>Commentaire envoyé !</p>
              <Button
                variant="outlined"
                onClick={this.newComment}
                name="thématique"
                className="Button"
                style={{
                  margin: '30px 0 30px 0',
                  width: '300px',
                }}
              >
                Nouveau commentaire
              </Button>
            </>
          )
          : (
            <PostCommentaires
              sendCommentaire={this.sendCommentaire}
              userRate={this.canUserRate}
              rating={rating}
              getParcours={this.getParcours}
            />
          )
        }
        <ViewCommentaires
          currentParcours={this.parcours}
          user={userInfo}
          parcours={parcours}
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

export default withRouter(withFirebaseContext(seeParcours));
