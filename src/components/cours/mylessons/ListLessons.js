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
import School from '@material-ui/icons/School';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: 'white',
    width: '100%',
    marginRight: 'auto',
  },
}));

export default function ListLessons(props) {
  const classes = useStyles();
  const { data } = props;

  return (
    <Grid container className="gridLesson" alignItems="center">
      <Grid item xs={12} sm={6} md={6}>
        <Link
          to={{ pathname: `/parcours/${data.id}` }}
        >
          <List dense className={classes.root}>
            <ListItem>
              <ListItemAvatar>
                <Avatar src={data.data.url} />
              </ListItemAvatar>
              <ListItemText primary={data.data.name} />
              <ListItemSecondaryAction />
            </ListItem>
            <div>

              {data.data.creator === localStorage.getItem('userId') ? (
                <>
                  {' '}
                  {' '}
                  <School />
                  <p>
                    {' '}


                    {' '}
                    {data.data.apprenants.length}
                    {' '}

                  </p>
                </>
              )

                : null}


              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >

            Note :
                <Rating max={1} readOnly value={1} />
                {data.data.rating}
              </div>
            </div>
          </List>
        </Link>
      </Grid>
    </Grid>


  );
}
