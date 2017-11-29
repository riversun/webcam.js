# Overview
webcam.js is a javascript library for web-camera handling

*webcam.js* is distributed under [MIT license](https://opensource.org/licenses/MIT).

# Functions
- Open/Close the Web Camera
- Support multiple-camera
- Get snapshot image (Classical way)
- Get snapshots continuously (Classical way)
- Grab Frame (use new API **ImageCapture** :A new way to take a snapshot)
- Take Photo (use new API **ImageCapture** API)

The status of [**ImageCapture API**](https://www.w3.org/TR/image-capture/#imagecaptureapi) is now(11.27.2017) WORKING DRAFT.  
But the experimental implementation is available on chrome 59+ etc.

# Demo
- [Demo](https://riversun.github.io/webcam.js/example/00_overview/)

# Examples
- [01.Get Snapshot](https://riversun.github.io/webcam.js/example/01_basic/)
- [02.Take Photo](https://riversun.github.io/webcam.js/example/02_multi_camera/)
- [03.Capture Continuously](https://riversun.github.io/webcam.js/example/03_continuous_capture/)
- [04.Web Camera on WebGL](https://riversun.github.io/webcam.js/example/04_webgl/)
- [05.Skin Detection](https://riversun.github.io/webcam.js/example/05_skin_detection/)


# Usage

## #grabFrame

grabFrame() takes a snapshot of the live video being held in track, returning an ImageBitmap if successful.
Wrapped [W3C ImageCapture API](https://www.w3.org/TR/image-capture/#dom-imagecapture-grabframe).

```javascript
var wcm = new WebCamera({
       videoTag: document.getElementById("video"),
       constraints: {
           video: {
               width: 640,
               height: 480,
           }
       }
   });

 wcm.startCamera();

 //grabFrame() takes a snapshot of the live video
 wcm.grabFrame().then(function (imageBitmap) {

 var canvas = document.getElementById("canvas");
 canvas.width = imageBitmap.width;
 canvas.height = imageBitmap.height;
 var ctx = canvas.getContext("2d");
 ctx.drawImage(imageBitmap, 0, 0);

});
```

## #takePhoto

takePhoto() produces the result of a single exposure using the video capture device.Briefly, in the case of grabframe(), image data is subsampled in the process of image processing.In the case of takePhoto(),you may get an original image(not subsampled) from image sensor.

Wrapped [W3C ImageCapture API](https://www.w3.org/TR/image-capture/#dom-imagecapture-takephoto).

```javascript
var wcm = new WebCamera({
       videoTag: document.getElementById("video"),
       constraints: {
           video: {
               width: 640,
               height: 480,
           }
       }
   });

 wcm.startCamera();

 //take photo
 wcm.takePhoto()
    .then(function (blob) {
        return window.createImageBitmap(blob);
    })
    .then(function (imageBitmap) {

        var canvas = document.getElementById("canvas");
        canvas.width = imageBitmap.width;
        canvas.height = imageBitmap.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(imageBitmap, 0, 0);
    });

});
```


## #repeated grabbing

If you call **setOnSnapShotCallback(callbackFunc)** , repeated grabbing is starting.

```javascript
var wcm = new WebCamera({
       videoTag: document.getElementById("video"),
       constraints: {
           video: {
               width: 640,
               height: 480,
           }
       }
   });

 wcm.startCamera();

 //set continuous capturing callback with specfied size
wcm.setOnSnapShotCallback(function (imageBitmap) {
    canvas.width = imageBitmap.width;
    canvas.height = imageBitmap.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(imageBitmap, 0, 0);

},320,240);


```


## Run on node.js

You can import library with npm.

**Install**

```node
npm install webcam.js
```

**Run demo**

```node
npm run ex00
```

**Run exmaples**


```node
npm run ex01
```

```node
npm run ex02
```

```node
npm run ex03
```

```node
npm run ex03
```

```node
npm run ex04
```

```node
npm run ex05
```




## Run on browser


Download actual files  

```
<script src="webcam.js"></script>
```
