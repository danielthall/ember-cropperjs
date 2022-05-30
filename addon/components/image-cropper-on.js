import { assert } from '@ember/debug';
import Component from '@ember/component';
import { getProperties, get, computed } from '@ember/object';
import { isPresent } from '@ember/utils';
import { bind } from '@ember/runloop';

/**
  A component used for responding to cropper events. Typically used via the image-cropper
  contextual component with positional parameters like so:

  ```hbs
  {{#image-cropper
    alt='sinbad'
    source='sinbad.jpg'
    options=(hash
      viewMode=2
      width=256
      height=256)
  as |cropper|}}

  {{cropper.on 'crop' (action 'cropImage')}}

  {{/image-cropper}}
  ```
  @class ImageCropperOn
  @public
*/
const ImageCropperOnComponent = Component.extend({
  tagName: '',

  cropper: null,

  eventSource: null,
  /**
    The [event from Cropper.js](https://github.com/fengyuanchen/cropperjs#events) to listen for.

    @argument event
    @type String
  */
  event: null,

  /**
    The action to call when the event is triggered.

    @argument action
    @type Action
  */
  action: null,

  _prevEvent: null,

  init() {
    this._super(...arguments);

    this._boundOnEvent = bind(this, this._onEvent);
  },

  _normalizedEvent: computed('event', function() {
    const event = get(this, 'event');
    assert(`image-cropper-event requires event to be a string, was ${event}`, typeof event === 'string');

    return event.toLowerCase();
  }),

  didReceiveAttrs() {
    this._super(...arguments);

    const { eventSource, _normalizedEvent, _prevEvent, action } =
      getProperties(this, 'eventSource', '_normalizedEvent', '_prevEvent', 'action');

    assert('image-cropper-event requires an eventSource', isPresent(eventSource));
    assert('image-cropper-event requires an action', isPresent(action));

    if (_normalizedEvent !== _prevEvent) {
      if (_prevEvent) {
        eventSource.removeEventListener(_prevEvent, this._boundOnEvent);
      }

      this._prevEvent = _normalizedEvent;
      eventSource.addEventListener(_normalizedEvent, this._boundOnEvent);
    }
  },

  willDestroy() {
    this._super(...arguments);

    const { eventSource, _prevEvent } = getProperties(this, 'eventSource', '_prevEvent');
    if (eventSource && _prevEvent) {
      eventSource.removeEventListener(_prevEvent, this._boundOnEvent);
    }
  },

  _onEvent() {
    if (this.isDestroyed || this.isDestroying) {
      return;
    }

    const { action } = this;

    if (action) {
      action(this.cropper, ...arguments);
    }
  }
});

ImageCropperOnComponent.reopenClass({
  positionalParams: [ 'event', 'action' ]
});

export default ImageCropperOnComponent;
