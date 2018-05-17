import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | image cropper on', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  test('it passes the cropper instance and arguments to the provided action as arguments', async function(assert) {
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

    this.actions.onEvent = (instance, args) => {
      assert.equal(instance, cropper, 'expected cropper instance to be returned');
      assert.equal(args, 'crop', 'sends event to the action');
      done();
    };

    await render(
      hbs`{{image-cropper-on eventSource=eventSource event='crop' action=(action 'onEvent') cropper=cropper}}`
    );
  });

  test('it passes the cropper instance and arguments to the provided action as arguments with positionalParams', async function(assert) {
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

    this.actions.onEvent = (instance, args) => {
      assert.equal(instance, cropper, 'expected cropper instance to be returned');
      assert.equal(args, 'crop', 'sends event to the action');
      done();
    };

    await render(hbs`{{image-cropper-on 'crop' (action 'onEvent') eventSource=eventSource cropper=cropper}}`);
  });
});
