import { module, test } from 'qunit';
import { render, find } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import Cropper from 'cropperjs'
import hbs from 'htmlbars-inline-precompile';
import Sinon from 'sinon';

module('Integration | Component | image cropper', function(hooks) {
  setupRenderingTest(hooks);

  hooks.before(function() {
    this.sandbox = Sinon.createSandbox();
  });

  hooks.afterEach(function() {
    this.sandbox.restore();
  });

  test('it renders', async function(assert) {
    await render(hbs`{{image-cropper}}`);

    assert.equal(find('*').textContent.trim(), '');
  });

  // TODO: Replace these with import OPT_UPDATE_METHODS and OPTS_REQUIRE_NEW
  //       and looping in a single test instead.
  test('it calls cropper.replace() when the source changes', async function(assert) {
    const replaceSpy = this.sandbox.spy(Cropper.prototype, 'replace');

    this.set('source', 'source');

    await render(hbs`{{image-cropper source=source}}`);

    assert.equal(replaceSpy.callCount, 0, 'replaceSpy.callCount before set');

    this.set('source', 'ynotDraw');

    assert.equal(replaceSpy.callCount, 1, 'replaceSpy.callCount after set');
    assert.deepEqual(replaceSpy.firstCall.args, [ 'ynotDraw' ]);
  });

  test('it calls cropper.replace() when the source changes', async function(assert) {
    const replaceSpy = this.sandbox.spy(Cropper.prototype, 'replace');

    this.set('source', 'source');

    await render(hbs`{{image-cropper source=source}}`);

    assert.equal(replaceSpy.callCount, 0, 'replaceSpy.callCount before set');

    this.set('source', 'ynotDraw');

    assert.equal(replaceSpy.callCount, 1, 'replaceSpy.callCount after set');
    assert.deepEqual(replaceSpy.firstCall.args, [ 'ynotDraw' ]);
  });

  test('it calls cropper.setAspectRatio() when the options.aspectRatio changes', async function(assert) {
    const spy = this.sandbox.spy(Cropper.prototype, 'setAspectRatio');

    this.set('options', {
      aspectRatio: 2
    });

    await render(hbs`{{image-cropper options=options}}`);

    assert.equal(spy.callCount, 0, 'spy.callCount before set');

    this.set('options', {
      aspectRatio: 4
    });

    assert.equal(spy.callCount, 1, 'spy.callCount after set');
    assert.deepEqual(spy.firstCall.args, [ 4 ]);
  });

  test('it constructs a new cropper instance when options.cropBoxMovable changes', async function(assert) {
    const spy = this.sandbox.spy(Cropper.prototype, 'init');

    this.set('options', {
      cropBoxMovable: false
    });

    await render(hbs`{{image-cropper options=options}}`);

    assert.equal(spy.callCount, 1, 'spy.callCount before set');

    this.set('options', {
      cropBoxMovable: true
    });

    assert.equal(spy.callCount, 2, 'spy.callCount after set');
  });

  test('it constructs a new cropper instance when options.cropBoxMovable changes', async function(assert) {
    const spy = this.sandbox.spy(Cropper.prototype, 'init');

    this.set('options', {
      cropBoxMovable: false
    });

    await render(hbs`{{image-cropper options=options}}`);

    assert.equal(spy.callCount, 1, 'spy.callCount before set');

    this.set('options', {
      cropBoxMovable: true
    });

    assert.equal(spy.callCount, 2, 'spy.callCount after set');
  });
});
