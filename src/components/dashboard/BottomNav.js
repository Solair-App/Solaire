import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Edit from '@material-ui/icons/Edit';
import Category from '@material-ui/icons/Category';
import Folder from '@material-ui/icons/Folder';
import AccountBox from '@material-ui/icons/AccountBox';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import { mapDispatchToProps } from '../../actions/action';

const mapStateToProps = state => ({
  state,
});

const useStyles = makeStyles({
  root: {
    position: 'fixed',
    bottom: '0',
    width: '100%',
    boxShadow: '0 2px 20px grey',
  },
  selected: {
    color: '#138787',
    padding: '0px !important',
    fontSize: '12px !important ',
  },
  bottomNav: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    boxShadow: '0 2px 10px grey',
    zIndex: 2,
  },
});


function BottomNav(props) {
  function redirect(choice) {
    const { history } = props;
    switch (choice) {
      case 'create':
        history.push('/CreateParcours');
        break;
      case 'profile':
        history.push('/profile');
        break;
      case 'dashboard':
        history.push('/mydashboard');
        break;
      case 'mylessons':
        history.push('/mylessons');
        break;
      default:
        history.push('/mydashboard');
    }
  }
  const classes = useStyles();
  const [value] = React.useState(1);
  const handleChange = (event, newValue) => {
    // eslint-disable-next-line no-shadow
    const { mapDispatchToProps } = props;
    mapDispatchToProps(newValue, 'bottomNav');
  };


  const { state } = props;
  return (
    <BottomNavigation

      value={state ? state.bottomNav : value}
      onChange={handleChange}
      showLabels
      className={classes.bottomNav}
    >
      <BottomNavigationAction className={classes.selected} onClick={() => redirect('dashboard')} label="Accueil" icon={<Category />} />
      <BottomNavigationAction className={classes.selected} onClick={() => redirect('create')} label="Création" icon={<Edit />} />
      <BottomNavigationAction className={classes.selected} onClick={() => redirect('mylessons')} label="Mes cours" icon={<Folder />} />
      <BottomNavigationAction className={classes.selected} onClick={() => redirect('profile')} label="Profil" icon={<AccountBox />} />
    </BottomNavigation>
  );
}
export default connect(mapStateToProps, { mapDispatchToProps })(withRouter(BottomNav));
