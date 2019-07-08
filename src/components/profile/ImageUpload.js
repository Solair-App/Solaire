import React, { Component } from 'react';
import './profile.scss';
import Fab from '@material-ui/core/Fab';
import CloudUpload from '@material-ui/icons/CloudUpload';
import LooksOne from '@material-ui/icons/LooksOne';
import LooksTwo from '@material-ui/icons/LooksTwo';
import withFirebaseContext from '../../Firebase/withFirebaseContext';
import '../../SCSS/CreateParcours.scss';

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      url: null,
      error: null,
      upload: true,
    };
  }

  handleChange = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({ image, upload: false }));
    }
  }

  handleUpload = () => {
    const { image } = this.state;
    const { storage, getImage } = this.props;
    const random = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
    const imageName = `${image.name}${random}`;
    storage.ref(`images/${imageName}`).put(image).then(() => {
      storage.ref('images').child(imageName).getDownloadURL().then((url) => {
        this.setState({ url });
        getImage(url);
      })
        .catch((error) => {
          this.setState({ error: error.message });
        });
    }).catch((error) => {
      console.log(error);
      this.setState({ error: 'Les images doivent faire moins de 1mb' });
    });
  }

  render() {
    const { url, error, upload } = this.state;
    return (
      <div className="image_uplaods">
        <div className="image_zone">
          <p className="ajout">Ajouter une image</p>
          <LooksOne style={{ marginRight: '5px', fontSize: '30px' }} />
          <input accept=".jpg, .jpeg, .png" id="image_uploads" name="image_uploads" type="file" onChange={this.handleChange} />
        </div>
        <p>
          <LooksTwo style={{ fontSize: '30px' }} />
          <Fab
            variant="extended"
            disabled={upload}
            size="medium"
            aria-label="Add"
            style={{
              marginTop: '10px',
              marginLeft: '10px',
              width: '100px',
              color: 'white',
              backgroundColor: '#E15920',
            }}
            type="button"
            onClick={this.handleUpload}
          >
            <CloudUpload className="cloudupload" />
                  Upload
          </Fab>
        </p>
        {' '}
        {url && <img alt="upload" src={url} className="uploadimg" />}
        {error && <p>{error}</p>}
      </div>
    );
  }
}

export default withFirebaseContext(ImageUpload);
