# On Event

## Usage
This component allows you to listen for specific cropper events.  In the example below, when the cropbox fires the 'crop' event (when the cropbox moves), the provided `cropImage` action is called. Events from Cropper.js can be found [here](https://github.com/fengyuanchen/cropperjs#events).

All on-events return the `cropper` instance and any arguments returned from the cropper.

{{docs/components/image-cropper-on/action}}
{{docs/components/image-cropper-on/demo}}

## Positional Parameters

This component also supports positional parameters as seen below.

{{docs/components/image-cropper-on/positional-params}}
