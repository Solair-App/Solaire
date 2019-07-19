/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import RadioButtonUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonChecked from '@material-ui/icons/RadioButtonChecked';
import { withRouter } from 'react-router';
import withFirebaseContext from '../../../Firebase/withFirebaseContext';
import ShareIcon from './ShareIcon';
import './SeeParcours.scss';


class CoursDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coursFromParcours: [],
    };
    this.slide = { backgroundColor: 'red' };
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
          if (doc.data().name) {
            cours.push({ id: doc.id, data: doc.data() });
          }
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
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: 10,
                  justifyContent: 'center',
                  color: '#138787',
                  overflow: 'hidden',
                  width: '100%',
                }}
              >
                {cours.data.graduate
              && cours.data.graduate.includes(localStorage.getItem('userId')) ? (
                <RadioButtonChecked style={{ marginLeft: '-15px' }} />
                  ) : (
                    <RadioButtonUnchecked />
                  )}
                <div
                  role="presentation"
                  onClick={() => this.goToCourse(cours.data.type, cours.data, cours.id)}
                  style={{
                    width: '85%',
                    color: 'black',
                    marginLeft: 5,
                    display: 'flex',
                  }}
                  className="parentSlide"
                >
                  <div className={cours.data.type} style={{ height: 85 }}>
                    <img
                      src={`./assets/${cours.data.type}.png`}
                      style={{
                        alignItems: 'center', width: 50, justifyContent: 'center', padding: 15,
                      }}
                      alt={cours.data.type}
                    />
                  </div>
                  <div style={{
                    width: '90%',
                    overflow: 'scroll',
                    height: 85,
                    backgroundColor: 'white',
                    borderTopRightRadius: 5,
                    borderBottomRightRadius: 5,
                  }}
                  >
                    <h2 style={{ paddingTop: '2vw', paddingBottom: 5, fontSize: 14 }}>{cours.data.name}</h2>

                    <p style={{
                      paddingLeft: 5, paddingRight: 5, fontSize: 12,
                    }}
                    >
                      {cours.data.description}

                    </p>
                  </div>
                </div>
              </div>
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
          <div style={{ marginBottom: 30 }}>
            {' '}
            <p style={{ marginTop: '5%' }}>
              Complétez encore
              {' '}
              {`${coursLength - graduatedLessons} `}
              {' '}
cours pour
              pouvoir partager la complétion de ce parcours !
            </p>
            <ShareIcon gray={1} />
          </div>
        )}
      </>
    );
  }
}

export default withRouter(withFirebaseContext(CoursDetails));
