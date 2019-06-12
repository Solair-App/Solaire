import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

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

      {data.filter(info => info.thématique === props.thématique && info.name.toUpperCase().includes(props.currentSearch.toUpperCase())).map(info => (
        <div>

          <li className="item">

            <Typography className={classes.title} color="textSecondary" gutterBottom>
              {info.name}
            </Typography>
            <Typography variant="h5" component="h2">
              {info.thématique}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {info.difficulté}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {info.langue}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {info.durée}
            </Typography>
            <Typography variant="body2" component="p">


              {info.description}
            </Typography>
          </li>

        </div>
      ))}


    </ul>

  );
}
