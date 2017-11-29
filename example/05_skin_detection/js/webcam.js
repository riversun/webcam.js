(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.WebCamera = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var webcam_js = require('./src/webcam.js');


module.exports = webcam_js;


},{"./src/webcam.js":2}],2:[function(require,module,exports){
/*
 *
 * Copyright 2016-2017 Tom Misawa, riversun.org@gmail.com
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in the
 * Software without restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the
 * Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 *  INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR
 * IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */
var WebCamManager = (function () {

    /**
     *
     * @param params
     * @constructor
     */
    function WebCamManager(params) {

        this._testVideoData = "data:video/mp4;base64,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";
        this._testVideoMode = params ? params.testVideoMode ? true : false : false;

        this._testVideoUrl = params ? params.testVideoUrl ? params.testVideoUrl : this._testVideoData : this._testVideoData;

        this._webcamParams = (params && params.constraints ) ? params.constraints : {
            //audio: true,
            video: {
                width: 640,
                height: 480,
            }
        };

        this._videoTag = params ? params.videoTag ? params.videoTag : document.createElement('video') : document.createElement('video');


        this._localMediaStream = null;
        this._onGetUserMediaCallback = null;
        this._webcamStarted = false;

        this._onSnapShotCallback = null;
        this._snapShotSize = {
            width: 640, height: 480
        };
        this._snapShotCanvas = null;
        this._snapShotContext = null;
        this._cameraDevice = null;

        this._useImageCapture = true;
        this._imageCapture = null;

        this._isFlipImage = false;
    }

    /**
     * Set use ImageCapture API (Default is true)
     *
     * Use new API for taiking a picture
     * https://w3c.github.io/mediacapture-image/#dom-imagecapture-takephoto
     *
     * Google says this API has been supported since chrome 59.But this API is Working Draft state and
     * there are bugs on takephoto API on chrome 62 for win.
     * And polyfill implementation cannot help on the latest buggy implementation.
     *
     * https://developers.google.com/web/updates/2016/12/imagecapture
     *
     * You can choose whether you want to use it or not.
     *
     * @param value
     */
    WebCamManager.prototype.setUseImageCaptureAPI = function (value) {
        var _this = this;
        _this._useImageCapture = value;
    };


    /**
     * Set whether or not to flip the image when grabFrame/snapShotCallback is executed
     * @param boolValue
     */
    WebCamManager.prototype.setFlipImageEnabled = function (boolValue) {
        var _this = this;
        _this._isFlipImage = boolValue;
    };

    /**
     * Get installed camera devices
     * @returns {Promise} returns devices as promise
     */
    WebCamManager.prototype.getCameraDevices = function () {
        var result = [];

        return new Promise(function (resolve, reject) {

            //list installed devices(autioinput,videoinput,,,)
            navigator.mediaDevices.enumerateDevices()
                .then(function (devices) {
                    devices.forEach(function (device) {

                        //check if this device is camera(videoinput)
                        if (device.kind == "videoinput") {
                            result.push(device);
                        }
                    });
                    resolve(result);

                })
                .catch(function (e) {
                    console.error("Web camera not found e=" + e);
                    reject();
                });
        });

    };


    /**
     * Returns canvas for internal draw
     * @param device
     * @returns {null|*}
     * @private
     */
    WebCamManager.prototype._getSnapShotCanvas = function (device) {
        var _this = this;
        if (!_this._snapShotCanvas) {
            _this._snapShotCanvas = document.createElement("canvas");

        }

        return _this._snapShotCanvas;
    };
    /**
     * Returns context(canvas context) for internal draw
     * @param device
     * @returns {null|*}
     * @private
     */
    WebCamManager.prototype._getSnapShotContext = function (device) {
        var _this = this;
        if (!_this._snapShotContext) {
            _this._snapShotContext = _this._getSnapShotCanvas().getContext("2d");

        }
        return _this._snapShotContext;
    };
    /**
     * Start camera streaming
     * @param device
     */
    WebCamManager.prototype.setCameraDevice = function (device) {
        var _this = this;
        if (device && device.kind && device.kind == "videoinput") {
            _this._cameraDevice = device;
        }
    };


    /**
     * Returns "video" element
     * @returns {*}
     */
    WebCamManager.prototype.getVideoTag = function () {
        var _this = this;
        return _this._videoTag;
    };

    /**
     * Set snapshot(captured image) callback.
     * Once you set this callback, the captured image will be sent every time.
     * @param callbackFunc
     * @param width
     * @param height
     */
    WebCamManager.prototype.setOnSnapShotCallback = function (callbackFunc, width, height) {
        var _this = this;
        _this._onSnapShotCallback = callbackFunc;

        if (width && height) {
            _this._snapShotSize.width = width;
            _this._snapShotSize.height = height;
        } else {
            _this._snapShotSize.width = null;
            _this._snapShotSize.height = null;
        }

        requestAnimationFrame(_this._snapShotLoop.bind(_this));

    };

    WebCamManager.prototype._snapShotLoop = function () {
        var _this = this;

        if (!_this._onSnapShotCallback) {
            return;
        }

        requestAnimationFrame(_this._snapShotLoop.bind(_this));

        if (_this._onSnapShotCallback) {


            if (_this.isVideoTrackLive()) {

                _this.grabFrame(_this._snapShotSize.width, _this._snapShotSize.height)
                    .then(function (imageBitmap) {

                        _this._onSnapShotCallback(imageBitmap);

                        //requestAnimationFrame(_this._snapShotLoop.bind(_this));
                    })
                    .catch(function (e) {
                        //- An error occurs if the frame can not be prepared

                        //console.error("frame dropped error=" + e);
                    });
            }

        }


    };

    /**
     * Capture image(data URI) from camera live stream using old approach
     * @param width
     * @param height
     * @param dataFormat
     * @returns {*}
     */
    WebCamManager.prototype.capture = function (width, height, dataFormat) {
        var _this = this;

        var video = _this._videoTag;


        if (video.readyState === video.HAVE_ENOUGH_DATA && video.videoWidth > 0) {
            // - if video stream is ready

            var _width = width;
            var _height = height;

            var context = _this._getSnapShotContext();
            var canvas = _this._getSnapShotCanvas();

            canvas.width = _width;
            canvas.height = _height;

            if (_this._isFlipImage) {
                context.translate(canvas.width, 0);
                context.scale(-1, 1);
            }

            //capture image from media stream.
            context.drawImage(video, 0, 0, _width, _height);
            if (dataFormat == "imageData") {
                var snapshotImageData = context.getImageData(0, 0, _width, _height);
                return snapshotImageData;
            } else {
                var snapshotImageDataURL = canvas.toDataURL();
                return snapshotImageDataURL;
            }

        }
        return null;

    };


    /**
     * Returns a snapshot of the live video in theTrack as an ImageBitmap
     * @param width In "useImageCapture" mode this parameter is ignored
     * @param height In "useImageCapture" mode this parameter is ignored
     * @returns {Promise}
     */
    WebCamManager.prototype.grabFrame = function (width, height) {
        var _this = this;

        var video = _this._videoTag;


        if (_this._useImageCapture) {


            return new Promise(function (resolve, reject) {

                var canvas = _this._getSnapShotCanvas();
                var context = _this._getSnapShotContext();


                _this._getImageCapture().grabFrame()
                    .then(function (imageBitmap) {

                        if (width && height) {
                            canvas.width = width;
                            canvas.height = height;

                            if (_this._isFlipImage) {
                                context.translate(canvas.width, 0);
                                context.scale(-1, 1);
                            }
                            context.drawImage(imageBitmap, 0, 0, width, height);

                            resolve(window.createImageBitmap(canvas));

                        } else {

                            if (_this._isFlipImage) {
                                canvas.width = imageBitmap.width;
                                canvas.height = imageBitmap.height;

                                context.translate(canvas.width, 0);
                                context.scale(-1, 1);
                                context.drawImage(imageBitmap, 0, 0);

                                resolve(window.createImageBitmap(canvas));

                            } else {
                                resolve(imageBitmap);
                            }

                        }

                    })
                    .catch(function (e) {
                        reject(e);
                    });
            });


        }

        return new Promise(function executor4GrabFrame(resolve, reject) {

            if (!_this.isVideoTrackLive()) {
                return reject(new DOMException('InvalidStateError'));
            }

            try {
                var _width, _height;

                if (width && height) {
                    _width = width;
                    _height = height;
                } else {
                    _width = video.videoWidth;
                    _height = video.videoHeight;
                }
                var context = _this._getSnapShotContext();
                var canvas = _this._getSnapShotCanvas();

                canvas.width = _width;
                canvas.height = _height;


                if (width && height) {
                    context.drawImage(video, 0, 0, _width, _height);
                } else {
                    context.drawImage(video, 0, 0);
                }

                resolve(window.createImageBitmap(canvas));
            } catch (error) {
                reject(new DOMException('UnknownError'));
            }
        });

    };

    /**
     * Take photo
     * @returns {Promise}
     */
    WebCamManager.prototype.takePhoto = function () {
        var _this = this;

        var video = _this._videoTag;

        if (_this._useImageCapture) {
            return _this._getImageCapture().takePhoto();
        }

        return new Promise(function executor4GrabFrame(resolve, reject) {

            if (!_this.isVideoTrackLive()) {
                return reject(new DOMException('InvalidStateError'));
            }

            try {
                var _width, _height;

                _width = video.videoWidth;
                _height = video.videoHeight;

                var context = _this._getSnapShotContext();
                var canvas = _this._getSnapShotCanvas();

                canvas.width = _width;
                canvas.height = _height;

                context.drawImage(video, 0, 0);

                canvas.toBlob(resolve);


            } catch (error) {
                reject(new DOMException('UnknownError'));
            }
        });

    };


    /**
     * Callback when getUserMedia finished
     * @param callbackFunc
     */
    WebCamManager.prototype.setOnGetUserMediaCallback = function (callbackFunc) {
        var _this = this;
        _this._onGetUserMediaCallback = callbackFunc;
    };

    /**
     * Start camera streaming
     * @param callbackFunc
     */
    WebCamManager.prototype.startCamera = function () {
        var _this = this;


        return new Promise(function (resolve, reject) {


            if (_this._webcamStarted) {
                reject();
            }

            _this.doWebcamPolyfill();

            if (!_this.hasGetUserMedia() || _this._testVideoMode) {

                _this._webcamStarted = false;

                if (!_this._testVideoMode) {
                    console.error("Web camera not found");
                }

                _this._videoTag.src = _this._testVideoUrl;
                _this._videoTag.loop = true;
                _this._videoTag.play();

                if (_this._onGetUserMediaCallback) {
                    _this._onGetUserMediaCallback.bind(_this);
                    _this._onGetUserMediaCallback();
                }

                //Ignite the snapShotLoop when startCamera is called
                requestAnimationFrame(_this._snapShotLoop.bind(_this));


                reject();

            } else {


                var webcamParam = _this._webcamParams;


                // If you use "mandatory" and "deviceId" at the same time on chrome you get an error like
                // "Malformed constraint: Cannot use both optional/mandatory and specific or advanced constraints"
                // You should use "sourceId" with "mandatory" instead of using "deviceId"
                if (_this._cameraDevice) {
                    // - if camera device specified explicitly
                    if (webcamParam.video.mandatory) {
                        webcamParam.video.mandatory.sourceId = _this._cameraDevice.deviceId;
                    } else {
                        webcamParam.video.deviceId = webcamParam.video.deviceId ? webcamParam.video.deviceId : webcamParam.video.deviceId = {};
                        webcamParam.video.deviceId.exact = _this._cameraDevice.deviceId;
                    }

                }

                navigator.mediaDevices.getUserMedia(webcamParam).then(function (mediaStream) {


                    _this._localMediaStream = mediaStream;

                    if (typeof _this._videoTag.srcObject !== "undefined") {
                        _this._videoTag.srcObject = mediaStream;
                    } else {
                        _this._videoTag.src = window.URL && window.URL.createObjectURL(mediaStream);
                    }


                    _this.getCapabilities();

                    _this._videoTag.play();

                    _this._webcamStarted = true;

                    if (_this._onGetUserMediaCallback) {
                        _this._onGetUserMediaCallback.bind(_this);
                        _this._onGetUserMediaCallback();
                    }

                    //Ignite the snapShotLoop when startCamera is called
                    requestAnimationFrame(_this._snapShotLoop.bind(_this));

                    resolve();

                }).catch(function (e) {
                    console.error('Web camera not found', e);

                    _this._videoTag.src = _this._testVideoUrl;
                    _this._videoTag.loop = true;

                    _this._videoTag.play();

                    _this._webcamStarted = false;

                    if (_this._onGetUserMediaCallback) {
                        _this._onGetUserMediaCallback.bind(_this);
                        _this._onGetUserMediaCallback();
                    }

                    //Ignite the snapShotLoop when startCamera is called
                    requestAnimationFrame(_this._snapShotLoop.bind(_this));

                    reject();
                });

            }
        });
    };

    WebCamManager.prototype.getCapabilities = function () {

        var _this = this;

        var track = _this.getVideoTrack();
        if (track) {
            var capabilities = track.getCapabilities();
        }
    };

    /**
     * Returns video track
     * @returns {*}
     */
    WebCamManager.prototype.getVideoTrack = function () {

        var _this = this;

        if (_this._localMediaStream) {
            return _this._localMediaStream.getVideoTracks()[0];
        } else {
            return null;
        }
    };

    /**
     * Return true when video track is live.
     * @returns {boolean}
     */
    WebCamManager.prototype.isVideoTrackLive = function () {

        var _this = this;
        var track = _this.getVideoTrack();
        return track && track.readyState === "live";

    };

    /**
     * Stop camera streaming
     */
    WebCamManager.prototype.stopCamera = function () {

        var _this = this;

        var track = _this.getVideoTrack();
        if (track) {
            track.stop();
        }
        if (_this._videoTag) {
            _this._videoTag.pause();
        }

        //dispose _imageCapture object
        _this._imageCapture = null;

        _this._webcamStarted = false;
    };

    WebCamManager.prototype.doWebcamPolyfill = function () {
        var _this = this;
        window.URL = window.URL || window.webkitURL;
        //polyfill
        if (!navigator.mediaDevices) {
            navigator.mediaDevices = {};
        }

        //for older approach navigator.getUserMedia
        navigator.getUserMedia = navigator.getUserMedia
            || navigator.webkitGetUserMedia
            || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    };

    WebCamManager.prototype.hasGetUserMedia = function () {
        var _this = this;
        return (navigator.getUserMedia || navigator.webkitGetUserMedia
            || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.mediaDevices.getUserMedia);
    };

    WebCamManager.prototype._getImageCapture = function () {
        var _this = this;

        if (_this._useImageCapture && !_this._imageCapture) {
            _this._imageCapture = new ImageCapture(_this.getVideoTrack());
        }

        return _this._imageCapture;
    };

    return WebCamManager;
}());


module.exports = WebCamManager;

},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsInNyYy93ZWJjYW0uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciB3ZWJjYW1fanMgPSByZXF1aXJlKCcuL3NyYy93ZWJjYW0uanMnKTtcclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHdlYmNhbV9qcztcclxuXHJcbiIsIi8qXHJcbiAqXHJcbiAqIENvcHlyaWdodCAyMDE2LTIwMTcgVG9tIE1pc2F3YSwgcml2ZXJzdW4ub3JnQGdtYWlsLmNvbVxyXG4gKlxyXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5IG9mXHJcbiAqIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlXHJcbiAqIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsXHJcbiAqIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGVcclxuICogU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXHJcbiAqIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxyXG4gKlxyXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcclxuICogY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cclxuICpcclxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUiBJTVBMSUVELFxyXG4gKiAgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEFcclxuICogUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SXHJcbiAqIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSxcclxuICogV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUlxyXG4gKiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxyXG4gKlxyXG4gKi9cclxudmFyIFdlYkNhbU1hbmFnZXIgPSAoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBwYXJhbXNcclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBXZWJDYW1NYW5hZ2VyKHBhcmFtcykge1xyXG5cclxuICAgICAgICB0aGlzLl90ZXN0VmlkZW9EYXRhID0gXCJkYXRhOnZpZGVvL21wNDtiYXNlNjQsQUFBQUlHWjBlWEJwYzI5dEFBQUNBR2x6YjIxcGMyOHlZWFpqTVcxd05ERUFBQUFJWm5KbFpRQUFFd1J0WkdGMEFBQUNyUVlGLy8rcDNFWHB2ZWJaU0xlV0xOZ2cyU1B1NzNneU5qUWdMU0JqYjNKbElERTBPQ0J5TWpjMk1pQTVNR0UyTVdWaklDMGdTQzR5TmpRdlRWQkZSeTAwSUVGV1F5QmpiMlJsWXlBdElFTnZjSGxzWldaMElESXdNRE10TWpBeE55QXRJR2gwZEhBNkx5OTNkM2N1ZG1sa1pXOXNZVzR1YjNKbkwzZ3lOalF1YUhSdGJDQXRJRzl3ZEdsdmJuTTZJR05oWW1GalBURWdjbVZtUFRNZ1pHVmliRzlqYXoweE9qQTZNQ0JoYm1Gc2VYTmxQVEI0TXpvd2VERXhNeUJ0WlQxb1pYZ2djM1ZpYldVOU55QndjM2s5TVNCd2MzbGZjbVE5TVM0d01Eb3dMakF3SUcxcGVHVmtYM0psWmoweElHMWxYM0poYm1kbFBURTJJR05vY205dFlWOXRaVDB4SUhSeVpXeHNhWE05TVNBNGVEaGtZM1E5TVNCamNXMDlNQ0JrWldGa2VtOXVaVDB5TVN3eE1TQm1ZWE4wWDNCemEybHdQVEVnWTJoeWIyMWhYM0Z3WDI5bVpuTmxkRDB0TWlCMGFISmxZV1J6UFRjZ2JHOXZhMkZvWldGa1gzUm9jbVZoWkhNOU1TQnpiR2xqWldSZmRHaHlaV0ZrY3owd0lHNXlQVEFnWkdWamFXMWhkR1U5TVNCcGJuUmxjbXhoWTJWa1BUQWdZbXgxY21GNVgyTnZiWEJoZEQwd0lHTnZibk4wY21GcGJtVmtYMmx1ZEhKaFBUQWdZbVp5WVcxbGN6MHpJR0pmY0hseVlXMXBaRDB5SUdKZllXUmhjSFE5TVNCaVgySnBZWE05TUNCa2FYSmxZM1E5TVNCM1pXbG5hSFJpUFRFZ2IzQmxibDluYjNBOU1DQjNaV2xuYUhSd1BUSWdhMlY1YVc1MFBUSTFNQ0JyWlhscGJuUmZiV2x1UFRFZ2MyTmxibVZqZFhROU5EQWdhVzUwY21GZmNtVm1jbVZ6YUQwd0lISmpYMnh2YjJ0aGFHVmhaRDAwTUNCeVl6MWpjbVlnYldKMGNtVmxQVEVnWTNKbVBUSXpMakFnY1dOdmJYQTlNQzQyTUNCeGNHMXBiajB3SUhGd2JXRjRQVFk1SUhGd2MzUmxjRDAwSUdsd1gzSmhkR2x2UFRFdU5EQWdZWEU5TVRveExqQXdBSUFBQUF1TVpZaUVBQmIvL3ZmVFA4eXk2L2M1dGVPbzk2S2VKbDlEZFNVQm01YkU3VHFBQUxyeGI0N0srdDVKTStyQVk4QUFBeUFWTnJ2L0NTTitJQTVRb0F4OVRLT0NmZERKWEFjRUZKUU5oLzk5NFFQaUhSVUdXeCtOUTV6bE9IcVFMeU1vN2h5c2RuVVJtTjdiRmNyeXA5bHdyOUwrK1YvV3NDZFh1eGZUd1BIYlVqL0taNUJWZXpCMzVEV0ZjalR4c3ZKVXQyM1htKzF3TlpZOXNoNXRQWUxsTzJ1cUEwN2ZMOGgwTEIyUWw4RnVHMnN3STU0NFRaM004K1l2NkJ0dnZvKy8xaVBTUzZRSXFaaWQ1Q1pGV0RzQkhCTUU3QjdXYVF5YzVPWWpkYjBYcDFwYkJkMXN3MHlYclBUNEx4TFdaTEtacFdtcVh5ZjFlT1VuT25VaWZRS1hQU2w5MXk5RTNScEh5a1gzOGNvYzJXSVNrL29GMUlTZXlJVGZacm9kdzVUR1QwRGFkYTJ6MGJCai9pUjNJUUI1ZU5UcTJVcDV6UzFoZDM0ZGRhM2hmTkFiQk40azYwdEp1V0lPVHJIY01tdjRQTXJ3YTVUMUZPcHhlUnJGaE13d2dwMEZIY2pkZU54aFFublZIeDk4VDhjT1laZXJGRTJVZkRoekZoaE9pMUs3MXBGcEh2QjZGWXN2N0UvUk16RTR4NVE5ck13K0puQUM4WUtnaVFPSjRaZU1ZWFpNeHUzSGxlbVRmeDBDRnR1NnNwVGVhZWVZd2ljZmJOZ0RYTGNUeXFwUFN5WVdtb05ONElnR21OdG1ISzZ2bE0zZXlJNm1LZUZaK3VadTl3WFZmcTZuSGJUbW96dG53ZHZUc2xYTXlzNG1zNS83N2tmeFpySW80Q25DcFM1MEU2YkFTNTgzdWltMlVvenlqbFQ4MERYWVRQb24xK3JlcGJZWDhIUVRGK1A3eVNBdFhYeHBKenczOXV4SVlxOXdaWW13TzZFWStnTTRxajVNaWpXVkxUc0ZMbnRaQWRBV0VTdzZ2M0Zjd1BlMENMaldhWnl6TUp0NjBZMGp4Z3FOR3ozU1NHVkczcTdkZnFxZkoveUJMNE1JSi8yU2taVE1reVF5TElHMDZKSVNVaXN5UTZnUEp0SE5rT1pmYVlpZnRHY2JnYmNLcXlibzUxbFhMMTM3VThRT2VCUlFzMmdSTTB4R2NQS2drTDFjb1JYaldJeVJrSHVHdkZyVlR4dTJ3SE1EbWc5Rko0R0g1N1d5RXZlR0U3aTQzY0FvcU5RdUxxeXBTd3NReFFvN1YrUnlYbjBpS29kTHlZUzcxVm50Z1Q2M0ZNNitQdXhyTEN3ei9Ha2Jxa2tVR1FpSWFCTmRMNU1UTjFZYUFnSnVOLzY0S2k1MXgzV2JwejBsQXpnRUJlTHpoc0IwNm9adjVHU3MrVGYrOU5uUW1vR25kWUZZbGpjQUFOZ1p3UjBweFBERXBnRGVIcUlML3ljNmlHSy9WeEJtYU4zeHdMSUV1VlJlM3JuczYwS0ttQ2FDL0xhOGlSQ2hhanNRMUtMU3dwTHZacS80QWhIc2xyMHJESEc5YlRmUzBxZkRkY2JLTHdybGVDeXhhTlhYUE5vbjNqaVhIS3lpSU1iVWFNVG9ERWZ0c08vRk5ndzY4cEphc0IxYXNRK1ZOdVA5alRsSm9jeHFNcENuN09XKzJRUWpWTERXTk1HZ3d3S3lnTnJybnk4MVFJNmhPUzJJdE1ZUGtxMm5aLzVFaC85OXhuWHR0cW5tMTBZU2w3RXdDM1YzUVJHQWVNemsxY0FtT0JpcGtNRFRkbFgzR1VPWEt1Q0xSUnNXSlhXZmorUTMzOW0yTDNpaDRFMnhkTWxRNWt1RDZtcE9kbWt2NHNwYmRhRSs1QjN2cms4SnI3SVEvWWYvbFhSWGZSQ3hQWFBtaElFTEsrdU1abktSWlRBbjFyb3V5cC83THhiV0dmdm04VTE5aXhmOS9ScnJDRWFhMHM5QnE0VWRycUNEak1nMzh3dERtaGVXOE5WK3NuQUE1eE5Ka28vdWF3SjVKaDJpcTRHdGxiS3RzOVd5YjBXcW52V2pNTWV1YVF3UHBZbEQ2clZsNkgxbDJHOFQxcktrOGNScHgxbWFsekhzSzZiaVE2ZExCeGo4YkpKZ28ycTZQeTJEUkdUdi9DTjRTOGRpQ09iN0JkeWQwT2RIczA1eDl4WHNWQkgvYzgwTXNteVNsaHZkeEkwRGpIb0J1WEVXNCs2WDZlLzg4U29QTTJvZ3B3b0gveGhiQ1VqcGJYdXZwa2UzZkZPb0laYUdBRGxycHd0YS9xQVg1R2p5SURIaUxEUzBUUmJ4WCtDcTRVN3h3QUtDdWNDL0FXakFWUGVxYW9rWllpanVVdTRhSGJ4YjczNG8rd015MUhmZTYzNGhLcW4vcDFjTGpHT3RaQzhBVlFLSml1TW9YQVdzSnBGaWdGYlZlK0dhNXhDbXZJMXZoRkNxREw0RkhBNEJVZnZmV1Q2NUVlZ0wxOGE5MnFNbStQSmhEZFI0NHJKZzZmaVBzZ2xMSEFHeWhSa2I2Zkk1MXBwNmFwbkwvdHVkbk05M2UxOWY0S243UEtsMEJDZDBldXZwS09uTmI0VkNKLzJLSUtoK3NZUzRCdWw3akNONFpmUU1LNjRFbTdnY2dqNkdRcS80TUI4SmVMQ2Q3UFhwVkhtRmZBYS9FQjZiWDFMaDlLVUZYZTBvZE00UnBHeHAwdXdGQzRzeDVzVHdHeGtXMWZBWUV2SEFoYVJyWDNhRkNKYmZRRkdROUdDOGVPMjlSTkVLSGRLVVkxS2YvNktLdVBQdkF1clEyd24vZUJsc01nTFNBWTJUQk1oU3JPMk5nT0h4TDNjc0tFMTdyaEJGdU1sa2pkMzNwUmZqQ3pUTHlDSFBQTEEzanZzTDFJbHUyd3JtbytvVFFDVldrL2hraTlhbHFZOTFpR1ZYMFZ2eU9MUEIybW9vd2M1VnY3M2hOTE5DemZQdWwyeCtwcmNoOGp3Y1p3UWNZMGRhNU00eXR5eC91cVh5TUpzRzQ1Z2s3SEcxMWtrZDhyZ0RGRE1qTTBtQWVWcE0wYzZYbDhCU1hiQmc5SXpwMzllenRKQ2QrZENONDFwc0RmTWdtY3ZEWFFQdDFaeXBVaENwMkMrR2pmR0tmZWdlQmNmSk5ZVXJ2MlpFWWRINzdwRmg3V3dNaUsvNzR4Z3MzRWg4NnVkTURWQ0M0bnp2S2k0d1llQjBHQUVIS0tYWjBQdkowUmVtTm9qU1NIZUdXMXNGcmw3ZGlZS1Zob2I2cFVocHh2ZXhlOFNjOEVJUFhOSENhSzZtSGRGV2k2OVRhaW83QzlRT3dzNDVVdlZ0MHVwamc1aSsyQmNkKzdPVjI2Z2VhVmQvQ3pXTWtxY3dobElNSlNWOTFEcmNRVHZnelljbVpIM05iMEtaVTc4YUVaOWNYVUowQW9FNEErVUJIZ3gxQUd4TjkvL1JSM0U4Y2pKeGpTVEpVT1VLSHZpMktML3NCOVlaU2xoR1RMdTgvcUgvMXkraDN5ZkZadEJPQTAvMFZibWhoYm9TQlBWQVRGTXBJVmczejM2cjZSUU9LUVlwWjdJUkV6bjdGMG51OUxqcHJRZHI0QzVoOU9tempTdzZwWjhsenJNdVkySE0yUU92UTNvaS9EVFY4NlV3T0N5Z2VhS3R5V3JXVS9PZ1BVNmtjbE5hMzh0SmQrL0IxLzdQdmY2dkVJc1dGT3kyWGlHdnZWSko1TGwweW10OEhWa1pIbWpnYWhKeDB1cUMzYmY2ZjFlRUxJeFJZc3lSV2hHTWh0UUp1WVg3TGVlclRkV29qdGsySFowYytWaksyM0JjU3ZXQWxVeTFkVFo5Y1NPTUFKM3VFdnpuSUdMdEMweDYzajQ3cFpXZTBEajU1bkszNnV6L0RGeGFVV1JjRWZNMXFsNmxyNEFhWXZaaWYvcTZ4YVBxNHBIdUJpdFYvckJqdS9WeldrQ3NnTVdUQm5JNmZGVjlzOXk2dUpKT2VHM2p4YW1MZXFITGJIMks1NmlhT2kwWHoyaHJSYXhtY1JFVE9PelRRYVBIcE5QTExuclE0QkI0UEJvbDVWNTJ3SHlzdC9LRTlJckY2KzhCWjd0M3lQa3QvMy9mTzN0MGV4OEtHRHloOTNPZnRIWncxYWJWRWJWRHZLWXZwMUZyYU92N1pJdVUwYjFpYldJVlU5eTJsNCtoOE1NejViNy82cyttT1ZTdnRSSjM2alJKRU51bVdOQkVORzE4SVNIOVUzNlpMcDRwQXE2YVdWSlhTQXpuRFYvMGtDNDVONHpJRC9HTG5UWUVvTEZSQ1hFRExPMjdVV0lncFV1K0FJc3hNRXcvcFFlY1E1UWE2WHZMS3A0WllxRmI0M0s1ZzFWNm5NTXJLcWdnRE1EK2I1TjlrT3J0NkQwZVNIOWdXbkpCUGVJUmpYdmZTbVFGTHVIVjQxSXFtUko4dDBqTFJuNVdMVHQwdS9yY0djTWx1a2ovOS8rRDBqNklyZ2xENU8yWlU4b0o2NTN3QWwxdTRYbjUrcWd6ZllMVVlBYkgvWHZ3Y0VxTzJCSG5OWFdEVVNnM1JyT3VKemxRSzhCOHBVSkxDVXdOWkZEV05FaGdjUDZuWlhRRWtFb0E2SGRxTHV0MXVHYmhJQXkrdCs1dTVqeEtTRnFNSUFHSGR5dXExT3lkWGU2eFVneXJod2p1QnFGazBld2RDRW92QTBXUm9JOFVvUGlDWnFPNGJla016N1daQmVkZS92Q09tbkhmOGVzVVJhSWJnUUxQQ0xsT3BUT1BMWC9QaGVoamlPWHF3Umg0YWNNSDM5dlNzeEk5WGZ6RHFDaERmRTlyMFZOakF1b3pBLzlMVGovNUcwVXdzR2JYWEx4djE0VEY1S0V0d1kzancrOE4zOFdYVVcrRzZxdTljeXMzOTNjUksyU3NleVRHRVVXdDlwaVRRRG0yeDgwRWx1bGZpSC9mNUlnMENrbFpxaE84Q3VJbG5IRFFkbmpxV21rV2R2ZDdSeTNrdE5qYTZNRXMzelJQVXIwWWFYZGRhaG1nSUkweG9NNEdXTWNpNUJkd3FGMDJ6MXRzbk5BQSs4SDhBbHNjMHlyb2IrbTZLQW0yYkM3ZTE5WHFobkYvWGFsdmRBSElQQ1FNTEJXQ0ZKS3Fob2ZjZVlkRUM5dUxINmppUkt4NnpMaE10Z2lveXNhMjNBS05nUUFBQkxkQm1pRmhHQjJBZnhCWC8vN1dwVkFCT0hVUGxBRGNYOENVS3JVN0dXS1VCUWJmaU1jWllKaklFQkhWSlZLVW5aYkhDemM0RElyWFNQWnJWNmN0Z3cvOFBpR0gxSks2Vm84TFlWSENxcjR6dHdyd3YrWUF2MUU4M1Q2akdXVkMwMzE2ank1SC9MeTRXdEgrNFVmQmpOaTdXcncrZmRUMWRXMk1jQXk1aG16di9HckJOSVZBNllLY2xKWVhMV09LZjlSZUlQRXFzQ05yZlVOYVFXVGYzenZXWGh2ZGl1dk1jOGRocXo5TVVOT0dZUGV2cVhSRExWNDIrci9TQUhFWEpwa2M1cG8wUkZOR3RLZ1hLOXFRK1ZyaGZEb01pUXFieFZLV2pBTmM1QThNc1JQaWVlMmVOTHpHQjhUUE8rT1R5L1Y5cXZqQ0pBeWNVbmlSVkFnMGpsbzBpSWs0RVEwRmVLdlVYSnJnZll4MDVYQ1grRkVzRHBneWZBbENWL1FSRVRPT2xCcUtQT0JmRWV6dmVucmVIMWoyaC9rdUFxSFZhVnQvUUFmY003Y3JZS2RXNktpZWo0V3VuU2EyWGFOR044em5XRWhJbk95WSs0RHJQNUR3MWgxTVg0QmFnYis0emR4WC96RERxekpKdnNHMlU4V1h3L3FPZGZPUDhTWnVxN3RQZ0Z6VXJoY0JrQVJmeWF4dmZaOUVCVTV3Ri8yaXdHakswK0p4RWw5MlBjemhMU3FqZkpIU1IrdUhiOGZGWi9lVE04ZHZMQ3REOXpvQU1mbFBpQmh6WjZWL1p0THYxSTM5R2M5M2pqeCthcmQ5OVFINTljczlFRm1nUmpyUG1QblBzK0FDUlpMVThxNkF3VlJkY2lEUURvQmZ3UHM4cmcrSEt1bnpTVW4yY3JPK1NPVWlxVTE1Mkh6dGl3QnNmNGlkc1NZdUtnS0JUa2s1WmswQlA2QW9MeVRJR3k1M3VJTDVjcEd4ZkxnTVZaUUZhQ3ROajBzM05HV2tnVHNJakFzUzBxSWh4elgrUys4UHhUUVFVcGhLTWNJVGFCc25sV3VaOHY3TXNROUR1TVdqRzhWZkFPS3p4bThSUTNOc3pONHUydXB4b0x5ZGhJWTNDcjVhc1JMU2IyQzIzUWhXSTJuWjZaUzh4RTR4eVRRNHVWMndheElNMzBudnp1RFl6WEczdmhKbUpHK3NyUjdWY0s4WWJna1ZUV2RYdTZtN1crOEV0ZVV6UWtSVFhmKzdKeEMwMnRYaHZzNFBuL0NtWGI3SXRUbDUwdWJIT1VyV053WkcxN1lmaHpQK2JLQUZ4djMxQ2tQY0dmZGF1VVhkOWRDQ1BtY0htbjdwalpnbUsyd3dHdWRDbGl0QmNDYlIwRDRIbEtoeFdtNC9JSjhIa0FXNHp6MVhqNHZKbXBKZkFNdWwrL0VIK1hoaTlBMUxMUnZDdWRuVnlxNytGVk4xMmhTUFFpVmtVd2RQelpaS3V3UXlPUUJVamMzeDRyVDdQaXlyTUNiNFNUK2ZjRUYrTWZzYTJnTnZDSUtrSGprS0RsTkZzMFNMK2ROcHc3NVNxNVdRUWRpSGNUb3V5eVpZbTByQ1FkaWpqY1FUcW8xaVJ1NlpQT0JqVmFxZmlSdWo3dDQ2RzIzUE1VMHBVTzkwcldkTWhqOHZ0ancrZVdLcVFVdi82QXRiazU0TVVoQW1kSkNDL09OMUdHcC9JcVoxeVZTUjF3ZEhXekNETnczN29uY3BZUmhHelM2anRjWldTN203elA2b0NNNkxSTjNMb1pqb2w5Q0QzbzI4ZjU1WGpjVW9SMThGRmkyZWxJV0wvYVAvcVlpWFd3UDFMNW1iVXZWd2RRUFN2TDQ0OFlNc2pRamFIZmFZYjYySzhxRHYweHRWdnNPUU16azUxVUR2SGlWa2txKzRaZkhZMHpzckZUVjlNZlJlYUJFd3MxRU10VUVJdlNZU3NzcWpTQVFtRFNSZDZScVBmNDdGWENHUGppN0FYbjdmdnBzQjlYOTc1NUx2ZFRyeVdKMjk2RkpYNit1Q0hNc0JmZ3NvVDgwUVlCZGRsWHg4eGhENGs0ZjNtQWlJVmhNTjZDZTBLb1poSnZXRVdkRStmVENSN2dEMGM5OFpKUGEvTXNzb0FBQURDbTF2YjNZQUFBQnNiWFpvWkFBQUFBQUFBQUFBQUFBQUFBQUFBK2dBQUFmUUFBRUFBQUVBQUFBQUFBQUFBQUFBQUFBQkFBQUFBQUFBQUFBQUFBQUFBQUFBQVFBQUFBQUFBQUFBQUFBQUFBQUFRQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFJQUFBSTBkSEpoYXdBQUFGeDBhMmhrQUFBQUF3QUFBQUFBQUFBQUFBQUFBUUFBQUFBQUFBZlFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUJBQUFBQUFBQUFBQUFBQUFBQUFBQUFRQUFBQUFBQUFBQUFBQUFBQUFBUUFBQUFBRkFBQUFBOEFBQUFBQUFKR1ZrZEhNQUFBQWNaV3h6ZEFBQUFBQUFBQUFCQUFBSDBBQUFBQUFBQVFBQUFBQUJyRzFrYVdFQUFBQWdiV1JvWkFBQUFBQUFBQUFBQUFBQUFBQUFRQUFBQUlBQVZjUUFBQUFBQUMxb1pHeHlBQUFBQUFBQUFBQjJhV1JsQUFBQUFBQUFBQUFBQUFBQVZtbGtaVzlJWVc1a2JHVnlBQUFBQVZkdGFXNW1BQUFBRkhadGFHUUFBQUFCQUFBQUFBQUFBQUFBQUFBa1pHbHVaZ0FBQUJ4a2NtVm1BQUFBQUFBQUFBRUFBQUFNZFhKc0lBQUFBQUVBQUFFWGMzUmliQUFBQUpkemRITmtBQUFBQUFBQUFBRUFBQUNIWVhaak1RQUFBQUFBQUFBQkFBQUFBQUFBQUFBQUFBQUFBQUFBQUFGQUFQQUFTQUFBQUVnQUFBQUFBQUFBQVFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQmovL3dBQUFERmhkbU5EQVdRQURQL2hBQmhuWkFBTXJObEJRZm9RQUFBREFCQUFBQU1BSVBGQ21XQUJBQVpvNitQTElzQUFBQUFZYzNSMGN3QUFBQUFBQUFBQkFBQUFBZ0FBUUFBQUFBQVVjM1J6Y3dBQUFBQUFBQUFCQUFBQUFRQUFBQnh6ZEhOakFBQUFBQUFBQUFFQUFBQUJBQUFBQWdBQUFBRUFBQUFjYzNSemVnQUFBQUFBQUFBQUFBQUFBZ0FBRGtFQUFBUzdBQUFBRkhOMFkyOEFBQUFBQUFBQUFRQUFBREFBQUFCaWRXUjBZUUFBQUZwdFpYUmhBQUFBQUFBQUFDRm9aR3h5QUFBQUFBQUFBQUJ0WkdseVlYQndiQUFBQUFBQUFBQUFBQUFBQUMxcGJITjBBQUFBSmFsMGIyOEFBQUFkWkdGMFlRQUFBQUVBQUFBQVRHRjJaalUzTGpjeUxqRXdNQT09XCI7XHJcbiAgICAgICAgdGhpcy5fdGVzdFZpZGVvTW9kZSA9IHBhcmFtcyA/IHBhcmFtcy50ZXN0VmlkZW9Nb2RlID8gdHJ1ZSA6IGZhbHNlIDogZmFsc2U7XHJcblxyXG4gICAgICAgIHRoaXMuX3Rlc3RWaWRlb1VybCA9IHBhcmFtcyA/IHBhcmFtcy50ZXN0VmlkZW9VcmwgPyBwYXJhbXMudGVzdFZpZGVvVXJsIDogdGhpcy5fdGVzdFZpZGVvRGF0YSA6IHRoaXMuX3Rlc3RWaWRlb0RhdGE7XHJcblxyXG4gICAgICAgIHRoaXMuX3dlYmNhbVBhcmFtcyA9IChwYXJhbXMgJiYgcGFyYW1zLmNvbnN0cmFpbnRzICkgPyBwYXJhbXMuY29uc3RyYWludHMgOiB7XHJcbiAgICAgICAgICAgIC8vYXVkaW86IHRydWUsXHJcbiAgICAgICAgICAgIHZpZGVvOiB7XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogNjQwLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiA0ODAsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLl92aWRlb1RhZyA9IHBhcmFtcyA/IHBhcmFtcy52aWRlb1RhZyA/IHBhcmFtcy52aWRlb1RhZyA6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJykgOiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5fbG9jYWxNZWRpYVN0cmVhbSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fb25HZXRVc2VyTWVkaWFDYWxsYmFjayA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fd2ViY2FtU3RhcnRlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLl9vblNuYXBTaG90Q2FsbGJhY2sgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX3NuYXBTaG90U2l6ZSA9IHtcclxuICAgICAgICAgICAgd2lkdGg6IDY0MCwgaGVpZ2h0OiA0ODBcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuX3NuYXBTaG90Q2FudmFzID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9zbmFwU2hvdENvbnRleHQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2NhbWVyYURldmljZSA9IG51bGw7XHJcblxyXG4gICAgICAgIHRoaXMuX3VzZUltYWdlQ2FwdHVyZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5faW1hZ2VDYXB0dXJlID0gbnVsbDtcclxuXHJcbiAgICAgICAgdGhpcy5faXNGbGlwSW1hZ2UgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCB1c2UgSW1hZ2VDYXB0dXJlIEFQSSAoRGVmYXVsdCBpcyB0cnVlKVxyXG4gICAgICpcclxuICAgICAqIFVzZSBuZXcgQVBJIGZvciB0YWlraW5nIGEgcGljdHVyZVxyXG4gICAgICogaHR0cHM6Ly93M2MuZ2l0aHViLmlvL21lZGlhY2FwdHVyZS1pbWFnZS8jZG9tLWltYWdlY2FwdHVyZS10YWtlcGhvdG9cclxuICAgICAqXHJcbiAgICAgKiBHb29nbGUgc2F5cyB0aGlzIEFQSSBoYXMgYmVlbiBzdXBwb3J0ZWQgc2luY2UgY2hyb21lIDU5LkJ1dCB0aGlzIEFQSSBpcyBXb3JraW5nIERyYWZ0IHN0YXRlIGFuZFxyXG4gICAgICogdGhlcmUgYXJlIGJ1Z3Mgb24gdGFrZXBob3RvIEFQSSBvbiBjaHJvbWUgNjIgZm9yIHdpbi5cclxuICAgICAqIEFuZCBwb2x5ZmlsbCBpbXBsZW1lbnRhdGlvbiBjYW5ub3QgaGVscCBvbiB0aGUgbGF0ZXN0IGJ1Z2d5IGltcGxlbWVudGF0aW9uLlxyXG4gICAgICpcclxuICAgICAqIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL3dlYi91cGRhdGVzLzIwMTYvMTIvaW1hZ2VjYXB0dXJlXHJcbiAgICAgKlxyXG4gICAgICogWW91IGNhbiBjaG9vc2Ugd2hldGhlciB5b3Ugd2FudCB0byB1c2UgaXQgb3Igbm90LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB2YWx1ZVxyXG4gICAgICovXHJcbiAgICBXZWJDYW1NYW5hZ2VyLnByb3RvdHlwZS5zZXRVc2VJbWFnZUNhcHR1cmVBUEkgPSBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIF90aGlzLl91c2VJbWFnZUNhcHR1cmUgPSB2YWx1ZTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHdoZXRoZXIgb3Igbm90IHRvIGZsaXAgdGhlIGltYWdlIHdoZW4gZ3JhYkZyYW1lL3NuYXBTaG90Q2FsbGJhY2sgaXMgZXhlY3V0ZWRcclxuICAgICAqIEBwYXJhbSBib29sVmFsdWVcclxuICAgICAqL1xyXG4gICAgV2ViQ2FtTWFuYWdlci5wcm90b3R5cGUuc2V0RmxpcEltYWdlRW5hYmxlZCA9IGZ1bmN0aW9uIChib29sVmFsdWUpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIF90aGlzLl9pc0ZsaXBJbWFnZSA9IGJvb2xWYWx1ZTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgaW5zdGFsbGVkIGNhbWVyYSBkZXZpY2VzXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gcmV0dXJucyBkZXZpY2VzIGFzIHByb21pc2VcclxuICAgICAqL1xyXG4gICAgV2ViQ2FtTWFuYWdlci5wcm90b3R5cGUuZ2V0Q2FtZXJhRGV2aWNlcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gW107XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblxyXG4gICAgICAgICAgICAvL2xpc3QgaW5zdGFsbGVkIGRldmljZXMoYXV0aW9pbnB1dCx2aWRlb2lucHV0LCwsKVxyXG4gICAgICAgICAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmVudW1lcmF0ZURldmljZXMoKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRldmljZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBkZXZpY2VzLmZvckVhY2goZnVuY3Rpb24gKGRldmljZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9jaGVjayBpZiB0aGlzIGRldmljZSBpcyBjYW1lcmEodmlkZW9pbnB1dClcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRldmljZS5raW5kID09IFwidmlkZW9pbnB1dFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChkZXZpY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiV2ViIGNhbWVyYSBub3QgZm91bmQgZT1cIiArIGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGNhbnZhcyBmb3IgaW50ZXJuYWwgZHJhd1xyXG4gICAgICogQHBhcmFtIGRldmljZVxyXG4gICAgICogQHJldHVybnMge251bGx8Kn1cclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIFdlYkNhbU1hbmFnZXIucHJvdG90eXBlLl9nZXRTbmFwU2hvdENhbnZhcyA9IGZ1bmN0aW9uIChkZXZpY2UpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIGlmICghX3RoaXMuX3NuYXBTaG90Q2FudmFzKSB7XHJcbiAgICAgICAgICAgIF90aGlzLl9zbmFwU2hvdENhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIF90aGlzLl9zbmFwU2hvdENhbnZhcztcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgY29udGV4dChjYW52YXMgY29udGV4dCkgZm9yIGludGVybmFsIGRyYXdcclxuICAgICAqIEBwYXJhbSBkZXZpY2VcclxuICAgICAqIEByZXR1cm5zIHtudWxsfCp9XHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBXZWJDYW1NYW5hZ2VyLnByb3RvdHlwZS5fZ2V0U25hcFNob3RDb250ZXh0ID0gZnVuY3Rpb24gKGRldmljZSkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgaWYgKCFfdGhpcy5fc25hcFNob3RDb250ZXh0KSB7XHJcbiAgICAgICAgICAgIF90aGlzLl9zbmFwU2hvdENvbnRleHQgPSBfdGhpcy5fZ2V0U25hcFNob3RDYW52YXMoKS5nZXRDb250ZXh0KFwiMmRcIik7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gX3RoaXMuX3NuYXBTaG90Q29udGV4dDtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFN0YXJ0IGNhbWVyYSBzdHJlYW1pbmdcclxuICAgICAqIEBwYXJhbSBkZXZpY2VcclxuICAgICAqL1xyXG4gICAgV2ViQ2FtTWFuYWdlci5wcm90b3R5cGUuc2V0Q2FtZXJhRGV2aWNlID0gZnVuY3Rpb24gKGRldmljZSkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgaWYgKGRldmljZSAmJiBkZXZpY2Uua2luZCAmJiBkZXZpY2Uua2luZCA9PSBcInZpZGVvaW5wdXRcIikge1xyXG4gICAgICAgICAgICBfdGhpcy5fY2FtZXJhRGV2aWNlID0gZGV2aWNlO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBcInZpZGVvXCIgZWxlbWVudFxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKi9cclxuICAgIFdlYkNhbU1hbmFnZXIucHJvdG90eXBlLmdldFZpZGVvVGFnID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIF90aGlzLl92aWRlb1RhZztcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgc25hcHNob3QoY2FwdHVyZWQgaW1hZ2UpIGNhbGxiYWNrLlxyXG4gICAgICogT25jZSB5b3Ugc2V0IHRoaXMgY2FsbGJhY2ssIHRoZSBjYXB0dXJlZCBpbWFnZSB3aWxsIGJlIHNlbnQgZXZlcnkgdGltZS5cclxuICAgICAqIEBwYXJhbSBjYWxsYmFja0Z1bmNcclxuICAgICAqIEBwYXJhbSB3aWR0aFxyXG4gICAgICogQHBhcmFtIGhlaWdodFxyXG4gICAgICovXHJcbiAgICBXZWJDYW1NYW5hZ2VyLnByb3RvdHlwZS5zZXRPblNuYXBTaG90Q2FsbGJhY2sgPSBmdW5jdGlvbiAoY2FsbGJhY2tGdW5jLCB3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICBfdGhpcy5fb25TbmFwU2hvdENhbGxiYWNrID0gY2FsbGJhY2tGdW5jO1xyXG5cclxuICAgICAgICBpZiAod2lkdGggJiYgaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIF90aGlzLl9zbmFwU2hvdFNpemUud2lkdGggPSB3aWR0aDtcclxuICAgICAgICAgICAgX3RoaXMuX3NuYXBTaG90U2l6ZS5oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgX3RoaXMuX3NuYXBTaG90U2l6ZS53aWR0aCA9IG51bGw7XHJcbiAgICAgICAgICAgIF90aGlzLl9zbmFwU2hvdFNpemUuaGVpZ2h0ID0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShfdGhpcy5fc25hcFNob3RMb29wLmJpbmQoX3RoaXMpKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIFdlYkNhbU1hbmFnZXIucHJvdG90eXBlLl9zbmFwU2hvdExvb3AgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgaWYgKCFfdGhpcy5fb25TbmFwU2hvdENhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShfdGhpcy5fc25hcFNob3RMb29wLmJpbmQoX3RoaXMpKTtcclxuXHJcbiAgICAgICAgaWYgKF90aGlzLl9vblNuYXBTaG90Q2FsbGJhY2spIHtcclxuXHJcblxyXG4gICAgICAgICAgICBpZiAoX3RoaXMuaXNWaWRlb1RyYWNrTGl2ZSgpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgX3RoaXMuZ3JhYkZyYW1lKF90aGlzLl9zbmFwU2hvdFNpemUud2lkdGgsIF90aGlzLl9zbmFwU2hvdFNpemUuaGVpZ2h0KVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChpbWFnZUJpdG1hcCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuX29uU25hcFNob3RDYWxsYmFjayhpbWFnZUJpdG1hcCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3JlcXVlc3RBbmltYXRpb25GcmFtZShfdGhpcy5fc25hcFNob3RMb29wLmJpbmQoX3RoaXMpKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLy0gQW4gZXJyb3Igb2NjdXJzIGlmIHRoZSBmcmFtZSBjYW4gbm90IGJlIHByZXBhcmVkXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUuZXJyb3IoXCJmcmFtZSBkcm9wcGVkIGVycm9yPVwiICsgZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FwdHVyZSBpbWFnZShkYXRhIFVSSSkgZnJvbSBjYW1lcmEgbGl2ZSBzdHJlYW0gdXNpbmcgb2xkIGFwcHJvYWNoXHJcbiAgICAgKiBAcGFyYW0gd2lkdGhcclxuICAgICAqIEBwYXJhbSBoZWlnaHRcclxuICAgICAqIEBwYXJhbSBkYXRhRm9ybWF0XHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqL1xyXG4gICAgV2ViQ2FtTWFuYWdlci5wcm90b3R5cGUuY2FwdHVyZSA9IGZ1bmN0aW9uICh3aWR0aCwgaGVpZ2h0LCBkYXRhRm9ybWF0KSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgdmFyIHZpZGVvID0gX3RoaXMuX3ZpZGVvVGFnO1xyXG5cclxuXHJcbiAgICAgICAgaWYgKHZpZGVvLnJlYWR5U3RhdGUgPT09IHZpZGVvLkhBVkVfRU5PVUdIX0RBVEEgJiYgdmlkZW8udmlkZW9XaWR0aCA+IDApIHtcclxuICAgICAgICAgICAgLy8gLSBpZiB2aWRlbyBzdHJlYW0gaXMgcmVhZHlcclxuXHJcbiAgICAgICAgICAgIHZhciBfd2lkdGggPSB3aWR0aDtcclxuICAgICAgICAgICAgdmFyIF9oZWlnaHQgPSBoZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICB2YXIgY29udGV4dCA9IF90aGlzLl9nZXRTbmFwU2hvdENvbnRleHQoKTtcclxuICAgICAgICAgICAgdmFyIGNhbnZhcyA9IF90aGlzLl9nZXRTbmFwU2hvdENhbnZhcygpO1xyXG5cclxuICAgICAgICAgICAgY2FudmFzLndpZHRoID0gX3dpZHRoO1xyXG4gICAgICAgICAgICBjYW52YXMuaGVpZ2h0ID0gX2hlaWdodDtcclxuXHJcbiAgICAgICAgICAgIGlmIChfdGhpcy5faXNGbGlwSW1hZ2UpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQudHJhbnNsYXRlKGNhbnZhcy53aWR0aCwgMCk7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LnNjYWxlKC0xLCAxKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9jYXB0dXJlIGltYWdlIGZyb20gbWVkaWEgc3RyZWFtLlxyXG4gICAgICAgICAgICBjb250ZXh0LmRyYXdJbWFnZSh2aWRlbywgMCwgMCwgX3dpZHRoLCBfaGVpZ2h0KTtcclxuICAgICAgICAgICAgaWYgKGRhdGFGb3JtYXQgPT0gXCJpbWFnZURhdGFcIikge1xyXG4gICAgICAgICAgICAgICAgdmFyIHNuYXBzaG90SW1hZ2VEYXRhID0gY29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgX3dpZHRoLCBfaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzbmFwc2hvdEltYWdlRGF0YTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciBzbmFwc2hvdEltYWdlRGF0YVVSTCA9IGNhbnZhcy50b0RhdGFVUkwoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzbmFwc2hvdEltYWdlRGF0YVVSTDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGEgc25hcHNob3Qgb2YgdGhlIGxpdmUgdmlkZW8gaW4gdGhlVHJhY2sgYXMgYW4gSW1hZ2VCaXRtYXBcclxuICAgICAqIEBwYXJhbSB3aWR0aCBJbiBcInVzZUltYWdlQ2FwdHVyZVwiIG1vZGUgdGhpcyBwYXJhbWV0ZXIgaXMgaWdub3JlZFxyXG4gICAgICogQHBhcmFtIGhlaWdodCBJbiBcInVzZUltYWdlQ2FwdHVyZVwiIG1vZGUgdGhpcyBwYXJhbWV0ZXIgaXMgaWdub3JlZFxyXG4gICAgICogQHJldHVybnMge1Byb21pc2V9XHJcbiAgICAgKi9cclxuICAgIFdlYkNhbU1hbmFnZXIucHJvdG90eXBlLmdyYWJGcmFtZSA9IGZ1bmN0aW9uICh3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgdmFyIHZpZGVvID0gX3RoaXMuX3ZpZGVvVGFnO1xyXG5cclxuXHJcbiAgICAgICAgaWYgKF90aGlzLl91c2VJbWFnZUNhcHR1cmUpIHtcclxuXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBjYW52YXMgPSBfdGhpcy5fZ2V0U25hcFNob3RDYW52YXMoKTtcclxuICAgICAgICAgICAgICAgIHZhciBjb250ZXh0ID0gX3RoaXMuX2dldFNuYXBTaG90Q29udGV4dCgpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBfdGhpcy5fZ2V0SW1hZ2VDYXB0dXJlKCkuZ3JhYkZyYW1lKClcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoaW1hZ2VCaXRtYXApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3aWR0aCAmJiBoZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbnZhcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FudmFzLmhlaWdodCA9IGhlaWdodDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMuX2lzRmxpcEltYWdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC50cmFuc2xhdGUoY2FudmFzLndpZHRoLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnNjYWxlKC0xLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuZHJhd0ltYWdlKGltYWdlQml0bWFwLCAwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHdpbmRvdy5jcmVhdGVJbWFnZUJpdG1hcChjYW52YXMpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLl9pc0ZsaXBJbWFnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbnZhcy53aWR0aCA9IGltYWdlQml0bWFwLndpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbnZhcy5oZWlnaHQgPSBpbWFnZUJpdG1hcC5oZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQudHJhbnNsYXRlKGNhbnZhcy53aWR0aCwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5zY2FsZSgtMSwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UoaW1hZ2VCaXRtYXAsIDAsIDApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHdpbmRvdy5jcmVhdGVJbWFnZUJpdG1hcChjYW52YXMpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoaW1hZ2VCaXRtYXApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gZXhlY3V0b3I0R3JhYkZyYW1lKHJlc29sdmUsIHJlamVjdCkge1xyXG5cclxuICAgICAgICAgICAgaWYgKCFfdGhpcy5pc1ZpZGVvVHJhY2tMaXZlKCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QobmV3IERPTUV4Y2VwdGlvbignSW52YWxpZFN0YXRlRXJyb3InKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3dpZHRoLCBfaGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh3aWR0aCAmJiBoZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgICAgICBfd2lkdGggPSB3aWR0aDtcclxuICAgICAgICAgICAgICAgICAgICBfaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBfd2lkdGggPSB2aWRlby52aWRlb1dpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgIF9oZWlnaHQgPSB2aWRlby52aWRlb0hlaWdodDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhciBjb250ZXh0ID0gX3RoaXMuX2dldFNuYXBTaG90Q29udGV4dCgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGNhbnZhcyA9IF90aGlzLl9nZXRTbmFwU2hvdENhbnZhcygpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNhbnZhcy53aWR0aCA9IF93aWR0aDtcclxuICAgICAgICAgICAgICAgIGNhbnZhcy5oZWlnaHQgPSBfaGVpZ2h0O1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAod2lkdGggJiYgaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UodmlkZW8sIDAsIDAsIF93aWR0aCwgX2hlaWdodCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuZHJhd0ltYWdlKHZpZGVvLCAwLCAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHdpbmRvdy5jcmVhdGVJbWFnZUJpdG1hcChjYW52YXMpKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRE9NRXhjZXB0aW9uKCdVbmtub3duRXJyb3InKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGFrZSBwaG90b1xyXG4gICAgICogQHJldHVybnMge1Byb21pc2V9XHJcbiAgICAgKi9cclxuICAgIFdlYkNhbU1hbmFnZXIucHJvdG90eXBlLnRha2VQaG90byA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG5cclxuICAgICAgICB2YXIgdmlkZW8gPSBfdGhpcy5fdmlkZW9UYWc7XHJcblxyXG4gICAgICAgIGlmIChfdGhpcy5fdXNlSW1hZ2VDYXB0dXJlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfdGhpcy5fZ2V0SW1hZ2VDYXB0dXJlKCkudGFrZVBob3RvKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gZXhlY3V0b3I0R3JhYkZyYW1lKHJlc29sdmUsIHJlamVjdCkge1xyXG5cclxuICAgICAgICAgICAgaWYgKCFfdGhpcy5pc1ZpZGVvVHJhY2tMaXZlKCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QobmV3IERPTUV4Y2VwdGlvbignSW52YWxpZFN0YXRlRXJyb3InKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3dpZHRoLCBfaGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgICAgIF93aWR0aCA9IHZpZGVvLnZpZGVvV2lkdGg7XHJcbiAgICAgICAgICAgICAgICBfaGVpZ2h0ID0gdmlkZW8udmlkZW9IZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGNvbnRleHQgPSBfdGhpcy5fZ2V0U25hcFNob3RDb250ZXh0KCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2FudmFzID0gX3RoaXMuX2dldFNuYXBTaG90Q2FudmFzKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FudmFzLndpZHRoID0gX3dpZHRoO1xyXG4gICAgICAgICAgICAgICAgY2FudmFzLmhlaWdodCA9IF9oZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UodmlkZW8sIDAsIDApO1xyXG5cclxuICAgICAgICAgICAgICAgIGNhbnZhcy50b0Jsb2IocmVzb2x2ZSk7XHJcblxyXG5cclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRE9NRXhjZXB0aW9uKCdVbmtub3duRXJyb3InKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxiYWNrIHdoZW4gZ2V0VXNlck1lZGlhIGZpbmlzaGVkXHJcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2tGdW5jXHJcbiAgICAgKi9cclxuICAgIFdlYkNhbU1hbmFnZXIucHJvdG90eXBlLnNldE9uR2V0VXNlck1lZGlhQ2FsbGJhY2sgPSBmdW5jdGlvbiAoY2FsbGJhY2tGdW5jKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICBfdGhpcy5fb25HZXRVc2VyTWVkaWFDYWxsYmFjayA9IGNhbGxiYWNrRnVuYztcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTdGFydCBjYW1lcmEgc3RyZWFtaW5nXHJcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2tGdW5jXHJcbiAgICAgKi9cclxuICAgIFdlYkNhbU1hbmFnZXIucHJvdG90eXBlLnN0YXJ0Q2FtZXJhID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcblxyXG5cclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG5cclxuXHJcbiAgICAgICAgICAgIGlmIChfdGhpcy5fd2ViY2FtU3RhcnRlZCkge1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIF90aGlzLmRvV2ViY2FtUG9seWZpbGwoKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghX3RoaXMuaGFzR2V0VXNlck1lZGlhKCkgfHwgX3RoaXMuX3Rlc3RWaWRlb01vZGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBfdGhpcy5fd2ViY2FtU3RhcnRlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghX3RoaXMuX3Rlc3RWaWRlb01vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiV2ViIGNhbWVyYSBub3QgZm91bmRcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgX3RoaXMuX3ZpZGVvVGFnLnNyYyA9IF90aGlzLl90ZXN0VmlkZW9Vcmw7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5fdmlkZW9UYWcubG9vcCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5fdmlkZW9UYWcucGxheSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChfdGhpcy5fb25HZXRVc2VyTWVkaWFDYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLl9vbkdldFVzZXJNZWRpYUNhbGxiYWNrLmJpbmQoX3RoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLl9vbkdldFVzZXJNZWRpYUNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy9JZ25pdGUgdGhlIHNuYXBTaG90TG9vcCB3aGVuIHN0YXJ0Q2FtZXJhIGlzIGNhbGxlZFxyXG4gICAgICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKF90aGlzLl9zbmFwU2hvdExvb3AuYmluZChfdGhpcykpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICByZWplY3QoKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIHZhciB3ZWJjYW1QYXJhbSA9IF90aGlzLl93ZWJjYW1QYXJhbXM7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIC8vIElmIHlvdSB1c2UgXCJtYW5kYXRvcnlcIiBhbmQgXCJkZXZpY2VJZFwiIGF0IHRoZSBzYW1lIHRpbWUgb24gY2hyb21lIHlvdSBnZXQgYW4gZXJyb3IgbGlrZVxyXG4gICAgICAgICAgICAgICAgLy8gXCJNYWxmb3JtZWQgY29uc3RyYWludDogQ2Fubm90IHVzZSBib3RoIG9wdGlvbmFsL21hbmRhdG9yeSBhbmQgc3BlY2lmaWMgb3IgYWR2YW5jZWQgY29uc3RyYWludHNcIlxyXG4gICAgICAgICAgICAgICAgLy8gWW91IHNob3VsZCB1c2UgXCJzb3VyY2VJZFwiIHdpdGggXCJtYW5kYXRvcnlcIiBpbnN0ZWFkIG9mIHVzaW5nIFwiZGV2aWNlSWRcIlxyXG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLl9jYW1lcmFEZXZpY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAtIGlmIGNhbWVyYSBkZXZpY2Ugc3BlY2lmaWVkIGV4cGxpY2l0bHlcclxuICAgICAgICAgICAgICAgICAgICBpZiAod2ViY2FtUGFyYW0udmlkZW8ubWFuZGF0b3J5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlYmNhbVBhcmFtLnZpZGVvLm1hbmRhdG9yeS5zb3VyY2VJZCA9IF90aGlzLl9jYW1lcmFEZXZpY2UuZGV2aWNlSWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2ViY2FtUGFyYW0udmlkZW8uZGV2aWNlSWQgPSB3ZWJjYW1QYXJhbS52aWRlby5kZXZpY2VJZCA/IHdlYmNhbVBhcmFtLnZpZGVvLmRldmljZUlkIDogd2ViY2FtUGFyYW0udmlkZW8uZGV2aWNlSWQgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2ViY2FtUGFyYW0udmlkZW8uZGV2aWNlSWQuZXhhY3QgPSBfdGhpcy5fY2FtZXJhRGV2aWNlLmRldmljZUlkO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEod2ViY2FtUGFyYW0pLnRoZW4oZnVuY3Rpb24gKG1lZGlhU3RyZWFtKSB7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5fbG9jYWxNZWRpYVN0cmVhbSA9IG1lZGlhU3RyZWFtO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIF90aGlzLl92aWRlb1RhZy5zcmNPYmplY3QgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuX3ZpZGVvVGFnLnNyY09iamVjdCA9IG1lZGlhU3RyZWFtO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl92aWRlb1RhZy5zcmMgPSB3aW5kb3cuVVJMICYmIHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKG1lZGlhU3RyZWFtKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5nZXRDYXBhYmlsaXRpZXMoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuX3ZpZGVvVGFnLnBsYXkoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuX3dlYmNhbVN0YXJ0ZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMuX29uR2V0VXNlck1lZGlhQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuX29uR2V0VXNlck1lZGlhQ2FsbGJhY2suYmluZChfdGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl9vbkdldFVzZXJNZWRpYUNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL0lnbml0ZSB0aGUgc25hcFNob3RMb29wIHdoZW4gc3RhcnRDYW1lcmEgaXMgY2FsbGVkXHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKF90aGlzLl9zbmFwU2hvdExvb3AuYmluZChfdGhpcykpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdXZWIgY2FtZXJhIG5vdCBmb3VuZCcsIGUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5fdmlkZW9UYWcuc3JjID0gX3RoaXMuX3Rlc3RWaWRlb1VybDtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5fdmlkZW9UYWcubG9vcCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLl92aWRlb1RhZy5wbGF5KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLl93ZWJjYW1TdGFydGVkID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy5fb25HZXRVc2VyTWVkaWFDYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fb25HZXRVc2VyTWVkaWFDYWxsYmFjay5iaW5kKF90aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuX29uR2V0VXNlck1lZGlhQ2FsbGJhY2soKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vSWduaXRlIHRoZSBzbmFwU2hvdExvb3Agd2hlbiBzdGFydENhbWVyYSBpcyBjYWxsZWRcclxuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoX3RoaXMuX3NuYXBTaG90TG9vcC5iaW5kKF90aGlzKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIFdlYkNhbU1hbmFnZXIucHJvdG90eXBlLmdldENhcGFiaWxpdGllcyA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgdmFyIHRyYWNrID0gX3RoaXMuZ2V0VmlkZW9UcmFjaygpO1xyXG4gICAgICAgIGlmICh0cmFjaykge1xyXG4gICAgICAgICAgICB2YXIgY2FwYWJpbGl0aWVzID0gdHJhY2suZ2V0Q2FwYWJpbGl0aWVzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdmlkZW8gdHJhY2tcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICovXHJcbiAgICBXZWJDYW1NYW5hZ2VyLnByb3RvdHlwZS5nZXRWaWRlb1RyYWNrID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG5cclxuICAgICAgICBpZiAoX3RoaXMuX2xvY2FsTWVkaWFTdHJlYW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIF90aGlzLl9sb2NhbE1lZGlhU3RyZWFtLmdldFZpZGVvVHJhY2tzKClbMF07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybiB0cnVlIHdoZW4gdmlkZW8gdHJhY2sgaXMgbGl2ZS5cclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICBXZWJDYW1NYW5hZ2VyLnByb3RvdHlwZS5pc1ZpZGVvVHJhY2tMaXZlID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHZhciB0cmFjayA9IF90aGlzLmdldFZpZGVvVHJhY2soKTtcclxuICAgICAgICByZXR1cm4gdHJhY2sgJiYgdHJhY2sucmVhZHlTdGF0ZSA9PT0gXCJsaXZlXCI7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFN0b3AgY2FtZXJhIHN0cmVhbWluZ1xyXG4gICAgICovXHJcbiAgICBXZWJDYW1NYW5hZ2VyLnByb3RvdHlwZS5zdG9wQ2FtZXJhID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG5cclxuICAgICAgICB2YXIgdHJhY2sgPSBfdGhpcy5nZXRWaWRlb1RyYWNrKCk7XHJcbiAgICAgICAgaWYgKHRyYWNrKSB7XHJcbiAgICAgICAgICAgIHRyYWNrLnN0b3AoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKF90aGlzLl92aWRlb1RhZykge1xyXG4gICAgICAgICAgICBfdGhpcy5fdmlkZW9UYWcucGF1c2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vZGlzcG9zZSBfaW1hZ2VDYXB0dXJlIG9iamVjdFxyXG4gICAgICAgIF90aGlzLl9pbWFnZUNhcHR1cmUgPSBudWxsO1xyXG5cclxuICAgICAgICBfdGhpcy5fd2ViY2FtU3RhcnRlZCA9IGZhbHNlO1xyXG4gICAgfTtcclxuXHJcbiAgICBXZWJDYW1NYW5hZ2VyLnByb3RvdHlwZS5kb1dlYmNhbVBvbHlmaWxsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgd2luZG93LlVSTCA9IHdpbmRvdy5VUkwgfHwgd2luZG93LndlYmtpdFVSTDtcclxuICAgICAgICAvL3BvbHlmaWxsXHJcbiAgICAgICAgaWYgKCFuYXZpZ2F0b3IubWVkaWFEZXZpY2VzKSB7XHJcbiAgICAgICAgICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMgPSB7fTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vZm9yIG9sZGVyIGFwcHJvYWNoIG5hdmlnYXRvci5nZXRVc2VyTWVkaWFcclxuICAgICAgICBuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhID0gbmF2aWdhdG9yLmdldFVzZXJNZWRpYVxyXG4gICAgICAgICAgICB8fCBuYXZpZ2F0b3Iud2Via2l0R2V0VXNlck1lZGlhXHJcbiAgICAgICAgICAgIHx8IG5hdmlnYXRvci5tb3pHZXRVc2VyTWVkaWEgfHwgbmF2aWdhdG9yLm1zR2V0VXNlck1lZGlhO1xyXG4gICAgfTtcclxuXHJcbiAgICBXZWJDYW1NYW5hZ2VyLnByb3RvdHlwZS5oYXNHZXRVc2VyTWVkaWEgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICByZXR1cm4gKG5hdmlnYXRvci5nZXRVc2VyTWVkaWEgfHwgbmF2aWdhdG9yLndlYmtpdEdldFVzZXJNZWRpYVxyXG4gICAgICAgICAgICB8fCBuYXZpZ2F0b3IubW96R2V0VXNlck1lZGlhIHx8IG5hdmlnYXRvci5tc0dldFVzZXJNZWRpYSB8fCBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYSk7XHJcbiAgICB9O1xyXG5cclxuICAgIFdlYkNhbU1hbmFnZXIucHJvdG90eXBlLl9nZXRJbWFnZUNhcHR1cmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgaWYgKF90aGlzLl91c2VJbWFnZUNhcHR1cmUgJiYgIV90aGlzLl9pbWFnZUNhcHR1cmUpIHtcclxuICAgICAgICAgICAgX3RoaXMuX2ltYWdlQ2FwdHVyZSA9IG5ldyBJbWFnZUNhcHR1cmUoX3RoaXMuZ2V0VmlkZW9UcmFjaygpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBfdGhpcy5faW1hZ2VDYXB0dXJlO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gV2ViQ2FtTWFuYWdlcjtcclxufSgpKTtcclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFdlYkNhbU1hbmFnZXI7XHJcbiJdfQ==
