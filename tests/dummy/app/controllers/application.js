/* eslint-disable */
import Ember from 'ember';

const {
  Controller
} = Ember;

export default Controller.extend({
  actions: {
    crop(cropper, e) {
      console.log('cropper', cropper, 'e', e);
    }
  }
});
