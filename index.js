'use strict';

module.exports = {
  name: 'ember-cropperjs',

  options: {
    babel: {
      plugins: [
        // Ensure that `ember-auto-import` can handle the dynamic imports
        require('ember-auto-import/babel-plugin')
      ]
    }
  },

  included(app) {
    this._super.included.apply(this, arguments);

    app.import('node_modules/cropperjs/dist/cropper.css');
  }
};
