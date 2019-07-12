import React from 'react';
import Edit from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';
import Rating from 'material-ui-rating';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { withRouter } from 'react-router';

import './SeeParcours.scss';

const ParcoursDetails = ({
  parcours, history, currentParcours, togleModal, loaded, userInfo, haveUserAlreadyVoted,
}) => (
  <>
    <div style={{
      maxHeight: 100,
      backgroundColor: '#138787',
      color: 'white',
    }}
    >
      <ArrowBack
        style={{
          position: 'absolute', left: 9, top: 13,
        }}
        onClick={() => {
          history.push('/mydashboard');
        }}
      />
      <h2 style={{
        color: 'white',
        paddingBottom: 11,
        paddingTop: 7,
        paddingLeft: 30,
        fontSize: 24,
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
    <p className="description">
Description :
      {' '}
      {parcours && parcours.description}
    </p>
    {loaded === 1 ? haveUserAlreadyVoted() : null}

    <Rating readOnly value={parcours.rating} style={{ marginBottom: 15, marginTop: 5 }} />
  </>
);

export default withRouter(ParcoursDetails);
