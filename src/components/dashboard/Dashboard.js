import React, { Component } from 'react';

import UseDashButton from './DashButton';
import BottomNav from './BottomNav';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    return (

      <div style={{ display: 'block', textAlign: 'left' }}>
        <UseDashButton />

        <BottomNav />
      </div>
    );
  }
}

export default Dashboard;
