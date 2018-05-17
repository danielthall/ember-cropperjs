'use strict';

const Funnel = require('broccoli-funnel');
const MergeTrees = require('broccoli-merge-trees');
const Path = require('path');

module.exports = {
  name: 'ember-cropperjs',

  isDevelopingAddon: function() {
    return true;
  },

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

  treeForVendor(tree) {
    var cropperJSTree = new Funnel(Path.join(this.project.root, 'node_modules', 'cropperjs/dist'), {
      files: ['cropper.js'],
      destDir: 'cropperjs'
    });

    if (tree) {
      return new MergeTrees([ tree, cropperJSTree ]);
    }

    return cropperJSTree;
  },

  included(app) {
    this._super.included.apply(this, arguments);

    const srcFile = 'vendor/cropperjs/cropper.js';

    app.import(srcFile, {
      using: [
        { transformation: 'amd', as: 'cropperjs' }
      ]
    });

    app.import('app/styles/cropper.css');
  }
};
