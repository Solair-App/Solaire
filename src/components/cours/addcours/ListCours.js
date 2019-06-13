import React from 'react';
import RadioButtonUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import Edit from '@material-ui/icons/Edit';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import LockOpen from '@material-ui/icons/LockOpen';

function ListCours() {
  const courseName = ['Cours', 'Cours', 'Cours', 'Cours', 'Cours', 'Cours', 'Cours', 'Cours'];
  return (

    <div>
      {' '}
      {courseName.map((cours, index) => (
        <div key={`${index + 1}c`}>

          <p>
            <RadioButtonUnchecked key={`${index + 1}c`} style={{ marginRight: '10px' }} />
            {cours}
            {' '}
            <Edit style={{ marginLeft: '10px' }} />

          </p>

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
      {' '}

      <p style={{ marginTop: '10px' }}>
        <RadioButtonUnchecked style={{ marginRight: '10px' }} />
       Certification
        {' '}


      </p>
    </div>
  );
}


export default ListCours;
