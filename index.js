'use strict';

const Funnel = require('broccoli-funnel');
const MergeTrees = require('broccoli-merge-trees');
const Path = require('path');

module.exports = {
  name: 'ember-cropperjs',

  treeForStyles(tree) {
    var cropperJSTree = new Funnel(Path.join(this.project.root, 'node_modules', 'cropperjs/dist'), {
      files: ['cropper.css'],
      destDir: 'app/styles'
    });

    if (tree) {
      return new MergeTrees([ tree, cropperJSTree ]);
    }

    return cropperJSTree;
  },

  included(app) {
    this._super.included.apply(this, arguments);

    app.import('app/styles/cropper.css');
  }
};
