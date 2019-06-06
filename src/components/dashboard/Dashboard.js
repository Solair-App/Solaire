import React, { Component } from 'react';

import useDashButton from './DashButton';
import BottomNav from './BottomNav';
import SearchBar from './SearchBar';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    return (

      <div style={{ display: 'block', textAlign: 'left' }}>
        <SearchBar />
        <useDashButton />

        <BottomNav />
      </div>
    );
  }
}

export default Dashboard;
