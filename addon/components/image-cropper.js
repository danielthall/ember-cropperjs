import { scheduleOnce } from '@ember/runloop';
import Component from '@ember/component';
import { copy } from '@ember/object/internals';
import { setProperties, set, get } from '@ember/object';
import { compare } from '@ember/utils';
import layout from '../templates/components/image-cropper';
import Cropper from 'cropperjs'

// Properties that do not require a new Cropper instance, rather just need to call
// a method on the existing instance
const OPT_UPDATE_METHODS = {
  'aspectRatio': 'setAspectRatio'
};

export default Component.extend({
  classNames: [ 'image-cropper' ],
  layout,

  alt: '',
  source: null,
  options: null,

  _cropper: null,
  _prevOptions: null,
  _prevSource: null,

  didInsertElement() {
    this._super(...arguments);

    scheduleOnce('afterRender', this, this._setup);
  },

  didUpdateAttrs() {
    this._super(...arguments);

    const _cropper = get(this, '_cropper');

    if (_cropper === null) {
      return;
    }

    // Check if the image source changed
    if (compare(get(this, 'source'), get(this, '_prevSource')) !== 0) {
      const source = get(this, 'source');

      _cropper.replace(source);
      set(this, '_prevSource', source);
    }

    const options = get(this, 'options');

    if (options) {
      // Diff the `options` hash for changes
      for (let i = 0; i < Object.keys(OPT_UPDATE_METHODS).length; i++) {
        const opt = Object.keys(OPT_UPDATE_METHODS)[i];

        if (compare(options[opt], this._prevOptions[opt]) !== 0) {
          _cropper[OPT_UPDATE_METHODS[opt]](options[opt]);
        }
      }

      set(this, '_prevOptions', copy(options));
    }
  },

  willDestroyElement() {
    this._super(...arguments);

    const _cropper = get(this, '_cropper');
    if (_cropper !== null) {
      _cropper.destroy();
    }
  },

  _setup() {
    const image = document.getElementById(`image-cropper-${get(this, 'elementId')}`);
    const options = get(this, 'options');

    // Need a copy because Cropper does not seem to like the Ember EmptyObject that is created from the `{{hash}}` helper
    const opts = copy(options);

    setProperties(this, {
      _cropper: new Cropper(image, opts),
      _prevOptions: copy(get(this, 'options')),
      _prevSource: copy(get(this, 'source'))
    });
  }
});
