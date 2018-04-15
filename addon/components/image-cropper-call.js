import { assert } from '@ember/debug';
import Component from '@ember/component';
import { getProperties } from '@ember/object';

const ImageCropperCallComponent = Component.extend({
  tagName: '',

  obj: null,
  func: null,
  args: null,
  onResp: null,
  params: null,

  didReceiveAttrs() {
    this._super(...arguments);

    let { obj, func, args, params } = getProperties(this, 'obj', 'func', 'args', 'params');
    if (args === null && params !== null) {
      if (func !== null) {
        args = params;
      } else {
        [ func, ...args ] = params;
      }
    }

    assert('image-cropper-call obj is required', typeof obj === 'object' && obj !== null);
    assert('image-cropper-call func is required and must be a string', typeof func === 'string');
    assert(`image-cropper-call ${func} must be a function on ${obj}`, typeof obj[func] === 'function');

    this.sendAction('onResp', obj[func].apply(obj, args)); // eslint-disable-line ember/closure-actions
  }
});

ImageCropperCallComponent.reopenClass({
  positionalParams: 'params'
});

export default ImageCropperCallComponent;
