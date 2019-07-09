import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Rating from 'material-ui-rating';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: 'white',
    width: '100%',
    marginRight: 'auto',
    marginLeft: 'auto',
    boxShadow: '12px 12px 2px 1px rgba(0, 0, 255, .2)',
  },
}));

export default function ListLessons(props) {
  const classes = useStyles();

  const { data } = props;

  return (
    <Grid container>
      <List dense className={classes.root}>


        {' '}

        <Grid item xs={12} sm={6} md={6}>
          {' '}
          <Link style={{ width: '100%' }} to={{ pathname: `/parcours/${data.id}` }}>
            <ListItem button>
              <ListItemAvatar>
                <Avatar src={data.data.url} />
              </ListItemAvatar>
              <ListItemText primary={data.data.name} />

              <ListItemSecondaryAction />
            </ListItem>


          </Link>
        </Grid>

        <Grid item xs={12} sm={6} md={6}>

              Vues :
          {' '}
          {data.data.apprenants.length}

          {' '}
          <Rating max={1} readOnly value={1} />
          {' '}
          {Math.floor(data.data.rating)}
          {' '}


          {' '}

        </Grid>

      </List>
    </Grid>

  );
}


/*    <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',

            }}
            > */
