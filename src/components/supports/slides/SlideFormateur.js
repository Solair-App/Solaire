import React, { Component } from 'react';
import CKEditor from 'ckeditor4-react';
import TextField from '@material-ui/core/TextField';
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
      title: null,
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
    const { content, title } = this.state;

    if (content === null || title === null) {
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
  }


  render() {
    const { content, erreur, title } = this.state;
    return (
      <div className="slide">
        <h1>Créer une Slide</h1>
        <h2>Ajouter un titre*</h2>
        <TextField
          required
          id="standard-name"
          label="Nom du parcours"
          className="textfield"
          value={title}
          onChange={this.handleChange}
          style={{ marginTop: '5%', width: '50%' }}
        />
        <h2>Ajouter un paragraphe*</h2>
        <CKEditor
          data="<p>Taper votre texte ici</p>"
          activeClass="editor"
          value={content}
          onChange={this.updateContent}
        />
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
        <button onClick={this.saveData} type="submit">Sauvegarder</button>
      </div>
    );
  }
}

export default withFirebaseContext(Essai);
