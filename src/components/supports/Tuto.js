import React, { Component } from 'react';
import Radio from '@material-ui/core/Radio';

class Tuto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      myText: 'Apprendre en s\'amusant',
    };
    this.imagesPath = {
      tchat: 'https://i.ibb.co/sP0jNQZ/tchat-with-your-students.png',
      tuto2: 'https://i.ibb.co/gr3F4h8/tuto02.png',
    };
  }

  toggleImage = () => {
    this.setState(state => ({ open: !state.open }));
    this.setState({ myText: <p>Apprendre de manière ludique</p> });
  }

  // eslint-disable-next-line react/destructuring-assignment
  getImageName = () => (this.state.open ? 'tuto2' : 'tchat')

  handleChange = (event) => {
    this.setSelectedValue(event.target.value);
  }

  render() {
    const imageName = this.getImageName();
    const { myText } = this.state;
    return (
      <div onClick={this.toggleImage} role="presentation">
        <h3 style={{ marginTop: '15%', marginBottom: '10%' }}>
        E-learning
          {' '}
          <br />
          {' '}
        APP tutorial
        </h3>
        <img
          style={{ width: '80%', marginTop: '10%', marginBottom: '10%' }}
          className="tchat"
          role="presentation"
          alt="tchat"
          src={this.imagesPath[imageName]}
        />
        <p>
          {myText}
        </p>
        <Radio
          style={{ marginTop: '10%', marginBottom: '10%' }}
          checked={this.selectedValue === 'a'}
          onChange={this.handleChange}
          value="a"
          name="radio-button-demo"
          inputProps={{ 'aria-label': 'A' }}
        />
        <Radio
          checked={this.selectedValue === 'b'}
          onChange={this.handleChange}
          value="b"
          name="radio-button-demo"
          inputProps={{ 'aria-label': 'B' }}
        />
      </div>
    );
  }
}

export default Tuto;
