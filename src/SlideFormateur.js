import React, { Component } from 'react';
import CKEditor from 'ckeditor4-react';
import * as firebase from 'firebase';
import './App.css';

CKEditor.editorUrl = '/ckeditor/ckeditor.js';


class Essai extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: null,
      erreur: false,
    };
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
      let { content } = this.state;
      content = JSON.stringify(content);
      if (this.isContentNull()) {
        this.setState({
          erreur: ' Il n\'y a rien à sauvegarder',
        });
      } else {
        const db = firebase.firestore();
        const slideSet = db.collection('slide').doc();
        slideSet.set({ data: this.state.content });
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
        </div>
      );
    }
}

export default Essai;
