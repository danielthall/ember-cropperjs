# ember-cropperjs

This addon provides a wrapper around [CropperJS](https://github.com/fengyuanchen/cropperjs) as well as two yielded components for handling events and programatically calling methods on the cropper instance.

To Install:

```no-highlight
ember install ember-cropperjs
```

## Usage
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


