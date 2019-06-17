import React, { Component } from 'react';
import RadioButtonUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import LockOpen from '@material-ui/icons/LockOpen';
import { connect } from 'react-redux';
import withFirebaseContext from '../../../Firebase/withFirebaseContext';
import { mapDispatchToProps } from '../../../actions/action';

const mapStateToProps = state => ({
  state,
});
class ListCours extends Component {
  constructor(props) {
    super(props);
    this.getInfo();
  }

  getInfo = () => {
    const { state } = this.props;
    const idParcours = localStorage.getItem('id');
    localStorage.setItem('parcoursId', idParcours);
    if ((state && !state.cours) || !state || (state && state.parcours.id !== idParcours)) {
      // eslint-disable-next-line no-shadow
      const { firestore, mapDispatchToProps } = this.props;
      const cours = [];
      firestore.collection('parcours').doc(localStorage.getItem('id')).collection('cours').get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            cours.push({ id: doc.id, data: doc.data() });
            // doc.data() is never undefined for query doc snapshots
            mapDispatchToProps(cours, 'cours');
          });
        });
    }
  }

  goToCourse = (type, data, id) => {
    const { history } = this.props;
    localStorage.setItem('coursId', id);
    history.push({
      pathname: `/${type}`,
      state: { data },
    });
  }

  render() {
    const { state } = this.props;
    return (
      <div>
        {state && state.cours && state.cours.map(cours => (
          <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <RadioButtonUnchecked />
              <img src={`./assets/${cours.data.type}.png`} style={{ width: '4em' }} alt={cours.data.type} />
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start',
              }}
              >
                <button
                  type="button"
                  onClick={() => this.goToCourse(cours.data.type, cours.data, cours.id)}
                >
                  {cours.data.name}
                </button>
                {' '}
                <p>
                  {cours.data.description}
                </p>
              </div>
            </div>
            <div>
              <ArrowDownward />
            </div>
            <div>
              <LockOpen />
              <div>
                <ArrowDownward />
              </div>
            </div>
          </>
        ))}

        <p style={{ marginTop: '10px' }}>
          <RadioButtonUnchecked style={{ marginRight: '10px' }} />
          Certification
        </p>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { mapDispatchToProps },
)(withFirebaseContext(ListCours));
