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
    height: 90,
  },
  pos: {
    fontSize: 10,
    marginBottom: 1,
  },
  pos2: {
    fontSize: 10,
    marginBottom: 1.5,
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
                      title=""
                    />
                  </Link>
                  <CardContent style={{ marginBottom: -15, marginTop: -9, marginLeft: -7 }}>
                    <Link to={`/parcours/${info.id}`} className="link">
                      <div className="boxTitle">
                        <div style={{
                          maxHeight: 30, overflow: 'hidden', whiteSpace: 'pre-wrap', marginBottom: 0.5,
                        }}
                        >
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="h2"
                            className={classes.title}
                            color="textSecondary"
                          >
                            {info.data.name}
                          </Typography>
                        </div>
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
                          className={classes.pos2}
                          color="textSecondary"
                        >
                          {info.data.difficulté}
                        </Typography>
                        <Typography
                          variant="body2"
                          component="p"
                          className={classes.pos}
                          color="textSecondary"
                        >
                          {info.data.durée}
                        </Typography>
                      </div>
                    </Link>
                  </CardContent>
                  <Rating readOnly value={info.data.rating} className="rating" />
                </CardActionArea>
              </Card>
            </li>
          ))}
    </ul>
  );
}
