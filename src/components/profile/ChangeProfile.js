import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';
import TextField from '@material-ui/core/TextField';

class ChangeProfile extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  redirect = (url) => {
    const { history } = this.props;
    history.push({
      pathname: url,
      state: { parcours: true },
    });
  }

  render() {
    return (
      <div>
        <ArrowBack
          style={{ position: 'fixed', left: '10px', top: '10px' }}
          onClick={() => {
            this.redirect('/profile');
          }}
        />
        <h1>Modifier mes informations personnelles</h1>
        <div>
          <TextField
            required
            id="standard-name"
            label="Nom"
            className="textfield"
            style={{ marginTop: '5%', width: '50%' }}
          />
        </div>

        <div>
          <TextField
            required
            id="standard-name"
            label="Prénom"
            className="textfield"
            style={{ marginTop: '5%', width: '50%' }}
          />
        </div>

        <div>
          <TextField
            required
            id="outlined-email-input"
            label="Email"
            className="textField"
            autoComplete="email"
            style={{ marginTop: '5%', width: '50%' }}
          />
        </div>

        <div>
          <TextField
            id="standard-name"
            label="Ville"
            className="textfield"
            style={{ marginTop: '5%', width: '50%' }}
          />
        </div>

        <div>
          <TextField
            id="standard-multiline-flexible"
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

export default ChangeProfile;
