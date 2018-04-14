ember-cropperjs
==============================================================================

This addon provides a wrapper around [CropperJS](https://github.com/fengyuanchen/cropperjs) as well as two yielded components for handling events and programatically calling methods on the cropper instance.


Installation
------------------------------------------------------------------------------

```no-highlight
ember install ember-cropperjs
```


Usage
------------------------------------------------------------------------------

```hbs
{{#image-cropper
  source='sinbad2_800x600.jpg'
  options=(hash
    aspectRatio=1
    viewMode=2
  ) as |cropper|}}

  {{cropper.on 'crop' action=(action 'crop')}}

{{/image-cropper}}
```

Note: Any options available from CropperJS are available to be passed in to the options hash. There seems to be an issue with Cropper processing Ember's Empty Object, so the `components/image-cropper.js` file copies the options object as a work around.


Contributing
------------------------------------------------------------------------------

### Installation

* `git clone <repository-url>`
* `cd my-addon`
* `npm install`

### Linting

* `npm run lint:js`
* `npm run lint:js -- --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
