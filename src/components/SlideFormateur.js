import React, { Component } from 'react';
import CKEditor from 'ckeditor4-react';
import { Link } from 'react-router-dom';
import withFirebaseContext from '../Firebase/withFirebaseContext';
import '../App.scss';

CKEditor.editorUrl = '/ckeditor/ckeditor.js';


class Essai extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: null,
      erreur: false,
    };
  }

  componentDidMount() {
    const { location, history } = this.props;
    if (!location.state || !location.state.cours) {
      history.push('/CreateParcours');
    }
  }

  updateContent = (evt) => {
    this.setState({ content: evt.editor.getData() });
  }


  isContentNull = () => {
    const { content } = this.state;

    if (content === null) {
      return true;
    }

    return false;
  }

  saveData = () => {
    const { firestore } = this.props;

    let { content } = this.state;
    content = JSON.stringify(content);
    if (this.isContentNull()) {
      this.setState({
        erreur: ' Il n\'y a rien à sauvegarder',
      });
    } else {
      const db = firestore;
      /* besoin creation document cours avec un array vide 'slides' quand le formateur clique sur ajouter un cours'. On a besoin aussi de la clé du parcours et de la clé du cours */
      // const slideSet = db.collection('parcours').doc(localStorage.getItem('id')).collection('cours').add({ slides: [content] });
      const slideSet = db.collection('parcours').doc(localStorage.getItem('id')).collection('cours');

      const slide = slideSet.doc(localStorage.getItem('coursId'));
      const slideNumber = parseInt(localStorage.getItem('slideNumb'), 10) + 1;
      localStorage.setItem('slideNumb', slideNumber);
      slide.set({ slides: { [slideNumber]: content } }, { merge: true });
      // localStorage.setItem('cours', slide.id);
      // slide.update({ slides: firebase.firestore.FieldValue.arrayUnion(content) });
      // slideSet.update({ slides: firebase.firestore.FieldValue.arrayRemove(content) });
    }
  }


  render() {
    const { content, erreur } = this.state;
    return (
      <div className="slide">
        <CKEditor
          data="<p>Taper votre texte ici</p>"
          activeClass="editor"
          value={content}
          onChange={this.updateContent}
        />
        <div>
          {erreur ? (
            <p style={{ color: 'red' }}>
              {erreur}
            </p>
          ) : ''}
        </div>
        <button onClick={this.saveData} type="submit">Sauvegarder</button>
        <Link to="/slideApprenant"><p>Voir mes slides</p></Link>
      </div>
    );
  }
}

export default withFirebaseContext(Essai);
