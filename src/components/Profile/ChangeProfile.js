import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';
import TextField from '@material-ui/core/TextField';

class ChangeProfile extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    return (
      <div>
        <ArrowBack
          style={{ position: 'fixed', left: '10px', top: '10px' }}
          onClick={() => {
            this.redirect('/Profile');
          }}
        />
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
            label="Description"
            multiline
            rowsMax="4"
            className="textField"
            style={{ marginTop: '5%', width: '50%' }}
          />
        </div>
      </div>

    );
  }
}

export default ChangeProfile;
