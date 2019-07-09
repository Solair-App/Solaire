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
      <h2 style={{
        color: 'white',
        paddingTop: '10%',
        paddingBottom: '3%',
      }}
      >
        {parcours && parcours.name}
        {' '}
        {' '}
        {(parcours && parcours.creator === localStorage.getItem('userId')) || (userInfo && userInfo.is_admin)
          ? (
            <>
              <Link style={{ color: 'white' }} to={`/createparcours/${currentParcours}/addcours`}><Edit /></Link>
              <DeleteIcon onClick={togleModal} />
              {' '}
            </>
          )
          : undefined
      }
      </h2>
    </div>

    {parcours && parcours.creatorName
      && (
      <p className="creator">
        Créé par
        {' '}
        <Link className="link" to={`/user-profile/${parcours.creator}`}>{parcours.creatorName}</Link>
      </p>
      )}
    {(parcours && parcours.creator === localStorage.getItem('userId')) || (userInfo && userInfo.is_admin)
      ? (
        <>
          <p>
        Nombre d&apos;élèves :
            {' '}
            { parcours && parcours.apprenants ? parcours.apprenants.length : null}
          </p>
        </>
      )
      : null}
    <p>{parcours && parcours.description}</p>
    {loaded === 1 ? haveUserAlreadyVoted() : null}

    <Rating readOnly value={parcours.rating} />
  </>
);

export default ParcoursDetails;
