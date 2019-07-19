import React, { Component } from 'react';
import { withRouter } from 'react-router';
import DeleteIcon from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import SimpleModal from '../../SimpleModal';
import withFirebaseContext from '../../../Firebase/withFirebaseContext';


class ListCours extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allCourses: [],
      open: false,
      coursId: '',
    };
    this.getInfo();
  }

  getInfo = () => {
    const { parcours } = this.props;
    const idParcours = localStorage.getItem('id');
    localStorage.setItem('parcoursId', idParcours);
    // eslint-disable-next-line no-shadow
    const { firestore } = this.props;
    const cours = [];
    firestore.collection('parcours').doc(parcours).collection('cours').get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          cours.push({ id: doc.id, data: doc.data() });
        });
        // doc.data() is never undefined for query doc snapshots
        this.setState({ allCourses: cours });
      });
  }

  goToCourse = (type, data, id) => {
    const { history, parcours } = this.props;
    let currentType;
    let video = null;
    switch (type) {
      case 'slide':
        currentType = 'createslider';
        break;
      case 'video':
        currentType = 'addvideo';
        video = data;
        break;
      case 'quiz':
        currentType = 'addquiz';
        break;
      default:
        break;
    }
    history.push({
      pathname: `/createparcours/${parcours}/${id}/${currentType}`,
      state: { video },
    });
  }

  open = (id) => {
    this.setState({ open: true, coursId: id });
  }

  toggle = () => {
    this.setState({ open: false });
  }

  delete = (idCours) => {
    const { firestore, parcours } = this.props;

    firestore.collection('parcours').doc(parcours).collection('cours').doc(idCours)
      .delete()
      .then(() => {
        console.log(`Document ${idCours} successfully deleted!`);
      })
      .catch((error) => {
        console.error('Error removing document: ', error);
      });
    this.toggle();
    this.getInfo();
  }

  render() {
    const { allCourses, open, coursId } = this.state;
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginTop: 10,
        justifyContent: 'center',
        flexDirection: 'column',
        color: '#138787',
        overflow: 'hidden',
        width: '100%',
      }}
      >
        <SimpleModal open={open} idCours={coursId} togle={this.toggle} deleted={this.delete} />

        {allCourses.length > 0 && allCourses.map((cours, i) => (
          <div
            key={`${i + 1}y`}
            className="parentSlide"
            style={{
              width: '95%',
              color: 'black',
              marginLeft: 5,
              display: 'flex',

            }}
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
            <div
              style={{
                width: '90%',
                overflow: 'scroll',
                height: 85,
                backgroundColor: 'white',
                borderTopRightRadius: 5,
                borderBottomRightRadius: 5,
                marginBottom: 10,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h2 style={{
                  paddingTop: '2vw', paddingBottom: 5, fontSize: 14, marginLeft: 60, paddingRight: 60,
                }}
                >
                  {cours.data.name}

                </h2>
                <div style={{
                  paddingRight: 20, width: 10, height: 10, position: 'absolute', display: 'flex', right: '8vw', paddingTop: 5,
                }}
                >
                  <Edit style={{ fontSize: 25, color: '#138787' }} onClick={() => this.goToCourse(cours.data.type, cours.data, cours.id)} />
                  <DeleteIcon onClick={() => this.open(cours.id)} style={{ fontSize: 25, color: '#138787', marginRight: '15px' }} />
                </div>
              </div>
              <p style={{ paddingLeft: 5, paddingRight: 5, fontSize: 12 }}>{cours.data.description}</p>

            </div>
          </div>
        ))}

      </div>
    );
  }
}

export default withRouter(withFirebaseContext(ListCours));
