import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',

    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ListLessons(props) {
  const classes = useStyles();

  const { data } = props;
  return (
    <List dense className={classes.root}>

      <Link to={{ pathname: '/parcours', state: { parcoursId: data.id } }}>


        <ListItem button>
          <ListItemAvatar>
            <Avatar />
          </ListItemAvatar>
          <ListItemText primary={data.data.name} />
          <ListItemSecondaryAction />
        </ListItem>

      </Link>
    </List>
  );
}
