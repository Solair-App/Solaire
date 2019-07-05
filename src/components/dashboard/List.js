import React from 'react';
import { Link } from 'react-router-dom';
import Rating from 'material-ui-rating';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import './List.css';

import Typography from '@material-ui/core/Typography';

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
  const { data, searchField } = props;
  return (
    <ul className="hs full">
      {data
        && data
          .slice(0, searchField === '' || null || undefined ? 10 : 200)
          .filter(parcours => parcours.data.tags.toUpperCase().includes(searchField.toUpperCase()))
          .map((info, index) => (
            <li className="item" key={`${index + 1}n`}>
              <Card className={classes.card}>
                <CardActionArea>
                  <Link to={`/parcours/${info.id}`} className="link">
                    <CardMedia
                      className={classes.media}
                      image={info.data.url}
                      title="Contemplative Reptile"
                    />
                  </Link>
                  <CardContent style={{ marginBottom: -15 }}>
                    <Link to={`/parcours/${info.id}`} className="link">
                      <div className="boxTitle">
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="h2"
                          className={classes.title}
                          color="textSecondary"
                        >
                          <image />
                          {info.data.name}
                        </Typography>
                      </div>
                      <Typography
                        variant="body2"
                        component="p"
                        className={classes.pos}
                        color="textSecondary"
                      >
                        {info.data.difficulte}
                      </Typography>
                      <Typography
                        variant="body2"
                        component="p"
                        className={classes.pos}
                        color="textSecondary"
                      >
                        {info.data.langue}
                      </Typography>
                      <Typography
                        variant="body2"
                        component="p"
                        className={classes.pos}
                        color="textSecondary"
                      >
                        {info.data.duree}
                      </Typography>
                    </Link>
                  </CardContent>
                  {' '}
                  <Rating readOnly value={info.data.rating} />
                </CardActionArea>
              </Card>
            </li>
          ))}
    </ul>
  );
}
