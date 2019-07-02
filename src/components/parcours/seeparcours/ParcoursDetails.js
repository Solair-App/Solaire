import React from 'react';
import Edit from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';
import Rating from 'material-ui-rating';


const ParcoursDetails = ({
  parcours, currentParcours, togleModal, loaded, userInfo, haveUserAlreadyVoted,
}) => (
  <>
    <h1>
      {parcours && parcours.name}
      {' '}
      {' '}
      {(parcours && parcours.creator === localStorage.getItem('userId')) || (userInfo && userInfo.is_admin)
        ? (
          <>
            <Link to={`/createparcours/${currentParcours}/addcours`}><Edit /></Link>
            <DeleteIcon onClick={togleModal} />
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

    {loaded === 1 ? haveUserAlreadyVoted() : null}

    <Rating readOnly value={parcours.rating} />
  </>
);

export default ParcoursDetails;
