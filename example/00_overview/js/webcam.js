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
            } else {
                requestAnimationFrame(_this._snapShotLoop.bind(_this));
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

            // - if snapshotCallback set

            var _width = width;
            var _height = height;

            var context = _this._getSnapShotContext();
            var canvas = _this._getSnapShotCanvas();

            canvas.width = _width;
            canvas.height = _height;


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsInNyYy93ZWJjYW0uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgd2ViY2FtX2pzID0gcmVxdWlyZSgnLi9zcmMvd2ViY2FtLmpzJyk7XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB3ZWJjYW1fanM7XHJcblxyXG4iLCIvKlxyXG4gKlxyXG4gKiBDb3B5cmlnaHQgMjAxNi0yMDE3IFRvbSBNaXNhd2EsIHJpdmVyc3VuLm9yZ0BnbWFpbC5jb21cclxuICpcclxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weSBvZlxyXG4gKiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZVxyXG4gKiBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLFxyXG4gKiBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlXHJcbiAqIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLFxyXG4gKiBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcclxuICpcclxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXHJcbiAqIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXHJcbiAqXHJcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1IgSU1QTElFRCxcclxuICogIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBXHJcbiAqIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUlxyXG4gKiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksXHJcbiAqIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1JcclxuICogSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cclxuICpcclxuICovXHJcbnZhciBXZWJDYW1NYW5hZ2VyID0gKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gcGFyYW1zXHJcbiAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gV2ViQ2FtTWFuYWdlcihwYXJhbXMpIHtcclxuXHJcbiAgICAgICAgdGhpcy5fdGVzdFZpZGVvRGF0YSA9IFwiZGF0YTp2aWRlby9tcDQ7YmFzZTY0LEFBQUFJR1owZVhCcGMyOXRBQUFDQUdsemIyMXBjMjh5WVhaak1XMXdOREVBQUFBSVpuSmxaUUFBRXdSdFpHRjBBQUFDclFZRi8vK3AzRVhwdmViWlNMZVdMTmdnMlNQdTczZ3lOalFnTFNCamIzSmxJREUwT0NCeU1qYzJNaUE1TUdFMk1XVmpJQzBnU0M0eU5qUXZUVkJGUnkwMElFRldReUJqYjJSbFl5QXRJRU52Y0hsc1pXWjBJREl3TURNdE1qQXhOeUF0SUdoMGRIQTZMeTkzZDNjdWRtbGtaVzlzWVc0dWIzSm5MM2d5TmpRdWFIUnRiQ0F0SUc5d2RHbHZibk02SUdOaFltRmpQVEVnY21WbVBUTWdaR1ZpYkc5amF6MHhPakE2TUNCaGJtRnNlWE5sUFRCNE16b3dlREV4TXlCdFpUMW9aWGdnYzNWaWJXVTlOeUJ3YzNrOU1TQndjM2xmY21ROU1TNHdNRG93TGpBd0lHMXBlR1ZrWDNKbFpqMHhJRzFsWDNKaGJtZGxQVEUySUdOb2NtOXRZVjl0WlQweElIUnlaV3hzYVhNOU1TQTRlRGhrWTNROU1TQmpjVzA5TUNCa1pXRmtlbTl1WlQweU1Td3hNU0JtWVhOMFgzQnphMmx3UFRFZ1kyaHliMjFoWDNGd1gyOW1abk5sZEQwdE1pQjBhSEpsWVdSelBUY2diRzl2YTJGb1pXRmtYM1JvY21WaFpITTlNU0J6YkdsalpXUmZkR2h5WldGa2N6MHdJRzV5UFRBZ1pHVmphVzFoZEdVOU1TQnBiblJsY214aFkyVmtQVEFnWW14MWNtRjVYMk52YlhCaGREMHdJR052Ym5OMGNtRnBibVZrWDJsdWRISmhQVEFnWW1aeVlXMWxjejB6SUdKZmNIbHlZVzFwWkQweUlHSmZZV1JoY0hROU1TQmlYMkpwWVhNOU1DQmthWEpsWTNROU1TQjNaV2xuYUhSaVBURWdiM0JsYmw5bmIzQTlNQ0IzWldsbmFIUndQVElnYTJWNWFXNTBQVEkxTUNCclpYbHBiblJmYldsdVBURWdjMk5sYm1WamRYUTlOREFnYVc1MGNtRmZjbVZtY21WemFEMHdJSEpqWDJ4dmIydGhhR1ZoWkQwME1DQnlZejFqY21ZZ2JXSjBjbVZsUFRFZ1kzSm1QVEl6TGpBZ2NXTnZiWEE5TUM0Mk1DQnhjRzFwYmowd0lIRndiV0Y0UFRZNUlIRndjM1JsY0QwMElHbHdYM0poZEdsdlBURXVOREFnWVhFOU1Ub3hMakF3QUlBQUFBdU1aWWlFQUJiLy92ZlRQOHl5Ni9jNXRlT285NktlSmw5RGRTVUJtNWJFN1RxQUFMcnhiNDdLK3Q1Sk0rckFZOEFBQXlBVk5ydi9DU04rSUE1UW9BeDlUS09DZmRESlhBY0VGSlFOaC85OTRRUGlIUlVHV3grTlE1emxPSHFRTHlNbzdoeXNkblVSbU43YkZjcnlwOWx3cjlMKytWL1dzQ2RYdXhmVHdQSGJVai9LWjVCVmV6QjM1RFdGY2pUeHN2SlV0MjNYbSsxd05aWTlzaDV0UFlMbE8ydXFBMDdmTDhoMExCMlFsOEZ1RzJzd0k1NDRUWjNNOCtZdjZCdHZ2bysvMWlQU1M2UUlxWmlkNUNaRldEc0JIQk1FN0I3V2FReWM1T1lqZGIwWHAxcGJCZDFzdzB5WHJQVDRMeExXWkxLWnBXbXFYeWYxZU9Vbk9uVWlmUUtYUFNsOTF5OUUzUnBIeWtYMzhjb2MyV0lTay9vRjFJU2V5SVRmWnJvZHc1VEdUMERhZGEyejBiQmovaVIzSVFCNWVOVHEyVXA1elMxaGQzNGRkYTNoZk5BYkJONGs2MHRKdVdJT1RySGNNbXY0UE1yd2E1VDFGT3B4ZVJyRmhNd3dncDBGSGNqZGVOeGhRbm5WSHg5OFQ4Y09ZWmVyRkUyVWZEaHpGaGhPaTFLNzFwRnBIdkI2RllzdjdFL1JNekU0eDVROXJNdytKbkFDOFlLZ2lRT0o0WmVNWVhaTXh1M0hsZW1UZngwQ0Z0dTZzcFRlYWVlWXdpY2ZiTmdEWExjVHlxcFBTeVlXbW9OTjRJZ0dtTnRtSEs2dmxNM2V5STZtS2VGWit1WnU5d1hWZnE2bkhiVG1venRud2R2VHNsWE15czRtczUvNzdrZnhacklvNENuQ3BTNTBFNmJBUzU4M3VpbTJVb3p5amxUODBEWFlUUG9uMStyZXBiWVg4SFFURitQN3lTQXRYWHhwSnp3Mzl1eElZcTl3Wlltd082RVkrZ000cWo1TWlqV1ZMVHNGTG50WkFkQVdFU3c2djNGY3dQZTBDTGpXYVp5ek1KdDYwWTBqeGdxTkd6M1NTR1ZHM3E3ZGZxcWZKL3lCTDRNSUovMlNrWlRNa3lReUxJRzA2SklTVWlzeVE2Z1BKdEhOa09aZmFZaWZ0R2NiZ2JjS3F5Ym81MWxYTDEzN1U4UU9lQlJRczJnUk0weEdjUEtna0wxY29SWGpXSXlSa0h1R3ZGclZUeHUyd0hNRG1nOUZKNEdINTdXeUV2ZUdFN2k0M2NBb3FOUXVMcXlwU3dzUXhRbzdWK1J5WG4waUtvZEx5WVM3MVZudGdUNjNGTTYrUHV4ckxDd3ovR2ticWtrVUdRaUlhQk5kTDVNVE4xWWFBZ0p1Ti82NEtpNTF4M1dicHowbEF6Z0VCZUx6aHNCMDZvWnY1R1NzK1RmKzlOblFtb0duZFlGWWxqY0FBTmdad1IwcHhQREVwZ0RlSHFJTC95YzZpR0svVnhCbWFOM3h3TElFdVZSZTNybnM2MEtLbUNhQy9MYThpUkNoYWpzUTFLTFN3cEx2WnEvNEFoSHNscjByREhHOWJUZlMwcWZEZGNiS0x3cmxlQ3l4YU5YWFBOb24zamlYSEt5aUlNYlVhTVRvREVmdHNPL0ZOZ3c2OHBKYXNCMWFzUStWTnVQOWpUbEpvY3hxTXBDbjdPVysyUVFqVkxEV05NR2d3d0t5Z05ycm55ODFRSTZoT1MySXRNWVBrcTJuWi81RWgvOTl4blh0dHFubTEwWVNsN0V3QzNWM1FSR0FlTXprMWNBbU9CaXBrTURUZGxYM0dVT1hLdUNMUlJzV0pYV2ZqK1EzMzltMkwzaWg0RTJ4ZE1sUTVrdUQ2bXBPZG1rdjRzcGJkYUUrNUIzdnJrOEpyN0lRL1lmL2xYUlhmUkN4UFhQbWhJRUxLK3VNWm5LUlpUQW4xcm91eXAvN0x4YldHZnZtOFUxOWl4ZjkvUnJyQ0VhYTBzOUJxNFVkcnFDRGpNZzM4d3REbWhlVzhOVitzbkFBNXhOSmtvL3Vhd0o1SmgyaXE0R3RsYkt0czlXeWIwV3FudldqTU1ldWFRd1BwWWxENnJWbDZIMWwyRzhUMXJLazhjUnB4MW1hbHpIc0s2YmlRNmRMQnhqOGJKSmdvMnE2UHkyRFJHVHYvQ040UzhkaUNPYjdCZHlkME9kSHMwNXg5eFhzVkJIL2M4ME1zbXlTbGh2ZHhJMERqSG9CdVhFVzQrNlg2ZS84OFNvUE0yb2dwd29IL3hoYkNVanBiWHV2cGtlM2ZGT29JWmFHQURscnB3dGEvcUFYNUdqeUlESGlMRFMwVFJieFgrQ3E0VTd4d0FLQ3VjQy9BV2pBVlBlcWFva1pZaWp1VXU0YUhieGI3MzRvK3dNeTFIZmU2MzRoS3FuL3AxY0xqR090WkM4QVZRS0ppdU1vWEFXc0pwRmlnRmJWZStHYTV4Q212STF2aEZDcURMNEZIQTRCVWZ2ZldUNjVFZWdMMThhOTJxTW0rUEpoRGRSNDRySmc2ZmlQc2dsTEhBR3loUmtiNmZJNTFwcDZhcG5ML3R1ZG5NOTNlMTlmNEtuN1BLbDBCQ2QwZXV2cEtPbk5iNFZDSi8yS0lLaCtzWVM0QnVsN2pDTjRaZlFNSzY0RW03Z2NnajZHUXEvNE1COEplTENkN1BYcFZIbUZmQWEvRUI2YlgxTGg5S1VGWGUwb2RNNFJwR3hwMHV3RkM0c3g1c1R3R3hrVzFmQVlFdkhBaGFSclgzYUZDSmJmUUZHUTlHQzhlTzI5Uk5FS0hkS1VZMUtmLzZLS3VQUHZBdXJRMnduL2VCbHNNZ0xTQVkyVEJNaFNyTzJOZ09IeEwzY3NLRTE3cmhCRnVNbGtqZDMzcFJmakN6VEx5Q0hQUExBM2p2c0wxSWx1MndybW8rb1RRQ1ZXay9oa2k5YWxxWTkxaUdWWDBWdnlPTFBCMm1vb3djNVZ2NzNoTkxOQ3pmUHVsMngrcHJjaDhqd2Nad1FjWTBkYTVNNHl0eXgvdXFYeU1Kc0c0NWdrN0hHMTFra2Q4cmdERkRNak0wbUFlVnBNMGM2WGw4QlNYYkJnOUl6cDM5ZXp0SkNkK2RDTjQxcHNEZk1nbWN2RFhRUHQxWnlwVWhDcDJDK0dqZkdLZmVnZUJjZkpOWVVydjJaRVlkSDc3cEZoN1d3TWlLLzc0eGdzM0VoODZ1ZE1EVkNDNG56dktpNHdZZUIwR0FFSEtLWFowUHZKMFJlbU5valNTSGVHVzFzRnJsN2RpWUtWaG9iNnBVaHB4dmV4ZThTYzhFSVBYTkhDYUs2bUhkRldpNjlUYWlvN0M5UU93czQ1VXZWdDB1cGpnNWkrMkJjZCs3T1YyNmdlYVZkL0N6V01rcWN3aGxJTUpTVjkxRHJjUVR2Z3pZY21aSDNOYjBLWlU3OGFFWjljWFVKMEFvRTRBK1VCSGd4MUFHeE45Ly9SUjNFOGNqSnhqU1RKVU9VS0h2aTJLTC9zQjlZWlNsaEdUTHU4L3FILzF5K2gzeWZGWnRCT0EwLzBWYm1oaGJvU0JQVkFURk1wSVZnM3ozNnI2UlFPS1FZcFo3SVJFem43RjBudTlManByUWRyNEM1aDlPbXpqU3c2cFo4bHpyTXVZMkhNMlFPdlEzb2kvRFRWODZVd09DeWdlYUt0eVdyV1UvT2dQVTZrY2xOYTM4dEpkKy9CMS83UHZmNnZFSXNXRk95MlhpR3Z2VkpKNUxsMHltdDhIVmtaSG1qZ2FoSngwdXFDM2JmNmYxZUVMSXhSWXN5UldoR01odFFKdVlYN0xlZXJUZFdvanRrMkhaMGMrVmpLMjNCY1N2V0FsVXkxZFRaOWNTT01BSjN1RXZ6bklHTHRDMHg2M2o0N3BaV2UwRGo1NW5LMzZ1ei9ERnhhVVdSY0VmTTFxbDZscjRBYVl2WmlmL3E2eGFQcTRwSHVCaXRWL3JCanUvVnpXa0NzZ01XVEJuSTZmRlY5czl5NnVKSk9lRzNqeGFtTGVxSExiSDJLNTZpYU9pMFh6MmhyUmF4bWNSRVRPT3pUUWFQSHBOUExMbnJRNEJCNFBCb2w1VjUyd0h5c3QvS0U5SXJGNis4Qlo3dDN5UGt0LzMvZk8zdDBleDhLR0R5aDkzT2Z0SFp3MWFiVkViVkR2S1l2cDFGcmFPdjdaSXVVMGIxaWJXSVZVOXkybDQraDhNTXo1YjcvNnMrbU9WU3Z0UkozNmpSSkVOdW1XTkJFTkcxOElTSDlVMzZaTHA0cEFxNmFXVkpYU0F6bkRWLzBrQzQ1TjR6SUQvR0xuVFlFb0xGUkNYRURMTzI3VVdJZ3BVdStBSXN4TUV3L3BRZWNRNVFhNlh2TEtwNFpZcUZiNDNLNWcxVjZuTU1yS3FnZ0RNRCtiNU45a09ydDZEMGVTSDlnV25KQlBlSVJqWHZmU21RRkx1SFY0MUlxbVJKOHQwakxSbjVXTFR0MHUvcmNHY01sdWtqLzkvK0QwajZJcmdsRDVPMlpVOG9KNjUzd0FsMXU0WG41K3FnemZZTFVZQWJIL1h2d2NFcU8yQkhuTlhXRFVTZzNSck91SnpsUUs4QjhwVUpMQ1V3TlpGRFdORWhnY1A2blpYUUVrRW9BNkhkcUx1dDF1R2JoSUF5K3QrNXU1anhLU0ZxTUlBR0hkeXVxMU95ZFhlNnhVZ3lyaHdqdUJxRmswZXdkQ0VvdkEwV1JvSThVb1BpQ1pxTzRiZWtNejdXWkJlZGUvdkNPbW5IZjhlc1VSYUliZ1FMUENMbE9wVE9QTFgvUGhlaGppT1hxd1JoNGFjTUgzOXZTc3hJOVhmekRxQ2hEZkU5cjBWTmpBdW96QS85TFRqLzVHMFV3c0diWFhMeHYxNFRGNUtFdHdZM2p3KzhOMzhXWFVXK0c2cXU5Y3lzMzkzY1JLMlNzZXlUR0VVV3Q5cGlUUURtMng4MEVsdWxmaUgvZjVJZzBDa2xacWhPOEN1SWxuSERRZG5qcVdta1dkdmQ3Unkza3ROamE2TUVzM3pSUFVyMFlhWGRkYWhtZ0lJMHhvTTRHV01jaTVCZHdxRjAyejF0c25OQUErOEg4QWxzYzB5cm9iK202S0FtMmJDN2UxOVhxaG5GL1hhbHZkQUhJUENRTUxCV0NGSktxaG9mY2VZZEVDOXVMSDZqaVJLeDZ6TGhNdGdpb3lzYTIzQUtOZ1FBQUJMZEJtaUZoR0IyQWZ4QlgvLzdXcFZBQk9IVVBsQURjWDhDVUtyVTdHV0tVQlFiZmlNY1pZSmpJRUJIVkpWS1VuWmJIQ3pjNERJclhTUFpyVjZjdGd3LzhQaUdIMUpLNlZvOExZVkhDcXI0enR3cnd2K1lBdjFFODNUNmpHV1ZDMDMxNmp5NUgvTHk0V3RIKzRVZkJqTmk3V3J3K2ZkVDFkVzJNY0F5NWhtenYvR3JCTklWQTZZS2NsSllYTFdPS2Y5UmVJUEVxc0NOcmZVTmFRV1RmM3p2V1hodmRpdXZNYzhkaHF6OU1VTk9HWVBldnFYUkRMVjQyK3IvU0FIRVhKcGtjNXBvMFJGTkd0S2dYSzlxUStWcmhmRG9NaVFxYnhWS1dqQU5jNUE4TXNSUGllZTJlTkx6R0I4VFBPK09UeS9WOXF2akNKQXljVW5pUlZBZzBqbG8waUlrNEVRMEZlS3ZVWEpyZ2ZZeDA1WENYK0ZFc0RwZ3lmQWxDVi9RUkVUT09sQnFLUE9CZkVlenZlbnJlSDFqMmgva3VBcUhWYVZ0L1FBZmNNN2NyWUtkVzZLaWVqNFd1blNhMlhhTkdOOHpuV0VoSW5PeVkrNERyUDVEdzFoMU1YNEJhZ2IrNHpkeFgvekREcXpKSnZzRzJVOFdYdy9xT2RmT1A4U1p1cTd0UGdGelVyaGNCa0FSZnlheHZmWjlFQlU1d0YvMml3R2pLMCtKeEVsOTJQY3poTFNxamZKSFNSK3VIYjhmRlovZVRNOGR2TEN0RDl6b0FNZmxQaUJoelo2Vi9adEx2MUkzOUdjOTNqangrYXJkOTlRSDU5Y3M5RUZtZ1JqclBtUG5QcytBQ1JaTFU4cTZBd1ZSZGNpRFFEb0Jmd1BzOHJnK0hLdW56U1VuMmNyTytTT1VpcVUxNTJIenRpd0JzZjRpZHNTWXVLZ0tCVGtrNVprMEJQNkFvTHlUSUd5NTN1SUw1Y3BHeGZMZ01WWlFGYUN0TmowczNOR1drZ1RzSWpBc1MwcUloeHpYK1MrOFB4VFFRVXBoS01jSVRhQnNubFd1Wjh2N01zUTlEdU1Xakc4VmZBT0t6eG04UlEzTnN6TjR1MnVweG9MeWRoSVkzQ3I1YXNSTFNiMkMyM1FoV0kyblo2WlM4eEU0eHlUUTR1VjJ3YXhJTTMwbnZ6dURZelhHM3ZoSm1KRytzclI3VmNLOFliZ2tWVFdkWHU2bTdXKzhFdGVVelFrUlRYZis3SnhDMDJ0WGh2czRQbi9DbVhiN0l0VGw1MHViSE9VcldOd1pHMTdZZmh6UCtiS0FGeHYzMUNrUGNHZmRhdVVYZDlkQ0NQbWNIbW43cGpaZ21LMnd3R3VkQ2xpdEJjQ2JSMEQ0SGxLaHhXbTQvSUo4SGtBVzR6ejFYajR2Sm1wSmZBTXVsKy9FSCtYaGk5QTFMTFJ2Q3VkblZ5cTcrRlZOMTJoU1BRaVZrVXdkUHpaWkt1d1F5T1FCVWpjM3g0clQ3UGl5ck1DYjRTVCtmY0VGK01mc2EyZ052Q0lLa0hqa0tEbE5GczBTTCtkTnB3NzVTcTVXUVFkaUhjVG91eXlaWW0wckNRZGlqamNRVHFvMWlSdTZaUE9CalZhcWZpUnVqN3Q0NkcyM1BNVTBwVU85MHJXZE1oajh2dGp3K2VXS3FRVXYvNkF0Yms1NE1VaEFtZEpDQy9PTjFHR3AvSXFaMXlWU1Ixd2RIV3pDRE53MzdvbmNwWVJoR3pTNmp0Y1pXUzdtN3pQNm9DTTZMUk4zTG9aam9sOUNEM28yOGY1NVhqY1VvUjE4RkZpMmVsSVdML2FQL3FZaVhXd1AxTDVtYlV2VndkUVBTdkw0NDhZTXNqUWphSGZhWWI2Mks4cUR2MHh0VnZzT1FNems1MVVEdkhpVmtrcSs0WmZIWTB6c3JGVFY5TWZSZWFCRXdzMUVNdFVFSXZTWVNzc3FqU0FRbURTUmQ2UnFQZjQ3RlhDR1BqaTdBWG43ZnZwc0I5WDk3NTVMdmRUcnlXSjI5NkZKWDYrdUNITXNCZmdzb1Q4MFFZQmRkbFh4OHhoRDRrNGYzbUFpSVZoTU42Q2UwS29aaEp2V0VXZEUrZlRDUjdnRDBjOThaSlBhL01zc29BQUFEQ20xdmIzWUFBQUJzYlhab1pBQUFBQUFBQUFBQUFBQUFBQUFBQStnQUFBZlFBQUVBQUFFQUFBQUFBQUFBQUFBQUFBQUJBQUFBQUFBQUFBQUFBQUFBQUFBQUFRQUFBQUFBQUFBQUFBQUFBQUFBUUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBSUFBQUkwZEhKaGF3QUFBRngwYTJoa0FBQUFBd0FBQUFBQUFBQUFBQUFBQVFBQUFBQUFBQWZRQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFCQUFBQUFBQUFBQUFBQUFBQUFBQUFBUUFBQUFBQUFBQUFBQUFBQUFBQVFBQUFBQUZBQUFBQThBQUFBQUFBSkdWa2RITUFBQUFjWld4emRBQUFBQUFBQUFBQkFBQUgwQUFBQUFBQUFRQUFBQUFCckcxa2FXRUFBQUFnYldSb1pBQUFBQUFBQUFBQUFBQUFBQUFBUUFBQUFJQUFWY1FBQUFBQUFDMW9aR3h5QUFBQUFBQUFBQUIyYVdSbEFBQUFBQUFBQUFBQUFBQUFWbWxrWlc5SVlXNWtiR1Z5QUFBQUFWZHRhVzVtQUFBQUZIWnRhR1FBQUFBQkFBQUFBQUFBQUFBQUFBQWtaR2x1WmdBQUFCeGtjbVZtQUFBQUFBQUFBQUVBQUFBTWRYSnNJQUFBQUFFQUFBRVhjM1JpYkFBQUFKZHpkSE5rQUFBQUFBQUFBQUVBQUFDSFlYWmpNUUFBQUFBQUFBQUJBQUFBQUFBQUFBQUFBQUFBQUFBQUFBRkFBUEFBU0FBQUFFZ0FBQUFBQUFBQUFRQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUJqLy93QUFBREZoZG1OREFXUUFEUC9oQUJoblpBQU1yTmxCUWZvUUFBQURBQkFBQUFNQUlQRkNtV0FCQUFabzYrUExJc0FBQUFBWWMzUjBjd0FBQUFBQUFBQUJBQUFBQWdBQVFBQUFBQUFVYzNSemN3QUFBQUFBQUFBQkFBQUFBUUFBQUJ4emRITmpBQUFBQUFBQUFBRUFBQUFCQUFBQUFnQUFBQUVBQUFBY2MzUnplZ0FBQUFBQUFBQUFBQUFBQWdBQURrRUFBQVM3QUFBQUZITjBZMjhBQUFBQUFBQUFBUUFBQURBQUFBQmlkV1IwWVFBQUFGcHRaWFJoQUFBQUFBQUFBQ0ZvWkd4eUFBQUFBQUFBQUFCdFpHbHlZWEJ3YkFBQUFBQUFBQUFBQUFBQUFDMXBiSE4wQUFBQUphbDBiMjhBQUFBZFpHRjBZUUFBQUFFQUFBQUFUR0YyWmpVM0xqY3lMakV3TUE9PVwiO1xyXG4gICAgICAgIHRoaXMuX3Rlc3RWaWRlb01vZGUgPSBwYXJhbXMgPyBwYXJhbXMudGVzdFZpZGVvTW9kZSA/IHRydWUgOiBmYWxzZSA6IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLl90ZXN0VmlkZW9VcmwgPSBwYXJhbXMgPyBwYXJhbXMudGVzdFZpZGVvVXJsID8gcGFyYW1zLnRlc3RWaWRlb1VybCA6IHRoaXMuX3Rlc3RWaWRlb0RhdGEgOiB0aGlzLl90ZXN0VmlkZW9EYXRhO1xyXG5cclxuICAgICAgICB0aGlzLl93ZWJjYW1QYXJhbXMgPSAocGFyYW1zICYmIHBhcmFtcy5jb25zdHJhaW50cyApID8gcGFyYW1zLmNvbnN0cmFpbnRzIDoge1xyXG4gICAgICAgICAgICAvL2F1ZGlvOiB0cnVlLFxyXG4gICAgICAgICAgICB2aWRlbzoge1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDY0MCxcclxuICAgICAgICAgICAgICAgIGhlaWdodDogNDgwLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5fdmlkZW9UYWcgPSBwYXJhbXMgPyBwYXJhbXMudmlkZW9UYWcgPyBwYXJhbXMudmlkZW9UYWcgOiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpIDogZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKTtcclxuXHJcblxyXG4gICAgICAgIHRoaXMuX2xvY2FsTWVkaWFTdHJlYW0gPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX29uR2V0VXNlck1lZGlhQ2FsbGJhY2sgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX3dlYmNhbVN0YXJ0ZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdGhpcy5fb25TbmFwU2hvdENhbGxiYWNrID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9zbmFwU2hvdFNpemUgPSB7XHJcbiAgICAgICAgICAgIHdpZHRoOiA2NDAsIGhlaWdodDogNDgwXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLl9zbmFwU2hvdENhbnZhcyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fc25hcFNob3RDb250ZXh0ID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9jYW1lcmFEZXZpY2UgPSBudWxsO1xyXG5cclxuICAgICAgICB0aGlzLl91c2VJbWFnZUNhcHR1cmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX2ltYWdlQ2FwdHVyZSA9IG51bGw7XHJcblxyXG4gICAgICAgIHRoaXMuX2lzRmxpcEltYWdlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgdXNlIEltYWdlQ2FwdHVyZSBBUEkgKERlZmF1bHQgaXMgdHJ1ZSlcclxuICAgICAqXHJcbiAgICAgKiBVc2UgbmV3IEFQSSBmb3IgdGFpa2luZyBhIHBpY3R1cmVcclxuICAgICAqIGh0dHBzOi8vdzNjLmdpdGh1Yi5pby9tZWRpYWNhcHR1cmUtaW1hZ2UvI2RvbS1pbWFnZWNhcHR1cmUtdGFrZXBob3RvXHJcbiAgICAgKlxyXG4gICAgICogR29vZ2xlIHNheXMgdGhpcyBBUEkgaGFzIGJlZW4gc3VwcG9ydGVkIHNpbmNlIGNocm9tZSA1OS5CdXQgdGhpcyBBUEkgaXMgV29ya2luZyBEcmFmdCBzdGF0ZSBhbmRcclxuICAgICAqIHRoZXJlIGFyZSBidWdzIG9uIHRha2VwaG90byBBUEkgb24gY2hyb21lIDYyIGZvciB3aW4uXHJcbiAgICAgKiBBbmQgcG9seWZpbGwgaW1wbGVtZW50YXRpb24gY2Fubm90IGhlbHAgb24gdGhlIGxhdGVzdCBidWdneSBpbXBsZW1lbnRhdGlvbi5cclxuICAgICAqXHJcbiAgICAgKiBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS93ZWIvdXBkYXRlcy8yMDE2LzEyL2ltYWdlY2FwdHVyZVxyXG4gICAgICpcclxuICAgICAqIFlvdSBjYW4gY2hvb3NlIHdoZXRoZXIgeW91IHdhbnQgdG8gdXNlIGl0IG9yIG5vdC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gdmFsdWVcclxuICAgICAqL1xyXG4gICAgV2ViQ2FtTWFuYWdlci5wcm90b3R5cGUuc2V0VXNlSW1hZ2VDYXB0dXJlQVBJID0gZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICBfdGhpcy5fdXNlSW1hZ2VDYXB0dXJlID0gdmFsdWU7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCB3aGV0aGVyIG9yIG5vdCB0byBmbGlwIHRoZSBpbWFnZSB3aGVuIGdyYWJGcmFtZS9zbmFwU2hvdENhbGxiYWNrIGlzIGV4ZWN1dGVkXHJcbiAgICAgKiBAcGFyYW0gYm9vbFZhbHVlXHJcbiAgICAgKi9cclxuICAgIFdlYkNhbU1hbmFnZXIucHJvdG90eXBlLnNldEZsaXBJbWFnZUVuYWJsZWQgPSBmdW5jdGlvbiAoYm9vbFZhbHVlKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICBfdGhpcy5faXNGbGlwSW1hZ2UgPSBib29sVmFsdWU7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IGluc3RhbGxlZCBjYW1lcmEgZGV2aWNlc1xyXG4gICAgICogQHJldHVybnMge1Byb21pc2V9IHJldHVybnMgZGV2aWNlcyBhcyBwcm9taXNlXHJcbiAgICAgKi9cclxuICAgIFdlYkNhbU1hbmFnZXIucHJvdG90eXBlLmdldENhbWVyYURldmljZXMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG5cclxuICAgICAgICAgICAgLy9saXN0IGluc3RhbGxlZCBkZXZpY2VzKGF1dGlvaW5wdXQsdmlkZW9pbnB1dCwsLClcclxuICAgICAgICAgICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5lbnVtZXJhdGVEZXZpY2VzKClcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkZXZpY2VzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGV2aWNlcy5mb3JFYWNoKGZ1bmN0aW9uIChkZXZpY2UpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY2hlY2sgaWYgdGhpcyBkZXZpY2UgaXMgY2FtZXJhKHZpZGVvaW5wdXQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZXZpY2Uua2luZCA9PSBcInZpZGVvaW5wdXRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goZGV2aWNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIldlYiBjYW1lcmEgbm90IGZvdW5kIGU9XCIgKyBlKTtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBjYW52YXMgZm9yIGludGVybmFsIGRyYXdcclxuICAgICAqIEBwYXJhbSBkZXZpY2VcclxuICAgICAqIEByZXR1cm5zIHtudWxsfCp9XHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBXZWJDYW1NYW5hZ2VyLnByb3RvdHlwZS5fZ2V0U25hcFNob3RDYW52YXMgPSBmdW5jdGlvbiAoZGV2aWNlKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICBpZiAoIV90aGlzLl9zbmFwU2hvdENhbnZhcykge1xyXG4gICAgICAgICAgICBfdGhpcy5fc25hcFNob3RDYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBfdGhpcy5fc25hcFNob3RDYW52YXM7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGNvbnRleHQoY2FudmFzIGNvbnRleHQpIGZvciBpbnRlcm5hbCBkcmF3XHJcbiAgICAgKiBAcGFyYW0gZGV2aWNlXHJcbiAgICAgKiBAcmV0dXJucyB7bnVsbHwqfVxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgV2ViQ2FtTWFuYWdlci5wcm90b3R5cGUuX2dldFNuYXBTaG90Q29udGV4dCA9IGZ1bmN0aW9uIChkZXZpY2UpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIGlmICghX3RoaXMuX3NuYXBTaG90Q29udGV4dCkge1xyXG4gICAgICAgICAgICBfdGhpcy5fc25hcFNob3RDb250ZXh0ID0gX3RoaXMuX2dldFNuYXBTaG90Q2FudmFzKCkuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIF90aGlzLl9zbmFwU2hvdENvbnRleHQ7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBTdGFydCBjYW1lcmEgc3RyZWFtaW5nXHJcbiAgICAgKiBAcGFyYW0gZGV2aWNlXHJcbiAgICAgKi9cclxuICAgIFdlYkNhbU1hbmFnZXIucHJvdG90eXBlLnNldENhbWVyYURldmljZSA9IGZ1bmN0aW9uIChkZXZpY2UpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIGlmIChkZXZpY2UgJiYgZGV2aWNlLmtpbmQgJiYgZGV2aWNlLmtpbmQgPT0gXCJ2aWRlb2lucHV0XCIpIHtcclxuICAgICAgICAgICAgX3RoaXMuX2NhbWVyYURldmljZSA9IGRldmljZTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgXCJ2aWRlb1wiIGVsZW1lbnRcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICovXHJcbiAgICBXZWJDYW1NYW5hZ2VyLnByb3RvdHlwZS5nZXRWaWRlb1RhZyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHJldHVybiBfdGhpcy5fdmlkZW9UYWc7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHNuYXBzaG90KGNhcHR1cmVkIGltYWdlKSBjYWxsYmFjay5cclxuICAgICAqIE9uY2UgeW91IHNldCB0aGlzIGNhbGxiYWNrLCB0aGUgY2FwdHVyZWQgaW1hZ2Ugd2lsbCBiZSBzZW50IGV2ZXJ5IHRpbWUuXHJcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2tGdW5jXHJcbiAgICAgKiBAcGFyYW0gd2lkdGhcclxuICAgICAqIEBwYXJhbSBoZWlnaHRcclxuICAgICAqL1xyXG4gICAgV2ViQ2FtTWFuYWdlci5wcm90b3R5cGUuc2V0T25TbmFwU2hvdENhbGxiYWNrID0gZnVuY3Rpb24gKGNhbGxiYWNrRnVuYywgd2lkdGgsIGhlaWdodCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgX3RoaXMuX29uU25hcFNob3RDYWxsYmFjayA9IGNhbGxiYWNrRnVuYztcclxuXHJcbiAgICAgICAgaWYgKHdpZHRoICYmIGhlaWdodCkge1xyXG4gICAgICAgICAgICBfdGhpcy5fc25hcFNob3RTaXplLndpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgICAgIF90aGlzLl9zbmFwU2hvdFNpemUuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIF90aGlzLl9zbmFwU2hvdFNpemUud2lkdGggPSBudWxsO1xyXG4gICAgICAgICAgICBfdGhpcy5fc25hcFNob3RTaXplLmhlaWdodCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKF90aGlzLl9zbmFwU2hvdExvb3AuYmluZChfdGhpcykpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgV2ViQ2FtTWFuYWdlci5wcm90b3R5cGUuX3NuYXBTaG90TG9vcCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG5cclxuICAgICAgICBpZiAoIV90aGlzLl9vblNuYXBTaG90Q2FsbGJhY2spIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKF90aGlzLl9zbmFwU2hvdExvb3AuYmluZChfdGhpcykpO1xyXG5cclxuICAgICAgICBpZiAoX3RoaXMuX29uU25hcFNob3RDYWxsYmFjaykge1xyXG5cclxuXHJcbiAgICAgICAgICAgIGlmIChfdGhpcy5pc1ZpZGVvVHJhY2tMaXZlKCkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBfdGhpcy5ncmFiRnJhbWUoX3RoaXMuX3NuYXBTaG90U2l6ZS53aWR0aCwgX3RoaXMuX3NuYXBTaG90U2l6ZS5oZWlnaHQpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGltYWdlQml0bWFwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fb25TbmFwU2hvdENhbGxiYWNrKGltYWdlQml0bWFwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcmVxdWVzdEFuaW1hdGlvbkZyYW1lKF90aGlzLl9zbmFwU2hvdExvb3AuYmluZChfdGhpcykpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vLSBBbiBlcnJvciBvY2N1cnMgaWYgdGhlIGZyYW1lIGNhbiBub3QgYmUgcHJlcGFyZWRcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5lcnJvcihcImZyYW1lIGRyb3BwZWQgZXJyb3I9XCIgKyBlKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShfdGhpcy5fc25hcFNob3RMb29wLmJpbmQoX3RoaXMpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYXB0dXJlIGltYWdlKGRhdGEgVVJJKSBmcm9tIGNhbWVyYSBsaXZlIHN0cmVhbSB1c2luZyBvbGQgYXBwcm9hY2hcclxuICAgICAqIEBwYXJhbSB3aWR0aFxyXG4gICAgICogQHBhcmFtIGhlaWdodFxyXG4gICAgICogQHBhcmFtIGRhdGFGb3JtYXRcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICovXHJcbiAgICBXZWJDYW1NYW5hZ2VyLnByb3RvdHlwZS5jYXB0dXJlID0gZnVuY3Rpb24gKHdpZHRoLCBoZWlnaHQsIGRhdGFGb3JtYXQpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG5cclxuICAgICAgICB2YXIgdmlkZW8gPSBfdGhpcy5fdmlkZW9UYWc7XHJcblxyXG5cclxuICAgICAgICBpZiAodmlkZW8ucmVhZHlTdGF0ZSA9PT0gdmlkZW8uSEFWRV9FTk9VR0hfREFUQSAmJiB2aWRlby52aWRlb1dpZHRoID4gMCkge1xyXG5cclxuICAgICAgICAgICAgLy8gLSBpZiB2aWRlbyBzdHJlYW0gaXMgcmVhZHlcclxuXHJcbiAgICAgICAgICAgIC8vIC0gaWYgc25hcHNob3RDYWxsYmFjayBzZXRcclxuXHJcbiAgICAgICAgICAgIHZhciBfd2lkdGggPSB3aWR0aDtcclxuICAgICAgICAgICAgdmFyIF9oZWlnaHQgPSBoZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICB2YXIgY29udGV4dCA9IF90aGlzLl9nZXRTbmFwU2hvdENvbnRleHQoKTtcclxuICAgICAgICAgICAgdmFyIGNhbnZhcyA9IF90aGlzLl9nZXRTbmFwU2hvdENhbnZhcygpO1xyXG5cclxuICAgICAgICAgICAgY2FudmFzLndpZHRoID0gX3dpZHRoO1xyXG4gICAgICAgICAgICBjYW52YXMuaGVpZ2h0ID0gX2hlaWdodDtcclxuXHJcblxyXG4gICAgICAgICAgICAvL2NhcHR1cmUgaW1hZ2UgZnJvbSBtZWRpYSBzdHJlYW0uXHJcbiAgICAgICAgICAgIGNvbnRleHQuZHJhd0ltYWdlKHZpZGVvLCAwLCAwLCBfd2lkdGgsIF9oZWlnaHQpO1xyXG4gICAgICAgICAgICBpZiAoZGF0YUZvcm1hdCA9PSBcImltYWdlRGF0YVwiKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc25hcHNob3RJbWFnZURhdGEgPSBjb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCBfd2lkdGgsIF9oZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNuYXBzaG90SW1hZ2VEYXRhO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIHNuYXBzaG90SW1hZ2VEYXRhVVJMID0gY2FudmFzLnRvRGF0YVVSTCgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNuYXBzaG90SW1hZ2VEYXRhVVJMO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuXHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYSBzbmFwc2hvdCBvZiB0aGUgbGl2ZSB2aWRlbyBpbiB0aGVUcmFjayBhcyBhbiBJbWFnZUJpdG1hcFxyXG4gICAgICogQHBhcmFtIHdpZHRoIEluIFwidXNlSW1hZ2VDYXB0dXJlXCIgbW9kZSB0aGlzIHBhcmFtZXRlciBpcyBpZ25vcmVkXHJcbiAgICAgKiBAcGFyYW0gaGVpZ2h0IEluIFwidXNlSW1hZ2VDYXB0dXJlXCIgbW9kZSB0aGlzIHBhcmFtZXRlciBpcyBpZ25vcmVkXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZX1cclxuICAgICAqL1xyXG4gICAgV2ViQ2FtTWFuYWdlci5wcm90b3R5cGUuZ3JhYkZyYW1lID0gZnVuY3Rpb24gKHdpZHRoLCBoZWlnaHQpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG5cclxuICAgICAgICB2YXIgdmlkZW8gPSBfdGhpcy5fdmlkZW9UYWc7XHJcblxyXG5cclxuICAgICAgICBpZiAoX3RoaXMuX3VzZUltYWdlQ2FwdHVyZSkge1xyXG5cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGNhbnZhcyA9IF90aGlzLl9nZXRTbmFwU2hvdENhbnZhcygpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGNvbnRleHQgPSBfdGhpcy5fZ2V0U25hcFNob3RDb250ZXh0KCk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIF90aGlzLl9nZXRJbWFnZUNhcHR1cmUoKS5ncmFiRnJhbWUoKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChpbWFnZUJpdG1hcCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdpZHRoICYmIGhlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FudmFzLndpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy5faXNGbGlwSW1hZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnRyYW5zbGF0ZShjYW52YXMud2lkdGgsIDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuc2NhbGUoLTEsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UoaW1hZ2VCaXRtYXAsIDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUod2luZG93LmNyZWF0ZUltYWdlQml0bWFwKGNhbnZhcykpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMuX2lzRmxpcEltYWdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FudmFzLndpZHRoID0gaW1hZ2VCaXRtYXAud2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FudmFzLmhlaWdodCA9IGltYWdlQml0bWFwLmhlaWdodDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnRyYW5zbGF0ZShjYW52YXMud2lkdGgsIDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuc2NhbGUoLTEsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuZHJhd0ltYWdlKGltYWdlQml0bWFwLCAwLCAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh3aW5kb3cuY3JlYXRlSW1hZ2VCaXRtYXAoY2FudmFzKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGltYWdlQml0bWFwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIGV4ZWN1dG9yNEdyYWJGcmFtZShyZXNvbHZlLCByZWplY3QpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICghX3RoaXMuaXNWaWRlb1RyYWNrTGl2ZSgpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KG5ldyBET01FeGNlcHRpb24oJ0ludmFsaWRTdGF0ZUVycm9yJykpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgdmFyIF93aWR0aCwgX2hlaWdodDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAod2lkdGggJiYgaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3dpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgX2hlaWdodCA9IGhlaWdodDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3dpZHRoID0gdmlkZW8udmlkZW9XaWR0aDtcclxuICAgICAgICAgICAgICAgICAgICBfaGVpZ2h0ID0gdmlkZW8udmlkZW9IZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgY29udGV4dCA9IF90aGlzLl9nZXRTbmFwU2hvdENvbnRleHQoKTtcclxuICAgICAgICAgICAgICAgIHZhciBjYW52YXMgPSBfdGhpcy5fZ2V0U25hcFNob3RDYW52YXMoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjYW52YXMud2lkdGggPSBfd2lkdGg7XHJcbiAgICAgICAgICAgICAgICBjYW52YXMuaGVpZ2h0ID0gX2hlaWdodDtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHdpZHRoICYmIGhlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuZHJhd0ltYWdlKHZpZGVvLCAwLCAwLCBfd2lkdGgsIF9oZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmRyYXdJbWFnZSh2aWRlbywgMCwgMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh3aW5kb3cuY3JlYXRlSW1hZ2VCaXRtYXAoY2FudmFzKSk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICByZWplY3QobmV3IERPTUV4Y2VwdGlvbignVW5rbm93bkVycm9yJykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRha2UgcGhvdG9cclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlfVxyXG4gICAgICovXHJcbiAgICBXZWJDYW1NYW5hZ2VyLnByb3RvdHlwZS50YWtlUGhvdG8gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgdmFyIHZpZGVvID0gX3RoaXMuX3ZpZGVvVGFnO1xyXG5cclxuICAgICAgICBpZiAoX3RoaXMuX3VzZUltYWdlQ2FwdHVyZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gX3RoaXMuX2dldEltYWdlQ2FwdHVyZSgpLnRha2VQaG90bygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIGV4ZWN1dG9yNEdyYWJGcmFtZShyZXNvbHZlLCByZWplY3QpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICghX3RoaXMuaXNWaWRlb1RyYWNrTGl2ZSgpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KG5ldyBET01FeGNlcHRpb24oJ0ludmFsaWRTdGF0ZUVycm9yJykpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgdmFyIF93aWR0aCwgX2hlaWdodDtcclxuXHJcbiAgICAgICAgICAgICAgICBfd2lkdGggPSB2aWRlby52aWRlb1dpZHRoO1xyXG4gICAgICAgICAgICAgICAgX2hlaWdodCA9IHZpZGVvLnZpZGVvSGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBjb250ZXh0ID0gX3RoaXMuX2dldFNuYXBTaG90Q29udGV4dCgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGNhbnZhcyA9IF90aGlzLl9nZXRTbmFwU2hvdENhbnZhcygpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNhbnZhcy53aWR0aCA9IF93aWR0aDtcclxuICAgICAgICAgICAgICAgIGNhbnZhcy5oZWlnaHQgPSBfaGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnRleHQuZHJhd0ltYWdlKHZpZGVvLCAwLCAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjYW52YXMudG9CbG9iKHJlc29sdmUpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICByZWplY3QobmV3IERPTUV4Y2VwdGlvbignVW5rbm93bkVycm9yJykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsYmFjayB3aGVuIGdldFVzZXJNZWRpYSBmaW5pc2hlZFxyXG4gICAgICogQHBhcmFtIGNhbGxiYWNrRnVuY1xyXG4gICAgICovXHJcbiAgICBXZWJDYW1NYW5hZ2VyLnByb3RvdHlwZS5zZXRPbkdldFVzZXJNZWRpYUNhbGxiYWNrID0gZnVuY3Rpb24gKGNhbGxiYWNrRnVuYykge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgX3RoaXMuX29uR2V0VXNlck1lZGlhQ2FsbGJhY2sgPSBjYWxsYmFja0Z1bmM7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3RhcnQgY2FtZXJhIHN0cmVhbWluZ1xyXG4gICAgICogQHBhcmFtIGNhbGxiYWNrRnVuY1xyXG4gICAgICovXHJcbiAgICBXZWJDYW1NYW5hZ2VyLnByb3RvdHlwZS5zdGFydENhbWVyYSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG5cclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuXHJcblxyXG4gICAgICAgICAgICBpZiAoX3RoaXMuX3dlYmNhbVN0YXJ0ZWQpIHtcclxuICAgICAgICAgICAgICAgIHJlamVjdCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBfdGhpcy5kb1dlYmNhbVBvbHlmaWxsKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIV90aGlzLmhhc0dldFVzZXJNZWRpYSgpIHx8IF90aGlzLl90ZXN0VmlkZW9Nb2RlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgX3RoaXMuX3dlYmNhbVN0YXJ0ZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIV90aGlzLl90ZXN0VmlkZW9Nb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIldlYiBjYW1lcmEgbm90IGZvdW5kXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIF90aGlzLl92aWRlb1RhZy5zcmMgPSBfdGhpcy5fdGVzdFZpZGVvVXJsO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuX3ZpZGVvVGFnLmxvb3AgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuX3ZpZGVvVGFnLnBsYXkoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoX3RoaXMuX29uR2V0VXNlck1lZGlhQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5fb25HZXRVc2VyTWVkaWFDYWxsYmFjay5iaW5kKF90aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5fb25HZXRVc2VyTWVkaWFDYWxsYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vSWduaXRlIHRoZSBzbmFwU2hvdExvb3Agd2hlbiBzdGFydENhbWVyYSBpcyBjYWxsZWRcclxuICAgICAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShfdGhpcy5fc25hcFNob3RMb29wLmJpbmQoX3RoaXMpKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgcmVqZWN0KCk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgd2ViY2FtUGFyYW0gPSBfdGhpcy5fd2ViY2FtUGFyYW1zO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBJZiB5b3UgdXNlIFwibWFuZGF0b3J5XCIgYW5kIFwiZGV2aWNlSWRcIiBhdCB0aGUgc2FtZSB0aW1lIG9uIGNocm9tZSB5b3UgZ2V0IGFuIGVycm9yIGxpa2VcclxuICAgICAgICAgICAgICAgIC8vIFwiTWFsZm9ybWVkIGNvbnN0cmFpbnQ6IENhbm5vdCB1c2UgYm90aCBvcHRpb25hbC9tYW5kYXRvcnkgYW5kIHNwZWNpZmljIG9yIGFkdmFuY2VkIGNvbnN0cmFpbnRzXCJcclxuICAgICAgICAgICAgICAgIC8vIFlvdSBzaG91bGQgdXNlIFwic291cmNlSWRcIiB3aXRoIFwibWFuZGF0b3J5XCIgaW5zdGVhZCBvZiB1c2luZyBcImRldmljZUlkXCJcclxuICAgICAgICAgICAgICAgIGlmIChfdGhpcy5fY2FtZXJhRGV2aWNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gLSBpZiBjYW1lcmEgZGV2aWNlIHNwZWNpZmllZCBleHBsaWNpdGx5XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHdlYmNhbVBhcmFtLnZpZGVvLm1hbmRhdG9yeSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3ZWJjYW1QYXJhbS52aWRlby5tYW5kYXRvcnkuc291cmNlSWQgPSBfdGhpcy5fY2FtZXJhRGV2aWNlLmRldmljZUlkO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlYmNhbVBhcmFtLnZpZGVvLmRldmljZUlkID0gd2ViY2FtUGFyYW0udmlkZW8uZGV2aWNlSWQgPyB3ZWJjYW1QYXJhbS52aWRlby5kZXZpY2VJZCA6IHdlYmNhbVBhcmFtLnZpZGVvLmRldmljZUlkID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlYmNhbVBhcmFtLnZpZGVvLmRldmljZUlkLmV4YWN0ID0gX3RoaXMuX2NhbWVyYURldmljZS5kZXZpY2VJZDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKHdlYmNhbVBhcmFtKS50aGVuKGZ1bmN0aW9uIChtZWRpYVN0cmVhbSkge1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuX2xvY2FsTWVkaWFTdHJlYW0gPSBtZWRpYVN0cmVhbTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBfdGhpcy5fdmlkZW9UYWcuc3JjT2JqZWN0ICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl92aWRlb1RhZy5zcmNPYmplY3QgPSBtZWRpYVN0cmVhbTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fdmlkZW9UYWcuc3JjID0gd2luZG93LlVSTCAmJiB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChtZWRpYVN0cmVhbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuZ2V0Q2FwYWJpbGl0aWVzKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLl92aWRlb1RhZy5wbGF5KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLl93ZWJjYW1TdGFydGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLl9vbkdldFVzZXJNZWRpYUNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl9vbkdldFVzZXJNZWRpYUNhbGxiYWNrLmJpbmQoX3RoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fb25HZXRVc2VyTWVkaWFDYWxsYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9JZ25pdGUgdGhlIHNuYXBTaG90TG9vcCB3aGVuIHN0YXJ0Q2FtZXJhIGlzIGNhbGxlZFxyXG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShfdGhpcy5fc25hcFNob3RMb29wLmJpbmQoX3RoaXMpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignV2ViIGNhbWVyYSBub3QgZm91bmQnLCBlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuX3ZpZGVvVGFnLnNyYyA9IF90aGlzLl90ZXN0VmlkZW9Vcmw7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuX3ZpZGVvVGFnLmxvb3AgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5fdmlkZW9UYWcucGxheSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5fd2ViY2FtU3RhcnRlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMuX29uR2V0VXNlck1lZGlhQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuX29uR2V0VXNlck1lZGlhQ2FsbGJhY2suYmluZChfdGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl9vbkdldFVzZXJNZWRpYUNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL0lnbml0ZSB0aGUgc25hcFNob3RMb29wIHdoZW4gc3RhcnRDYW1lcmEgaXMgY2FsbGVkXHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKF90aGlzLl9zbmFwU2hvdExvb3AuYmluZChfdGhpcykpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBXZWJDYW1NYW5hZ2VyLnByb3RvdHlwZS5nZXRDYXBhYmlsaXRpZXMgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICAgIHZhciB0cmFjayA9IF90aGlzLmdldFZpZGVvVHJhY2soKTtcclxuICAgICAgICBpZiAodHJhY2spIHtcclxuICAgICAgICAgICAgdmFyIGNhcGFiaWxpdGllcyA9IHRyYWNrLmdldENhcGFiaWxpdGllcygpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHZpZGVvIHRyYWNrXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqL1xyXG4gICAgV2ViQ2FtTWFuYWdlci5wcm90b3R5cGUuZ2V0VmlkZW9UcmFjayA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgaWYgKF90aGlzLl9sb2NhbE1lZGlhU3RyZWFtKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfdGhpcy5fbG9jYWxNZWRpYVN0cmVhbS5nZXRWaWRlb1RyYWNrcygpWzBdO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm4gdHJ1ZSB3aGVuIHZpZGVvIHRyYWNrIGlzIGxpdmUuXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgV2ViQ2FtTWFuYWdlci5wcm90b3R5cGUuaXNWaWRlb1RyYWNrTGl2ZSA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB2YXIgdHJhY2sgPSBfdGhpcy5nZXRWaWRlb1RyYWNrKCk7XHJcbiAgICAgICAgcmV0dXJuIHRyYWNrICYmIHRyYWNrLnJlYWR5U3RhdGUgPT09IFwibGl2ZVwiO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTdG9wIGNhbWVyYSBzdHJlYW1pbmdcclxuICAgICAqL1xyXG4gICAgV2ViQ2FtTWFuYWdlci5wcm90b3R5cGUuc3RvcENhbWVyYSA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgdmFyIHRyYWNrID0gX3RoaXMuZ2V0VmlkZW9UcmFjaygpO1xyXG4gICAgICAgIGlmICh0cmFjaykge1xyXG4gICAgICAgICAgICB0cmFjay5zdG9wKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChfdGhpcy5fdmlkZW9UYWcpIHtcclxuICAgICAgICAgICAgX3RoaXMuX3ZpZGVvVGFnLnBhdXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2Rpc3Bvc2UgX2ltYWdlQ2FwdHVyZSBvYmplY3RcclxuICAgICAgICBfdGhpcy5faW1hZ2VDYXB0dXJlID0gbnVsbDtcclxuXHJcbiAgICAgICAgX3RoaXMuX3dlYmNhbVN0YXJ0ZWQgPSBmYWxzZTtcclxuICAgIH07XHJcblxyXG4gICAgV2ViQ2FtTWFuYWdlci5wcm90b3R5cGUuZG9XZWJjYW1Qb2x5ZmlsbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHdpbmRvdy5VUkwgPSB3aW5kb3cuVVJMIHx8IHdpbmRvdy53ZWJraXRVUkw7XHJcbiAgICAgICAgLy9wb2x5ZmlsbFxyXG4gICAgICAgIGlmICghbmF2aWdhdG9yLm1lZGlhRGV2aWNlcykge1xyXG4gICAgICAgICAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzID0ge307XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2ZvciBvbGRlciBhcHByb2FjaCBuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhXHJcbiAgICAgICAgbmF2aWdhdG9yLmdldFVzZXJNZWRpYSA9IG5hdmlnYXRvci5nZXRVc2VyTWVkaWFcclxuICAgICAgICAgICAgfHwgbmF2aWdhdG9yLndlYmtpdEdldFVzZXJNZWRpYVxyXG4gICAgICAgICAgICB8fCBuYXZpZ2F0b3IubW96R2V0VXNlck1lZGlhIHx8IG5hdmlnYXRvci5tc0dldFVzZXJNZWRpYTtcclxuICAgIH07XHJcblxyXG4gICAgV2ViQ2FtTWFuYWdlci5wcm90b3R5cGUuaGFzR2V0VXNlck1lZGlhID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIChuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhIHx8IG5hdmlnYXRvci53ZWJraXRHZXRVc2VyTWVkaWFcclxuICAgICAgICAgICAgfHwgbmF2aWdhdG9yLm1vekdldFVzZXJNZWRpYSB8fCBuYXZpZ2F0b3IubXNHZXRVc2VyTWVkaWEgfHwgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEpO1xyXG4gICAgfTtcclxuXHJcbiAgICBXZWJDYW1NYW5hZ2VyLnByb3RvdHlwZS5fZ2V0SW1hZ2VDYXB0dXJlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICAgIGlmIChfdGhpcy5fdXNlSW1hZ2VDYXB0dXJlICYmICFfdGhpcy5faW1hZ2VDYXB0dXJlKSB7XHJcbiAgICAgICAgICAgIF90aGlzLl9pbWFnZUNhcHR1cmUgPSBuZXcgSW1hZ2VDYXB0dXJlKF90aGlzLmdldFZpZGVvVHJhY2soKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gX3RoaXMuX2ltYWdlQ2FwdHVyZTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIFdlYkNhbU1hbmFnZXI7XHJcbn0oKSk7XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBXZWJDYW1NYW5hZ2VyO1xyXG4iXX0=
