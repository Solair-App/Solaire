import React, { Component } from 'react';
import * as firebase from 'firebase';
import BottomNav from './BottomNav';
import List from './List';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  componentDidMount() {
    this.getParcoursFromDB();
  }

  getParcoursFromDB = () => {
    const category = [];
    const db = firebase.firestore();
    const parcoursRef = db.collection('parcours');
    parcoursRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        category.push(doc.data());
      });
      this.setState({
        data: category,
      });
    });
  }

  render() {
    const { data } = this.state;

    return (

      <div>
        {' '}
        {data.map(x => <List data={x} />)}
        {' '}
        <BottomNav />
      </div>
    );
  }
}

export default Dashboard;
