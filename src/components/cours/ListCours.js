import React, { Component } from 'react';
import RadioButtonUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import Edit from '@material-ui/icons/Edit';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import LockOpen from '@material-ui/icons/LockOpen';

class ListCours extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    const { courseName } = this.props;
    return (

      <div>
        {' '}
        <p style={{ marginTop: '30px' }}>
          <RadioButtonUnchecked style={{ marginRight: '10px' }} />
          {courseName}
          {' '}
          <Edit style={{ marginLeft: '10px' }} />

        </p>
        <div>
          <ArrowDownward style={{ marginRight: '74px', marginTop: '-10px' }} />

        </div>
        <LockOpen style={{ marginRight: '74px' }} />
        <div>
          <ArrowDownward style={{ marginRight: '74px', marginTop: '10px' }} />
        </div>
        <p style={{ marginTop: '10px' }}>
          <RadioButtonUnchecked style={{ marginRight: '10px' }} />
          {courseName}
          {' '}
          <Edit style={{ marginLeft: '10px' }} />

        </p>
      </div>
    );
  }
}

export default ListCours;
