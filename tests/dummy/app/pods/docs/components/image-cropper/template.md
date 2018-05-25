# Image Cropper

## Usage
This component renders the provided image and cropper canvas.  Provided a `source`, the cropper will render a cropping canvas. `options` are provided as a hash and passed down to the constructor of the cropper instance. Available `options` can be found [here](https://github.com/fengyuanchen/cropperjs#options).

{{docs/components/image-cropper/demo}}

Note that when _most_ options change (via bound properties), a method will be called on the cropper instance directly; however, there are some cases where a completely new instance must be created.
