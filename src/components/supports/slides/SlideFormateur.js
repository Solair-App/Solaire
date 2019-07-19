import React, { Component } from 'react';
import CKEditor from 'ckeditor4-react';
import TextField from '@material-ui/core/TextField';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Fab from '@material-ui/core/Fab';
import withFirebaseContext from '../../../Firebase/withFirebaseContext';
import ImageUpload from '../../profile/ImageUpload';
import '../../../App.scss';

CKEditor.editorUrl = '/ckeditor/ckeditor.js';

class Essai extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: null,
      erreur: false,
      title: '',
      image: '',
    };
    const { match } = this.props;
    this.parcours = match.params.parcoursId;
    this.cours = match.params.coursId;
  }

  updateContent = (evt) => {
    this.setState({ content: evt.editor.getData() });
  }

  handleChange = (e) => {
    this.setState({ title: e.target.value });
  }

  // récupération url
  getImage = (url) => {
    this.setState({ image: url });
  };

  isContentNull = () => {
    const { title } = this.state;

    if (title === null) {
      return true;
    }
    return false;
  }


  saveData = () => {
    const { firestore, history } = this.props;
    const { content, title, image } = this.state;
    // content = JSON.stringify(content);
    if (this.isContentNull()) {
      this.setState({
        erreur: ' Il n\'y a rien à sauvegarder',
      });
    } else {
      const db = firestore;
      /* besoin creation document cours avec un array vide 'slides' quand le
      formateur clique sur ajouter un cours'. On a besoin aussi de la clé du
      parcours et de la clé du cours */
      /* const slideSet = db.collection('parcours')
      .doc(localStorage.getItem('id')).collection('cours').add({ slides: [content] }); */
      const slideSet = db.collection('parcours').doc(this.parcours).collection('cours');
      const slide = slideSet.doc(this.cours);
      const slideNumber = parseInt(localStorage.getItem('slideNumb'), 10) + 1;
      localStorage.setItem('slideNumb', slideNumber);
      slide.set({
        slides: {
          [slideNumber]:
        {
          content,
          title,
          image,
        },
        },
      }, { merge: true });
      // localStorage.setItem('cours', slide.id);
      // slide.update({ slides: firebase.firestore.FieldValue.arrayUnion(content) });
      // slideSet.update({ slides: firebase.firestore.FieldValue.arrayRemove(content) });
    }
    history.push({
      pathname: `/createparcours/${this.parcours}/${this.cours}/createslider`,
      state: { cours: true },
    });
  };

  back = () => {
    const { history } = this.props;
    history.push(`/createparcours/${this.parcours}/${this.cours}/createslider`);
  }

  render() {
    const { content, erreur, title } = this.state;
    return (
      <div className="slide">
        <div className="topFond">
          <ArrowBack
            style={{
              position: 'absolute', left: '10px', top: '10px', color: 'white',
            }}
            onClick={this.back}
          />
          <h1>Créer une Slide</h1>
        </div>

        <h2>Ajouter un titre*</h2>
        <TextField
          required
          id="standard-name"
          label="Nom du slide"
          value={title}
          onChange={this.handleChange}
          style={{ width: '50%' }}
        />
        <div className="titleSlideFormateur">
          <h2>Ajouter un paragraphe*</h2>
        </div>
        <div className="CKEditor">
          <CKEditor
            data="<p>Taper votre texte ici</p>"
            activeClass="editor"
            value={content}
            onChange={this.updateContent}
          />
        </div>

        <h2>Ajouter une image</h2>
        <div style={{ marginTop: '1.5em' }}>
          <ImageUpload getImage={this.getImage} />
        </div>
        <div>
          {erreur ? (
            <p style={{ color: 'red' }}>
              {erreur}
            </p>
          ) : ''}
        </div>
        <Fab
          variant="extended"
          size="medium"
          aria-label="Add"
          style={{
            width: '210px',
            color: 'white',
            marginBottom: '14px',
            marginTop: '30px',
            backgroundColor: '#138787',
          }}
          onClick={this.saveData}
          type="submit"
        >
Sauvegarder

        </Fab>

      </div>
    );
  }
}

export default withFirebaseContext(Essai);
