import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';
import TextField from '@material-ui/core/TextField';
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

    console.log(localStorage.getItem('userId'));

    event.preventDefault();
  }

  render() {
    const {
      name, email, city, bio,
    } = this.state;

    return (
      <div>
        <ArrowBack
          style={{ position: 'fixed', left: '10px', top: '10px' }}
          onClick={() => {
            this.redirect('/profile');
          }}
        />
        <h2 className="titrechange">Modifier mes informations personnelles</h2>
        <div>
          <ImageUpload getImage={this.getImage} />
        </div>
        <div>
          <TextField
            id="standard-name"
            name="name"
            onChange={this.onChange}
            value={name}
            label="Full Name"
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

        <Button
          variant="outlined"
          name="changeprofile"
          className="Button"
          onClick={this.onSubmit}
          style={{
            margin: '30px 0 30px 0',
            width: '300px',
          }}
        >
              Valider mes informations
        </Button>
      </div>

    );
  }
}

export default withFirebaseContext(ChangeProfile);
