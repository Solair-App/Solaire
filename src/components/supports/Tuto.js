import React, { Component } from 'react';
import Fab from '@material-ui/core/Fab';

import Radio from '@material-ui/core/Radio';

class Tuto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
    this.imagesPath = [
      'https://i.ibb.co/6yykCdD/tchat-with-your-students-01.png',
      'https://i.ibb.co/fNTs9Cd/tuto02.png',
      'https://i.ibb.co/3dd6G8Q/create-01.png',
      'https://i.ibb.co/r7VKKvw/readytogo.png',


    ];

    this.textPath = [
      'Différents styles d\'apprentisage !',
      'Apprendre de manière ludique & interactive !',
      'Crée ton parcours & partage ton savoir avec les autres',
      'Prêt à apprendre ?',

    ];
  }

  incrementCounter = () => {
    let { count } = this.state;
    count += 1;
    if (count < this.textPath.length) { this.setState({ count }); }
  }

  redirect = (url) => {
    const { history } = this.props;
    history.push({
      pathname: url,
      state: { parcours: true },
    });
  };

  render() {
    const { count } = this.state;
    return (
      <div onClick={this.incrementCounter} role="presentation">
        <h1 style={{ marginTop: '2%', color: '#138787' }}>
        Solair
        </h1>
        <img
          style={{
            width: '35%',
          }}
          className="tchat"
          role="presentation"
          alt="tchat"
          src={this.imagesPath[count]}
        />
        <h3 style={{ marginRight: '10%', marginLeft: '10%' }}>
          {this.textPath[count]}
        </h3>

        {this.imagesPath.map((image, index) => (
          <Radio
            style={{
              marginTop: '2%',
              textAlign: 'center',
            }}
            checked={count === index}
            onClick={() => {
              this.setState({
                count: index,
              });
            }}
            value={count}

            inputProps={{ 'aria-label': { index } }}
          />
        ))}

        {count === this.imagesPath.length - 1 ? (
          <div>
            <Fab
              variant="extended"
              size="medium"
              aria-label="Add"
              onClick={() => {
                this.redirect('/mydashboard');
              }}
              style={{
                width: '300px',
                color: 'white',
                marginTop: '',
                backgroundColor: '#E15920',
              }}
            >
          go
            </Fab>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Tuto;
