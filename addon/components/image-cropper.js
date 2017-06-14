import Ember from 'ember';
import layout from '../templates/components/image-cropper';
import Cropper from 'cropperjs'

const {
  Component,
  copy,
  get,
  run,
  set
} = Ember;

export default Component.extend({
  classNames: [ 'image-cropper' ],

  layout,

  cropper: null,
  options: null,

  didInsertElement() {
    this._super(...arguments);

    run.scheduleOnce('afterRender', this, this._setup);
  },

  _setup() {
    const image = document.getElementById(`image-cropper-${get(this, 'elementId')}`);
    const options = get(this, 'options');

    // Need a copy because Cropper does not seem to like the Ember EmptyObject that is created from the `{{hash}}` helper
    const opts = copy(options);

    const cropper = new Cropper(image, opts);

    return set(this, 'cropper', cropper);
  }
});
