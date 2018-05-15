import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const {
  run
} = Ember;

moduleForComponent('image-cropper-on', 'Integration | Component | image cropper on', {
  integration: true
});

test('it passes the cropper instance and arguments to the provided action as arguments', function(assert) {
  const done = assert.async();

  const cropper = { name: 'cropper-instance' };

  this.set('cropper', cropper);
  this.set('eventSource', {
    addEventListener(eventName, cb) {
      assert.equal(eventName, 'crop', 'subscribes to lowercased event name');

      run.next(cb, 'crop');
    },

    removeEventListener() {}
  });

  this.on('onEvent', (instance, args) => {
    assert.equal(instance, cropper, 'expected cropper instance to be returned');
    assert.equal(args, 'crop', 'sends event to the action');
    done();
  });

  this.render(hbs`{{image-cropper-on eventSource=eventSource event='crop' action=(action 'onEvent') cropper=cropper}}`);
});

test('it passes the cropper instance and arguments to the provided action as arguments with positionalParams', function(assert) {
  const done = assert.async();

  const cropper = { name: 'cropper-instance' };

  this.set('cropper', cropper);
  this.set('eventSource', {
    addEventListener(eventName, cb) {
      assert.equal(eventName, 'crop', 'subscribes to lowercased event name');

      run.next(cb, 'crop');
    },

    removeEventListener() {}
  });

  this.on('onEvent', (instance, args) => {
    assert.equal(instance, cropper, 'expected cropper instance to be returned');
    assert.equal(args, 'crop', 'sends event to the action');
    done();
  });

  this.render(hbs`{{image-cropper-on 'crop' (action 'onEvent') eventSource=eventSource cropper=cropper}}`);
});
