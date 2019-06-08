import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Edit from '@material-ui/icons/Edit';
import Category from '@material-ui/icons/Category';
import Folder from '@material-ui/icons/Folder';
import AccountBox from '@material-ui/icons/AccountBox';
import { withRouter } from 'react-router';

const useStyles = makeStyles({
  root: {

    position: 'fixed',
    bottom: '0',
    width: '100%',

  },
});
function BottomNav(props) {
  function redirect() {
    const { history } = props;

    history.push('/CreateParcours');
  }
  const classes = useStyles();
  const [value, setValue] = React.useState(1);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction onClick={redirect} label="Création" icon={<Edit />} />
      <BottomNavigationAction label="Dashboard" icon={<Category />} />
      <BottomNavigationAction label="Mes cours" icon={<Folder />} />
      <BottomNavigationAction label="Profile" icon={<AccountBox />} />
    </BottomNavigation>
  );
}
export default withRouter(BottomNav);
