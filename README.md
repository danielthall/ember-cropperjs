ember-cropperjs
==============================================================================

This addon provides a wrapper around [Cropper.js](https://github.com/fengyuanchen/cropperjs) as well as two yielded components for handling events and programatically calling methods on the cropper instance.


Installation
------------------------------------------------------------------------------

```no-highlight
ember install ember-cropperjs
```


Usage
------------------------------------------------------------------------------

```hbs
{{! app/templates/application.hbs }}

<ImageCropper
  @source="sinbad2_800x600.jpg"
  @options={{hash aspectRatio=1 viewMode=2}}
  as |cropper|
>
  <cropper.on @event="crop" @action={{this.crop}} />
</ImageCropper>
```

```js
// app/controllers/application.ts

import Controller from '@ember/controller';
import { debounce } from '@ember/runloop';
import { action } from '@ember/object';

export default class ApplicationController extends Controller {
  _updateFileBlob(cropper) {
    return cropper
      .getCroppedCanvas({
        // any additional options
        maxWidth: 512,
        maxHeight: 512,
      })
      .toBlob((blob) => {
        // do something with the blob:
        // common examples include `blob.readAsDataURL()` or `blob.readAsArrayBuffer()`
      });
  }

  @action crop(cropper) {
    // debounce is optional
    debounce(this, this._updateFileBlob, cropper, 100);
  }
}
```

Note: Any options available from Cropper.js are available to be passed in to the options hash. There seems to be an issue with Cropper processing Ember's Empty Object, so the `components/image-cropper.js` file copies the options object as a work around.


Contributing
------------------------------------------------------------------------------

### Installation

* `git clone <repository-url>`
* `cd my-addon`
* `yarn`

### Linting

* `yarn run lint:js`
* `yarn run lint:js -- --fix`

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
