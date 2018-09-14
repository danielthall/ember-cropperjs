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

  treeForStyles(tree) {
    var cropperJSTree = require('broccoli-funnel')(require('path').dirname(require.resolve('cropperjs')), {
      files: ['cropper.css'],
      destDir: 'app/styles'
    });

    if (tree) {
      return require('broccoli-merge-trees')([ tree, cropperJSTree ]);
    }

    return cropperJSTree;
  },

  included(app) {
    this._super.included.apply(this, arguments);

    app.import('app/styles/cropper.css');
  }
};
