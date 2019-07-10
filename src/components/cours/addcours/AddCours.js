import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Edit from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import Add from '@material-ui/icons/Add';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import withFirebaseContext from '../../../Firebase/withFirebaseContext';
import ListCours from './ListCours';
import TypeCours from './TypeCours';
import './AddCours.scss';

class AddCours extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      copyMessage: 'Copier le lien du cours',
    };
    const { match } = this.props;
    this.parcours = match.params.parcoursId;
    this.cours = '';
    this.getDataBaseData();
  }

  submit = () => {
    this.makeCourseReadable();
    const { history } = this.props;
    const { privacy } = this.state;
    if (privacy === 'Privé' || privacy === 'Public') { history.push('/mydashboard'); }
  };

  getDataBaseData = () => {
    const { firestore } = this.props;
    const db = firestore;
    const parcours = db.collection('parcours').doc(this.parcours);
    parcours.get().then((doc) => {
      const parcoursData = doc.data();
      this.setState({
        data: parcoursData,
      });
    });
  };

  redirect = (url) => {
    const { history } = this.props;
    history.push(url);
  };

  getType = (event) => {
    const { firestore, match } = this.props;
    this.parcours = match.params.parcoursId;
    const db = firestore;
    const type = event.target.value;
    const courseSet = db
      .collection('parcours')
      .doc(this.parcours)
      .collection('cours')
      .doc();
    localStorage.setItem('coursId', courseSet.id);
    this.cours = courseSet.id;

    let cours;
    switch (type) {
      case 'Quizz':
        cours = 'addquiz';
        localStorage.setItem('questionNumb', 0);
        break;
      case 'Vidéo':
        cours = 'addvideo';
        break;
      case 'Slide':
        cours = 'createslider';
        localStorage.setItem('slideNumb', 0);
        break;
      default:
    }
    this.setState({
      cours,
    });
  };

  makeCourseReadable = () => {
    const { privacy } = this.state;
    const { firestore } = this.props;
    const db = firestore;
    const courseSet = db.collection('parcours').doc(this.parcours);
    if (privacy === 'Public') {
      courseSet.set(
        {
          isReadable: true,
        },
        { merge: true },
      );
    }

    if (privacy === 'Privé') {
      courseSet.set(
        {
          isReadable: false,
        },
        { merge: true },
      );
    } else {
      this.setState({
        errorMessage: 'Veuillez selectionner un type de parcours',
      });
    }
  };

copyLink = () => {
  this.textArea.select();
  document.execCommand('copy');
  this.setState({
    copyMessage: 'Lien copié !',
  });
}

  redirectToLessons = () => {
    const { history } = this.props;
    const { cours } = this.state;
    history.push({
      pathname: `/createparcours/${this.parcours}/${this.cours}/${cours}`,
      state: { cours: true },
    });
  };

  handleChange = (e) => {
    this.setState({
      privacy: e.target.value,
    });
  };

  render() {
    const {
      data, privacy, errorMessage, copyMessage,
    } = this.state;


    return (
      <div>
        <div className="backparcours">
          <h1>{data.name}</h1>
        </div>
        <Link to={`/createparcours/${this.parcours}`}>
          <Button color="primary">
            <Edit />
            Modifier les options
          </Button>
        </Link>
        <ListCours courseName={data} parcours={this.parcours} />
        <TypeCours getType={this.getType} />
        <Button
          onClick={() => {
            this.redirectToLessons(data);
          }}
        >
          {' '}
          <Add style={{ marginRight: '10px' }} />
          Ajouter un cours
        </Button>
        <div style={{ marginTop: '50px', marginBottom: '50px' }}>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="Type"
              name="Type"
              onChange={this.handleChange}
              value={privacy}
            >
              <FormControlLabel
                value="Privé"
                control={<Radio />}
                label="Parcours privé"
              />
              <FormControlLabel
                value="Public"
                control={<Radio />}
                label="Parcours public"
              />
              {' '}
            </RadioGroup>
          </FormControl>
        </div>
        <div>
          {privacy === 'Privé' ? (
            <>
              <Button onClick={this.copyLink}>{copyMessage}</Button>
              {' '}
              <form>
                <textarea

                // eslint-disable-next-line no-return-assign
                  ref={textarea => this.textArea = textarea}
                  value={document.location.href}
                />
                {' '}
              </form>
            </>
          ) : null}
          <p>{errorMessage}</p>
          <Button
            fullWidth
            size="large"
            onClick={this.submit}
            variant="contained"
          >
            Valider
          </Button>
        </div>
      </div>
    );
  }
}

export default withRouter(withFirebaseContext(AddCours));
