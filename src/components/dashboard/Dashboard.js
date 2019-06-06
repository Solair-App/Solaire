import React, { Component } from 'react';

import BottomNav from './BottomNav';


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.getParcoursFromDB();
  }


  render() {
    return (

      <div>
        {' '}

        {' '}
        <BottomNav />
      </div>
    );
  }
}

export default Dashboard;
