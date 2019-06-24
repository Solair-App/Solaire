import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Rating from 'material-ui-rating';
import './List.css';

import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    height: '40px',
    textAlign: 'center',
    display: 'inline-block',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function ListCours(props) {
  const classes = useStyles();

  const { data } = props;

  return (
    <ul className="hs full">
      {data && data
        .filter(
          /* eslint-disable no-mixed-operators */
          info => info.data.thématique === props.thématique
            && info.data.tags
              .toUpperCase()
              .includes(props.currentSearch.toUpperCase()),
        )
        .map((info, index) => (
          <div key={`${index + 1}g`}>
            <Rating readOnly value={info.data.rating} />
            <li className="item" key={`${index + 1}n`}>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                <Link to={`/parcours/${info.id}`}>
                  {info.data.name}
                </Link>
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                {info.data.difficulté}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                {info.data.langue}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                {info.data.durée}
              </Typography>
              <Typography variant="body2" component="p">
                tags :
                {info.data.tags}
              </Typography>
            </li>
          </div>
        ))}
    </ul>
  );
}
