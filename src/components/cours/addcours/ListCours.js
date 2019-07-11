import React, { Component } from 'react';
import Fab from '@material-ui/core/Fab';
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
      <div>
        <SimpleModal open={open} idCours={coursId} togle={this.toggle} deleted={this.delete} />

        {allCourses && allCourses.map((cours, i) => (
          <div key={`${i + 1}y`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={`./assets/${cours.data.type}.png`} style={{ width: '3em' }} alt={cours.data.type} />
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start',
            }}
            >
              <div style={{ display: 'flex' }}>
                {cours.data.name}
                {' '}
                <div>
                  <Fab
                    variant="extended"
                    size="medium"
                    aria-label="Add"
                    style={{

                      width: '30%',
                      color: 'white',
                      backgroundColor: '#138787',

                    }}
                  >
                    <Edit style={{ fontSize: 20 }} onClick={() => this.goToCourse(cours.data.type, cours.data, cours.id)} />
                  </Fab>
                </div>
                <Fab
                  variant="extended"
                  size="medium"
                  aria-label="Add"
                  style={{

                    width: '30%',
                    color: 'white',
                    backgroundColor: '#138787',
                  }}
                >
                  <DeleteIcon onClick={() => this.open(cours.id)} style={{ fontSize: 20 }} />
                </Fab>

              </div>
            </div>
          </div>
        ))}

      </div>
    );
  }
}

export default withRouter(withFirebaseContext(ListCours));
