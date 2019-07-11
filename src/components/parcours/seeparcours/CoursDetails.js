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
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: 20,
                  justifyContent: 'center',
                  color: '#138787',
                  overflow: 'hidden',
                }}
              >
                {cours.data.graduate
              && cours.data.graduate.includes(localStorage.getItem('userId')) ? (
                <RadioButtonChecked />
                  ) : (
                    <RadioButtonUnchecked />
                  )}
                <div
                  role="presentation"
                  onClick={() => this.goToCourse(cours.data.type, cours.data, cours.id)}
                  style={{
                    width: 305,
                    color: 'black',
                    marginLeft: '2%',
                    display: 'flex',
                  }}
                >
                  <div className={cours.data.type}>
                    <img
                      src={`./assets/${cours.data.type}.png`}
                      style={{
                        alignItems: 'center', width: 40, justifyContent: 'center', padding: 15,
                      }}
                      alt={cours.data.type}
                    />
                  </div>
                  <div style={{
                    width: 350,
                    height: 70,
                    backgroundColor: 'white',
                    overflow: 'hidden',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                  }}
                  >
                    <h2 style={{ paddingBottom: 5, fontSize: 18 }}>{cours.data.name}</h2>

                    <p style={{ paddingBottom: 5 }}>{cours.data.description}</p>
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
          <>
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
          </>
        )}
      </>
    );
  }
}

export default withRouter(withFirebaseContext(CoursDetails));
