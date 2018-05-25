import AddonDocsRouter, { docsRoute } from 'ember-cli-addon-docs/router';
import config from './config/environment';

const Router = AddonDocsRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,
});

Router.map(function() {
  docsRoute(this, function() {
    this.route('introduction');
    this.route('usage');

    this.route('components', function() {
      this.route('image-cropper');
      this.route('image-cropper-on');
    })
  });

  this.route('not-found', { path: '/*path' });
});

export default Router;