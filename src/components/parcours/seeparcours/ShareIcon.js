import React from 'react';
import {
  TwitterIcon,
  FacebookIcon,
  LinkedinIcon,
} from 'react-share';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
  button: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
});
function ShareIcon(props) {
  const { gray } = props;
  const classes = props;

  // eslint-disable-next-line react/destructuring-assignment
  const { pathname } = props.location;
  return (
    <>

      <div style={{ justifyContent: 'center', display: 'flex', filter: `grayscale(${gray})` }}>
        <Button
          className={classes.button}
          onClick={() => {
            if (gray === 0) {
              window.location = `https://www.facebook.com/sharer.php?u=${pathname}`;
            }
          }}
        >
          <FacebookIcon

            size={32}
            round
          />

        </Button>
        <Button
          className={classes.button}
          onClick={() => {
            if (gray === 0) {
              window.location = 'https://www.linkedin.com/shareArticle?mini=true&url=test&title=Titre&summary=Je%20viens%20de%20terminer%20ce%20super%20cours%20sur%20Solair%20!%20source=Solair';
            }
          }}
        >
          <LinkedinIcon size={32} round />

        </Button>
        <Button
          className={classes.button}
          onClick={() => {
            if (gray === 0) {
              window.location = `https://twitter.com/intent/tweet?text=Je%20viens%20de%20terminer%20ce%20super%20cours%20Solair%20!%20${document.location.href}`;
            }
          }}
        >
          <TwitterIcon size={32} round />
        </Button>
      </div>
    </>
  );
}


export default withStyles(styles)(withRouter(ShareIcon));
