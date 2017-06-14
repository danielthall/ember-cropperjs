import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const {
  run
} = Ember;

moduleForComponent('image-cropper-on', 'Integration | Component | image cropper on', {
  integration: true
});

test('it renders', function(assert) {
  const done = assert.async();

  const event = {};

  this.set('eventSource', {
    on(eventName, cb) {
      assert.equal(eventName, 'crop', 'subscribes to lowercased event name');

      run.next(cb, event);
    },

    off() {}
  });

  this.on('onEvent', (ev) => {
    assert.equal(ev, event, 'sends event to the action');
    done();
  });

  this.render(hbs`{{image-cropper-on eventSource=eventSource event='crop' action=(action 'onEvent')}}`);
});

test('it works with positionalParams', function(assert) {
  const done = assert.async();

  const event = {};

  this.set('eventSource', {
    on(eventName, cb) {
      assert.equal(eventName, 'crop', 'subscribes to lowercased event name');

      run.next(cb, event);
    },

    off() {}
  });

  this.on('onEvent', (ev) => {
    assert.equal(ev, event, 'sends event to the action');
    done();
  });

  this.render(hbs`{{image-cropper-on 'crop' (action 'onEvent') eventSource=eventSource}}`);
});
