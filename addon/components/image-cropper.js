import { compare } from '@ember/utils';
import { copy } from '@ember/object/internals';
import { scheduleOnce } from '@ember/runloop';
import { setProperties, set, get } from '@ember/object';
import Component from '@ember/component';
import Cropper from 'cropperjs';
import layout from '../templates/components/image-cropper';

// Properties that do not require a new Cropper instance, rather just need to call
// a method on the existing instance
const OPT_UPDATE_METHODS = {
  'aspectRatio': 'setAspectRatio'
};

// Properties that require a completely new Cropper instance
const OPTS_REQUIRE_NEW = [
  'cropBoxResizable',
  'cropBoxMovable'
];

/**
  A component that renders a cropper.
  ```hbs
  {{#image-cropper
    alt='sinbad'
    source='sinbad.jpg'
    options=(hash
      viewMode=2
      width=256
      height=256)}}

  {{!-- yielded content --}}

  {{/image-cropper}}
  ```
  @class ImageCropper
  @public
*/
export default Component.extend({
  classNames: [ 'image-cropper' ],
  layout,

  /**
    The attribute defining the alternative text describing the cropper canvas.

    @argument alt
    @type String
  */
  alt: '',

  /**
    The image source to crop.

    @argument source
    @type String
  */
  source: null,

  /**
    The options to pass down to the Cropper.js instance. Use [Cropper.js options](https://github.com/fengyuanchen/cropperjs#options)
    for reference.

    @argument options
    @type Object
  */
  options: null,

  replaceHasSameSize: false,

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
    const replaceHasSameSize = get(this, 'replaceHasSameSize');

    if (_cropper === null) {
      return;
    }

    // Check if the image source changed
    if (compare(get(this, 'source'), get(this, '_prevSource')) !== 0) {
      const source = get(this, 'source');

      _cropper.replace(source, replaceHasSameSize);
      set(this, '_prevSource', source);
    }

    const options = get(this, 'options');

    if (!options) {
      return;
    }

    // Requires to destroy and re-instantiate a new Cropper instance
    if (OPTS_REQUIRE_NEW.some((opt) => compare(options[opt], this._prevOptions[opt]) !== 0)) {
      _cropper.destroy();

      const opts = copy(options);

      setProperties(this, {
        _prevOptions: opts,
        _cropper: new Cropper(document.getElementById(`image-cropper-${get(this, 'elementId')}`), opts)
      });

      return;
    }

    // Diff the `options` hash for changes
    for (let i = 0; i < Object.keys(OPT_UPDATE_METHODS).length; i++) {
      const opt = Object.keys(OPT_UPDATE_METHODS)[i];

      if (compare(options[opt], this._prevOptions[opt]) !== 0) {
        _cropper[OPT_UPDATE_METHODS[opt]](options[opt]);
      }
    }

    set(this, '_prevOptions', copy(options));
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
