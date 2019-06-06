import React from 'react';
import RadioButtonUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import Edit from '@material-ui/icons/Edit';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import LockOpen from '@material-ui/icons/LockOpen';

function ListCours(props) {
  const { data } = props;

  return (

    <div>
      {' '}
      {Object.keys(data).map(cours => (
        <>

          <p>
            <RadioButtonUnchecked style={{ marginRight: '10px' }} />
            {cours.name}
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
        </>
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
