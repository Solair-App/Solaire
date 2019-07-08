import React from 'react';
import {
  TwitterIcon,

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


  return (

    <>

      <div style={{ justifyContent: 'center', display: 'flex', filter: `grayscale(${gray})` }}>

        <Button
          className={classes.button}
          onClick={() => {
            if (gray === 0) {
              window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`);
            }
          }}
        >
          <LinkedinIcon size={32} round />

        </Button>
        <Button
          className={classes.button}
          onClick={() => {
            if (gray === 0) {
              window.open(`https://twitter.com/share?url=${encodeURIComponent(window.location.href)}&text=${'Je viens de finir ce super cours sur Solair'}`, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');
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
