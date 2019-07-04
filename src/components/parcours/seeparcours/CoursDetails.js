/* eslint-disable no-nested-ternary */
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
      })
      .then(() => {
        this.canUserShare();
      });
  }

  canUserShare = () => {
    const { coursFromParcours } = this.state;
    let graduatedLessons = 0;
    for (let i = 0; i < coursFromParcours[0].content.length; i += 1) {
      for (
        let b = 0;
        b < coursFromParcours[0].content[i].data.graduate.length;
        b += 1
      ) {
        if (
          coursFromParcours[0].content[i].data.graduate[b]
          === localStorage.getItem('userId')
        ) {
          graduatedLessons += 1;
        }
      }
    }
    if (graduatedLessons === coursFromParcours[0].content.length) {
      this.setState({
        allCourseCompleted: true,
      });
      return true;
    }
    this.setState({
      allCourseCompleted: false,
      graduatedLessons,
      coursLength: coursFromParcours[0].content.length,
    });
  };

  goToCourse = (type, data, id) => {
    const { history, parcours } = this.props;
    localStorage.setItem('coursData', JSON.stringify(data));
    history.push({
      pathname: `/parcours/${parcours}/${type}/${id}`,
      state: { data },
    });
  };

  render() {
    const {
      coursFromParcours,
      allCourseCompleted,
      graduatedLessons,
      coursLength,
    } = this.state;
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

        {allCourseCompleted === true ? (
          <>
            {' '}
            <p>Vous pouvez maintenant partager votre réussite !</p>
            {' '}
            <ShareIcon gray={0} />
            {' '}
          </>
        ) : (
          <>
            {' '}
            <p>
              Complétez encore
              {' '}
              {`${coursLength - graduatedLessons} `}
              {' '}
cours pour
              pouvoir partager la complétion de ce cours !
            </p>
            <ShareIcon gray={1} />
          </>
        )}
      </>
    );
  }
}

export default withRouter(withFirebaseContext(CoursDetails));
