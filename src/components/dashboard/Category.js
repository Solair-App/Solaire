import React from 'react';
import { Link } from 'react-router-dom';
import Rating from 'material-ui-rating';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import BottomNav from './BottomNav';
import './Parcours.scss';


const useStyles = makeStyles({
  card: {
    width: 150,
    height: 200,
    boxShadow: 'none',
  },
  title: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  media: {
    height: 80,
  },
  pos: {
    fontSize: 10,
  },
});

export default function ListCours(props) {
  const classes = useStyles();
  const { data } = props;
  return (
    <>
      {data
          && (
          <li className="item" key={`${data.id + 1}n`}>

            <Card className={classes.card}>
              <CardActionArea>
                <Link to={`/parcours/${data.id}`} className="link">
                  <CardMedia
                    className={classes.media}
                    image={data.data.url}
                    title=""
                  />
                </Link>
                <CardContent style={{ marginBottom: -15 }}>
                  <Link to={`/parcours/${data.id}`} className="link">
                    <div className="boxTitle">
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        className={classes.title}
                        color="textSecondary"
                      >
                        <image />
                        {data.data.name}
                      </Typography>
                    </div>
                    <Typography
                      variant="body2"
                      component="p"
                      className={classes.pos}
                      color="textSecondary"
                    >
                      {data.data.difficulte}
                    </Typography>
                    <Typography
                      variant="body2"
                      component="p"
                      className={classes.pos}
                      color="textSecondary"
                    >
                      {data.data.langue}
                    </Typography>
                    <Typography
                      variant="body2"
                      component="p"
                      className={classes.pos}
                      color="textSecondary"
                    >
                      {data.data.duree}
                    </Typography>
                  </Link>
                </CardContent>
                {' '}
                <Rating readOnly value={data.data.rating} />
              </CardActionArea>
            </Card>
          </li>
          )}
      <BottomNav />
    </>
  );
}
