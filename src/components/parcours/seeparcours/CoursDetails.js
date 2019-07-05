/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import RadioButtonUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonChecked from '@material-ui/icons/RadioButtonChecked';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import { withRouter } from 'react-router';
import Fab from '@material-ui/core/Fab';
import withFirebaseContext from '../../../Firebase/withFirebaseContext';
import ShareIcon from './ShareIcon';
import './SeeParcours.scss';

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

  // eslint-disable-next-line consistent-return
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
                  justifyContent: 'left',
                  paddingLeft: '8%',
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
                  style={{ width: '4em', paddingLeft: '5%' }}
                  alt={cours.data.type}
                />

                <Fab
                  variant="extended"
                  size="medium"
                  aria-label="Add"
                  onClick={() => this.goToCourse(cours.data.type, cours.data, cours.id)
                  }
                  style={{

                    width: '60%',
                    color: 'white',
                    backgroundColor: '#138787',
                    marginLeft: '5%',

                  }}
                >
                  {cours.data.name}
                </Fab>

              </p>

              <p>{cours.data.description}</p>

            </div>
          ))}

        {allCourseCompleted === true ? (
          <>
            {' '}
            <p style={{ marginTop: '5%' }}>Vous pouvez maintenant partager votre réussite !</p>
            {' '}
            <ShareIcon gray={0} />
            {' '}
          </>
        ) : (
          <>
            {' '}
            <p style={{ marginTop: '5%' }}>
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
