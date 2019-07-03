import React, { Component } from 'react';
import RadioButtonUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonChecked from '@material-ui/icons/RadioButtonChecked';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import { withRouter } from 'react-router';
import withFirebaseContext from '../../../Firebase/withFirebaseContext';
import ShareIcon from './ShareIcon';

class CoursDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coursFromParcours: [],
    };
  }

  componentDidMount() {
    const { firestore, parcours } = this.props;
    const cours = [];
    firestore
      .collection('parcours')
      .doc(parcours)
      .collection('cours')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          cours.push({ id: doc.id, data: doc.data() });
        });
        const currentParcours = [{ id: this.parcours, content: cours }];
        this.setState({ coursFromParcours: currentParcours });
      });
  }

  goToCourse = (type, data, id) => {
    const { history, parcours } = this.props;
    localStorage.setItem('coursData', JSON.stringify(data));
    history.push({
      pathname: `/parcours/${parcours}/${type}/${id}`,
      state: { data },
    });
  };

  render() {
    const { coursFromParcours } = this.state;
    return (
      <>
        {coursFromParcours
          && coursFromParcours[0]
          && coursFromParcours[0].content.map(cours => (
            <div key={Math.floor(Math.random() * 50000)}>
              <p
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {cours.data.graduate
                && cours.data.graduate.includes(localStorage.getItem('userId')) ? (
                  <RadioButtonChecked />
                  ) : (
                    <RadioButtonUnchecked />
                  )}
                <img
                  src={`./assets/${cours.data.type}.png`}
                  style={{ width: '4em' }}
                  alt={cours.data.type}
                />
                <button
                  type="button"
                  onClick={() => this.goToCourse(cours.data.type, cours.data, cours.id)
                  }
                >
                  {' '}
                  {cours.data.name}
                </button>
              </p>

              <p>{cours.data.description}</p>
              <div>
                <ArrowDownward />
              </div>
            </div>
          ))}
        <ShareIcon />
      </>
    );
  }
}

export default withRouter(withFirebaseContext(CoursDetails));
