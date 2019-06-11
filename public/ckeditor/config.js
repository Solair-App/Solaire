/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

<<<<<<< HEAD
CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
};
=======
CKEDITOR.editorConfig = function (config) {
  // Define changes to default configuration here. For example:
  // config.language = 'fr';
  // config.uiColor = '#AADC6E';
  config.forceEnterMode = true;
  config.enterMode = CKEDITOR.ENTER_BR;
  config.allowedContent = true;
};

CKEDITOR.on('instanceReady', (ev) => {
  const blockTags = ['div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'li', 'blockquote', 'ul', 'ol',
    'table', 'thead', 'tbody', 'tfoot', 'td', 'th', 'br'];

  for (let i = 0; i < blockTags.length; i++) {
    ev.editor.dataProcessor.writer.setRules(blockTags[i], {
      indent: false,
      breakBeforeOpen: false,
      breakAfterOpen: false,
      breakBeforeClose: false,
      breakAfterClose: false,
    });
  }
});
>>>>>>> dev
