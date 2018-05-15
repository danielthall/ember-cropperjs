import { moduleForComponent, test } from 'ember-qunit';
import Cropper from 'cropperjs'
import hbs from 'htmlbars-inline-precompile';
import Sinon from 'sinon';

moduleForComponent('image-cropper', 'Integration | Component | image cropper', {
  integration: true,

  before() {
    this.sandbox = Sinon.sandbox.create();
  },

  afterEach() {
    this.sandbox.restore();
  }
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{image-cropper}}`);

  assert.equal(this.$().text().trim(), '');
});

test('it calls cropper.replace() when the source changes', function(assert) {
  const replaceSpy = this.sandbox.spy(Cropper.prototype, 'replace');

  this.set('source', 'source');

  this.render(hbs`{{image-cropper source=source}}`);

  assert.equal(replaceSpy.callCount, 0, 'replaceSpy.callCount before set');

  this.set('source', 'ynotDraw');

  assert.equal(replaceSpy.callCount, 1, 'replaceSpy.callCount after set');
  assert.deepEqual(replaceSpy.firstCall.args, [ 'ynotDraw' ]);
});

test('it calls cropper.replace() when the source changes', function(assert) {
  const replaceSpy = this.sandbox.spy(Cropper.prototype, 'replace');

  this.set('source', 'source');

  this.render(hbs`{{image-cropper source=source}}`);

  assert.equal(replaceSpy.callCount, 0, 'replaceSpy.callCount before set');

  this.set('source', 'ynotDraw');

  assert.equal(replaceSpy.callCount, 1, 'replaceSpy.callCount after set');
  assert.deepEqual(replaceSpy.firstCall.args, [ 'ynotDraw' ]);
});

test('it calls cropper.setAspectRatio() when the options.aspectRatio changes', function(assert) {
  const spy = this.sandbox.spy(Cropper.prototype, 'setAspectRatio');

  this.set('options', {
    aspectRatio: 2
  });

  this.render(hbs`{{image-cropper options=options}}`);

  assert.equal(spy.callCount, 0, 'spy.callCount before set');

  this.set('options', {
    aspectRatio: 4
  });

  assert.equal(spy.callCount, 1, 'spy.callCount after set');
  assert.deepEqual(spy.firstCall.args, [ 4 ]);
});
