import React, { Component } from 'react';
import ArrowBack from '@material-ui/icons/ArrowBack';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import SaveIcon from '@material-ui/icons/Save';
import ImageUpload from './ImageUpload';
import './profile.scss';
import withFirebaseContext from '../../Firebase/withFirebaseContext';

class ChangeProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      city: '',
      bio: '',
    };
  }

  redirect = (url) => {
    const { history } = this.props;
    history.push({
      pathname: url,
      state: { parcours: true },
    });
  }

  getImage = (url) => {
    const { firestore } = this.props;
    firestore.doc(`usersinfo/${localStorage.getItem('userId')}`).set({
      url,
    }, { merge: true });
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = (event) => {
    const { firestore } = this.props;
    const {
      name, email, city, bio,
    } = this.state;

    if (name) {
      firestore.doc(`usersinfo/${localStorage.getItem('userId')}`).set({
        name,
      }, { merge: true });
    }
    if (email) {
      firestore.doc(`usersinfo/${localStorage.getItem('userId')}`).set({
        email,
      }, { merge: true });
    }
    if (city) {
      firestore.doc(`usersinfo/${localStorage.getItem('userId')}`).set({
        city,
      }, { merge: true });
    }
    if (bio) {
      firestore.doc(`usersinfo/${localStorage.getItem('userId')}`).set({
        bio,
      }, { merge: true });
    }
    event.preventDefault();
    this.redirect('/profile');
  }

  render() {
    const {
      name, email, city, bio,
    } = this.state;

    return (
      <div>
        <div className="topFond">
          <ArrowBack
            style={{ position: 'fixed', left: '10px', top: '10px' }}
            onClick={() => {
              this.redirect('/profile');
            }}
          />
          <h1>Modifier mon profil</h1>
        </div>
        <div style={{ marginTop: '10px', color: '#777174' }}>
          <p style={{ marginBottom: '10px' }}>Ajouter une image</p>
          <ImageUpload getImage={this.getImage} />
        </div>
        <div>
          <TextField
            id="standard-name"
            name="name"
            onChange={this.onChange}
            value={name}
            label="Nom"
            className="textfield"
            style={{ marginTop: '5%', width: '50%' }}
          />
        </div>

        <div>
          <TextField
            id="outlined-email-input"
            name="email"
            onChange={this.onChange}
            value={email}
            label="Email"
            className="textField"
            autoComplete="email"
            style={{ marginTop: '5%', width: '50%' }}
          />
        </div>

        <div>
          <TextField
            id="standard-name"
            name="city"
            onChange={this.onChange}
            value={city}
            label="Ville"
            className="textfield"
            style={{ marginTop: '5%', width: '50%' }}
          />
        </div>

        <div>
          <TextField
            id="standard-multiline-flexible"
            name="bio"
            onChange={this.onChange}
            value={bio}
            label="A propos de moi"
            multiline
            rowsMax="4"
            className="textField"
            style={{ marginTop: '5%', width: '50%' }}
          />
        </div>

        <Fab
          variant="extended"
          size="medium"
          aria-label="Add"
          onClick={this.onSubmit}
          style={{
            margin: '30px 0 30px 0',
            width: '300px',
            color: 'white',
            backgroundColor: '#E15920',
          }}
        >
          <SaveIcon className="saveicon" />
          Valider mes informations
        </Fab>
      </div>

    );
  }
}

export default withFirebaseContext(ChangeProfile);
