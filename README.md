# ember-cropperjs

This addon provides a wrapper around [CropperJS](https://github.com/fengyuanchen/cropperjs) as well as two yielded components for handling events and programatically calling methods on the cropper instance.

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

To Install:

```no-highlight
ember install ember-cropperjs
```
