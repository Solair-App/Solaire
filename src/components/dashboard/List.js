import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
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
  const { data } = props;
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {data.name}
        </Typography>
        <Typography variant="h5" component="h2">
          {data.thématique}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {data.difficulté}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {data.langue}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {data.durée}
        </Typography>
        <Typography variant="body2" component="p">

          <br />
          {data.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
