import React from 'react';
import {
  TwitterIcon,
  FacebookIcon,
  LinkedinIcon,
} from 'react-share';

function ShareIcon() {
  return (
    <>
      <div style={{ justifyContent: 'center', display: 'flex' }}>
        <FacebookIcon size={32} url="" round />
        <LinkedinIcon size={32} round />
        <TwitterIcon size={32} round />

      </div>
    </>
  );
}


export default ShareIcon;
