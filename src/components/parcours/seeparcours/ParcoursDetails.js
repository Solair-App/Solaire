import React from 'react';
import Edit from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';
import Rating from 'material-ui-rating';
import './SeeParcours.scss';

const ParcoursDetails = ({
  parcours, currentParcours, togleModal, loaded, userInfo, haveUserAlreadyVoted,
}) => (
  <>
    <div className="backparcours">
      <h1 style={{
        color: 'white',
      }}
      >
        {parcours && parcours.name}
        {' '}
        {' '}
        {(parcours && parcours.creator === localStorage.getItem('userId')) || (userInfo && userInfo.is_admin)
          ? (
            <>
              <Link to={`/createparcours/${currentParcours}/addcours`}><Edit /></Link>
              <DeleteIcon onClick={togleModal} />
              {' '}
              <p>
        Nombre d&apos;élèves :
                {' '}

                { parcours && parcours.apprenants ? parcours.apprenants.length : null}
              </p>
            </>
          )
          : undefined
      }
      </h1>
      {parcours && parcours.creatorName
      && (
      <p>
        Créé par
        {' '}
        <Link to={`/user-profile/${parcours.creator}`}>{parcours.creatorName}</Link>
      </p>
      )}
    </div>

    <p>{parcours && parcours.description}</p>

    {loaded === 1 ? haveUserAlreadyVoted() : null}

    <Rating readOnly value={parcours.rating} />
  </>
);

export default ParcoursDetails;
