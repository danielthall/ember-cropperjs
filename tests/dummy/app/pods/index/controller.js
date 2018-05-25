/* eslint-disable */
import { set, get } from '@ember/object';

import Controller from '@ember/controller';

export default Controller.extend({
  aspectRatio: 1,
  cropBoxMovable: true,
  cropBoxResizable: true,

  source: 'sinbad2_800x600.jpg'
});
