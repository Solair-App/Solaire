import React, { Component } from 'react';
import Fab from '@material-ui/core/Fab';


class Tuto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
    this.imagesPath = [
      'https://i.ibb.co/sP0jNQZ/tchat-with-your-students.png',
      'https://i.ibb.co/MVR2YFH/tuto02.png',
      'https://i.ibb.co/KLrJKhW/pictogramme03.png',


    ];

    this.textPath = [
      'Différent style d\'apprentisage !',
      'Apprendre de manière ludique & interactif !',
      'Près pour le grand saut ?',

    ];
  }

  incrementCounter = () => {
    let { count } = this.state;
    count += 1;
    if (count < this.textPath.length) { this.setState({ count }); }
  }


  handleChange = (event) => {
    this.setSelectedValue(event.target.value);
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
        <h1 style={{ marginTop: '15%', marginBottom: '10%', color: '#138787' }}>
        Solair
        </h1>
        <img
          style={{ width: '80%', marginTop: '10%', marginBottom: '10%' }}
          className="tchat"
          role="presentation"
          alt="tchat"
          src={this.imagesPath[count]}
        />
        <h3 style={{ margin: '10%' }}>
          {this.textPath[count]}
        </h3>
        {count === this.imagesPath.length - 1 ? (
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
              marginTop: '10%',
              backgroundColor: '#E15920',
            }}
          >
          go
          </Fab>
        ) : null}
      </div>
    );
  }
}

export default Tuto;
