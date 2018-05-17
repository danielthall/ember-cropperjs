/* eslint-disable */
import { set, get } from '@ember/object';

import Controller from '@ember/controller';

export default Controller.extend({
  aspectRatio: 1,
  source: 'sinbad2_800x600.jpg',

  actions: {
    crop(cropper, e) {
      console.log('cropper', cropper, 'e', e);
    },
    sinbad() {
      set(this, 'source', 'sinbad2_800x600.jpg');
    },
    sinbadd() {
      set(this, 'source', 'sinbadd.jpg');
    }
  }
});
