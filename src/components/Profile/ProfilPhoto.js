import React, { Component } from 'react';

// Import React FilePond
import { FilePond } from 'react-filepond';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';

// Our app
class ProfilPhoto extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // Set initial files, type 'local' means this is a file
      // that has already been uploaded to the server (see docs)
      files: [
        {
          source: 'index.html',
          options: {
            type: 'local',
          },
        },
      ],
    };
  }

  handleInit() {
    console.log('FilePond instance has initialised', this.pond);
  }


  render() {
    return (
      <div className="App">
        {/* Pass FilePond properties as attributes */}

        <FilePond
          ref={ref => (this.pond = ref)}
          files={this.state.files}
          allowMultiple
          maxFiles={1}
          server="/api"
          oninit={() => this.handleInit()}
          onupdatefiles={(fileItems) => {
            // Set currently active file objects to this.state
            this.setState({
              files: fileItems.map(fileItem => fileItem.file),
            });
          }}
        />
      </div>
    );
  }
}

export default ProfilPhoto;
