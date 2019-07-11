import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import BottomNav from './BottomNav';
import './Parcours.scss';
import './List.css';


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
                <CardContent style={{ marginBottom: -9, marginTop: -9, marginLeft: -7 }}>
                  <Link to={`/parcours/${data.id}`} className="link">
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
                          {data.data.name}
                        </Typography>
                      </div>
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
                        className={classes.pos2}
                        color="textSecondary"
                      >
                        {data.data.difficulté}
                      </Typography>
                      <Typography
                        variant="body2"
                        component="p"
                        className={classes.pos}
                        color="textSecondary"
                      >
                        {data.data.durée}
                      </Typography>
                      <Typography
                        variant="body2"
                        component="p"
                        className={classes.pos}
                        color="textSecondary"
                      />
                    </div>
                  </Link>
                </CardContent>
                <div style={{
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                >
                  <p>
                    {Math.floor(data.data.rating)}
                  </p>
                  <img style={{ width: '13px' }} src="./assets/star.png" alt="rating" />
                </div>
              </CardActionArea>
            </Card>
          </li>
          )}
      <BottomNav />
    </>
  );
}
