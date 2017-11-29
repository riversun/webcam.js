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

            if (width && height) {

                return new Promise(function (resolve, reject) {

                    var context = _this._getSnapShotContext();
                    var canvas = _this._getSnapShotCanvas();

                    _this._getImageCapture().grabFrame()
                        .then(function (imageBitmap) {

                            canvas.width = width;
                            canvas.height = height;
                            var ctx = canvas.getContext("2d");
                            ctx.drawImage(imageBitmap, 0, 0, width, height);
                            resolve(window.createImageBitmap(canvas));

                        })
                        .catch(function (e) {

                            reject(e);
                        });
                });

            } else {
                return _this._getImageCapture().grabFrame();
            }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsInNyYy93ZWJjYW0uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIHdlYmNhbV9qcyA9IHJlcXVpcmUoJy4vc3JjL3dlYmNhbS5qcycpO1xyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gd2ViY2FtX2pzO1xyXG5cclxuIiwiLypcclxuICpcclxuICogQ29weXJpZ2h0IDIwMTYtMjAxNyBUb20gTWlzYXdhLCByaXZlcnN1bi5vcmdAZ21haWwuY29tXHJcbiAqXHJcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHkgb2ZcclxuICogdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGVcclxuICogU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSxcclxuICogY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZVxyXG4gKiBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbyxcclxuICogc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XHJcbiAqXHJcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxyXG4gKiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxyXG4gKlxyXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SIElNUExJRUQsXHJcbiAqICBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQVxyXG4gKiBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1JcclxuICogQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLFxyXG4gKiBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SXHJcbiAqIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXHJcbiAqXHJcbiAqL1xyXG52YXIgV2ViQ2FtTWFuYWdlciA9IChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHBhcmFtc1xyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIFdlYkNhbU1hbmFnZXIocGFyYW1zKSB7XHJcblxyXG4gICAgICAgIHRoaXMuX3Rlc3RWaWRlb0RhdGEgPSBcImRhdGE6dmlkZW8vbXA0O2Jhc2U2NCxBQUFBSUdaMGVYQnBjMjl0QUFBQ0FHbHpiMjFwYzI4eVlYWmpNVzF3TkRFQUFBQUlabkpsWlFBQUV3UnRaR0YwQUFBQ3JRWUYvLytwM0VYcHZlYlpTTGVXTE5nZzJTUHU3M2d5TmpRZ0xTQmpiM0psSURFME9DQnlNamMyTWlBNU1HRTJNV1ZqSUMwZ1NDNHlOalF2VFZCRlJ5MDBJRUZXUXlCamIyUmxZeUF0SUVOdmNIbHNaV1owSURJd01ETXRNakF4TnlBdElHaDBkSEE2THk5M2QzY3VkbWxrWlc5c1lXNHViM0puTDNneU5qUXVhSFJ0YkNBdElHOXdkR2x2Ym5NNklHTmhZbUZqUFRFZ2NtVm1QVE1nWkdWaWJHOWphejB4T2pBNk1DQmhibUZzZVhObFBUQjRNem93ZURFeE15QnRaVDFvWlhnZ2MzVmliV1U5TnlCd2MzazlNU0J3YzNsZmNtUTlNUzR3TURvd0xqQXdJRzFwZUdWa1gzSmxaajB4SUcxbFgzSmhibWRsUFRFMklHTm9jbTl0WVY5dFpUMHhJSFJ5Wld4c2FYTTlNU0E0ZURoa1kzUTlNU0JqY1cwOU1DQmtaV0ZrZW05dVpUMHlNU3d4TVNCbVlYTjBYM0J6YTJsd1BURWdZMmh5YjIxaFgzRndYMjltWm5ObGREMHRNaUIwYUhKbFlXUnpQVGNnYkc5dmEyRm9aV0ZrWDNSb2NtVmhaSE05TVNCemJHbGpaV1JmZEdoeVpXRmtjejB3SUc1eVBUQWdaR1ZqYVcxaGRHVTlNU0JwYm5SbGNteGhZMlZrUFRBZ1lteDFjbUY1WDJOdmJYQmhkRDB3SUdOdmJuTjBjbUZwYm1Wa1gybHVkSEpoUFRBZ1ltWnlZVzFsY3oweklHSmZjSGx5WVcxcFpEMHlJR0pmWVdSaGNIUTlNU0JpWDJKcFlYTTlNQ0JrYVhKbFkzUTlNU0IzWldsbmFIUmlQVEVnYjNCbGJsOW5iM0E5TUNCM1pXbG5hSFJ3UFRJZ2EyVjVhVzUwUFRJMU1DQnJaWGxwYm5SZmJXbHVQVEVnYzJObGJtVmpkWFE5TkRBZ2FXNTBjbUZmY21WbWNtVnphRDB3SUhKalgyeHZiMnRoYUdWaFpEMDBNQ0J5WXoxamNtWWdiV0owY21WbFBURWdZM0ptUFRJekxqQWdjV052YlhBOU1DNDJNQ0J4Y0cxcGJqMHdJSEZ3YldGNFBUWTVJSEZ3YzNSbGNEMDBJR2x3WDNKaGRHbHZQVEV1TkRBZ1lYRTlNVG94TGpBd0FJQUFBQXVNWllpRUFCYi8vdmZUUDh5eTYvYzV0ZU9vOTZLZUpsOURkU1VCbTViRTdUcUFBTHJ4YjQ3Syt0NUpNK3JBWThBQUF5QVZOcnYvQ1NOK0lBNVFvQXg5VEtPQ2ZkREpYQWNFRkpRTmgvOTk0UVBpSFJVR1d4K05RNXpsT0hxUUx5TW83aHlzZG5VUm1ON2JGY3J5cDlsd3I5TCsrVi9Xc0NkWHV4ZlR3UEhiVWovS1o1QlZlekIzNURXRmNqVHhzdkpVdDIzWG0rMXdOWlk5c2g1dFBZTGxPMnVxQTA3Zkw4aDBMQjJRbDhGdUcyc3dJNTQ0VFozTTgrWXY2QnR2dm8rLzFpUFNTNlFJcVppZDVDWkZXRHNCSEJNRTdCN1dhUXljNU9ZamRiMFhwMXBiQmQxc3cweVhyUFQ0THhMV1pMS1pwV21xWHlmMWVPVW5PblVpZlFLWFBTbDkxeTlFM1JwSHlrWDM4Y29jMldJU2svb0YxSVNleUlUZlpyb2R3NVRHVDBEYWRhMnowYkJqL2lSM0lRQjVlTlRxMlVwNXpTMWhkMzRkZGEzaGZOQWJCTjRrNjB0SnVXSU9UckhjTW12NFBNcndhNVQxRk9weGVSckZoTXd3Z3AwRkhjamRlTnhoUW5uVkh4OThUOGNPWVplckZFMlVmRGh6RmhoT2kxSzcxcEZwSHZCNkZZc3Y3RS9STXpFNHg1UTlyTXcrSm5BQzhZS2dpUU9KNFplTVlYWk14dTNIbGVtVGZ4MENGdHU2c3BUZWFlZVl3aWNmYk5nRFhMY1R5cXBQU3lZV21vTk40SWdHbU50bUhLNnZsTTNleUk2bUtlRlordVp1OXdYVmZxNm5IYlRtb3p0bndkdlRzbFhNeXM0bXM1Lzc3a2Z4WnJJbzRDbkNwUzUwRTZiQVM1ODN1aW0yVW96eWpsVDgwRFhZVFBvbjErcmVwYllYOEhRVEYrUDd5U0F0WFh4cEp6dzM5dXhJWXE5d1pZbXdPNkVZK2dNNHFqNU1paldWTFRzRkxudFpBZEFXRVN3NnYzRmN3UGUwQ0xqV2FaeXpNSnQ2MFkwanhncU5HejNTU0dWRzNxN2RmcXFmSi95Qkw0TUlKLzJTa1pUTWt5UXlMSUcwNkpJU1Vpc3lRNmdQSnRITmtPWmZhWWlmdEdjYmdiY0txeWJvNTFsWEwxMzdVOFFPZUJSUXMyZ1JNMHhHY1BLZ2tMMWNvUlhqV0l5UmtIdUd2RnJWVHh1MndITURtZzlGSjRHSDU3V3lFdmVHRTdpNDNjQW9xTlF1THF5cFN3c1F4UW83VitSeVhuMGlLb2RMeVlTNzFWbnRnVDYzRk02K1B1eHJMQ3d6L0drYnFra1VHUWlJYUJOZEw1TVROMVlhQWdKdU4vNjRLaTUxeDNXYnB6MGxBemdFQmVMemhzQjA2b1p2NUdTcytUZis5Tm5RbW9HbmRZRllsamNBQU5nWndSMHB4UERFcGdEZUhxSUwveWM2aUdLL1Z4Qm1hTjN4d0xJRXVWUmUzcm5zNjBLS21DYUMvTGE4aVJDaGFqc1ExS0xTd3BMdlpxLzRBaEhzbHIwckRIRzliVGZTMHFmRGRjYktMd3JsZUN5eGFOWFhQTm9uM2ppWEhLeWlJTWJVYU1Ub0RFZnRzTy9GTmd3NjhwSmFzQjFhc1ErVk51UDlqVGxKb2N4cU1wQ243T1crMlFRalZMRFdOTUdnd3dLeWdOcnJueTgxUUk2aE9TMkl0TVlQa3EyblovNUVoLzk5eG5YdHRxbm0xMFlTbDdFd0MzVjNRUkdBZU16azFjQW1PQmlwa01EVGRsWDNHVU9YS3VDTFJSc1dKWFdmaitRMzM5bTJMM2loNEUyeGRNbFE1a3VENm1wT2Rta3Y0c3BiZGFFKzVCM3ZyazhKcjdJUS9ZZi9sWFJYZlJDeFBYUG1oSUVMSyt1TVpuS1JaVEFuMXJvdXlwLzdMeGJXR2Z2bThVMTlpeGY5L1JyckNFYWEwczlCcTRVZHJxQ0RqTWczOHd0RG1oZVc4TlYrc25BQTV4Tkprby91YXdKNUpoMmlxNEd0bGJLdHM5V3liMFdxbnZXak1NZXVhUXdQcFlsRDZyVmw2SDFsMkc4VDFyS2s4Y1JweDFtYWx6SHNLNmJpUTZkTEJ4ajhiSkpnbzJxNlB5MkRSR1R2L0NONFM4ZGlDT2I3QmR5ZDBPZEhzMDV4OXhYc1ZCSC9jODBNc215U2xodmR4STBEakhvQnVYRVc0KzZYNmUvODhTb1BNMm9ncHdvSC94aGJDVWpwYlh1dnBrZTNmRk9vSVphR0FEbHJwd3RhL3FBWDVHanlJREhpTERTMFRSYnhYK0NxNFU3eHdBS0N1Y0MvQVdqQVZQZXFhb2taWWlqdVV1NGFIYnhiNzM0byt3TXkxSGZlNjM0aEtxbi9wMWNMakdPdFpDOEFWUUtKaXVNb1hBV3NKcEZpZ0ZiVmUrR2E1eENtdkkxdmhGQ3FETDRGSEE0QlVmdmZXVDY1RWVnTDE4YTkycU1tK1BKaERkUjQ0ckpnNmZpUHNnbExIQUd5aFJrYjZmSTUxcHA2YXBuTC90dWRuTTkzZTE5ZjRLbjdQS2wwQkNkMGV1dnBLT25OYjRWQ0ovMktJS2grc1lTNEJ1bDdqQ040WmZRTUs2NEVtN2djZ2o2R1FxLzRNQjhKZUxDZDdQWHBWSG1GZkFhL0VCNmJYMUxoOUtVRlhlMG9kTTRScEd4cDB1d0ZDNHN4NXNUd0d4a1cxZkFZRXZIQWhhUnJYM2FGQ0piZlFGR1E5R0M4ZU8yOVJORUtIZEtVWTFLZi82S0t1UFB2QXVyUTJ3bi9lQmxzTWdMU0FZMlRCTWhTck8yTmdPSHhMM2NzS0UxN3JoQkZ1TWxramQzM3BSZmpDelRMeUNIUFBMQTNqdnNMMUlsdTJ3cm1vK29UUUNWV2svaGtpOWFscVk5MWlHVlgwVnZ5T0xQQjJtb293YzVWdjczaE5MTkN6ZlB1bDJ4K3ByY2g4andjWndRY1kwZGE1TTR5dHl4L3VxWHlNSnNHNDVnazdIRzExa2tkOHJnREZETWpNMG1BZVZwTTBjNlhsOEJTWGJCZzlJenAzOWV6dEpDZCtkQ040MXBzRGZNZ21jdkRYUVB0MVp5cFVoQ3AyQytHamZHS2ZlZ2VCY2ZKTllVcnYyWkVZZEg3N3BGaDdXd01pSy83NHhnczNFaDg2dWRNRFZDQzRuenZLaTR3WWVCMEdBRUhLS1haMFB2SjBSZW1Ob2pTU0hlR1cxc0ZybDdkaVlLVmhvYjZwVWhweHZleGU4U2M4RUlQWE5IQ2FLNm1IZEZXaTY5VGFpbzdDOVFPd3M0NVV2VnQwdXBqZzVpKzJCY2QrN09WMjZnZWFWZC9DeldNa3Fjd2hsSU1KU1Y5MURyY1FUdmd6WWNtWkgzTmIwS1pVNzhhRVo5Y1hVSjBBb0U0QStVQkhneDFBR3hOOS8vUlIzRThjakp4alNUSlVPVUtIdmkyS0wvc0I5WVpTbGhHVEx1OC9xSC8xeStoM3lmRlp0Qk9BMC8wVmJtaGhib1NCUFZBVEZNcElWZzN6MzZyNlJRT0tRWXBaN0lSRXpuN0YwbnU5TGpwclFkcjRDNWg5T216alN3NnBaOGx6ck11WTJITTJRT3ZRM29pL0RUVjg2VXdPQ3lnZWFLdHlXcldVL09nUFU2a2NsTmEzOHRKZCsvQjEvN1B2ZjZ2RUlzV0ZPeTJYaUd2dlZKSjVMbDB5bXQ4SFZrWkhtamdhaEp4MHVxQzNiZjZmMWVFTEl4UllzeVJXaEdNaHRRSnVZWDdMZWVyVGRXb2p0azJIWjBjK1ZqSzIzQmNTdldBbFV5MWRUWjljU09NQUozdUV2em5JR0x0QzB4NjNqNDdwWldlMERqNTVuSzM2dXovREZ4YVVXUmNFZk0xcWw2bHI0QWFZdlppZi9xNnhhUHE0cEh1Qml0Vi9yQmp1L1Z6V2tDc2dNV1RCbkk2ZkZWOXM5eTZ1SkpPZUczanhhbUxlcUhMYkgySzU2aWFPaTBYejJoclJheG1jUkVUT096VFFhUEhwTlBMTG5yUTRCQjRQQm9sNVY1MndIeXN0L0tFOUlyRjYrOEJaN3QzeVBrdC8zL2ZPM3QwZXg4S0dEeWg5M09mdEhadzFhYlZFYlZEdktZdnAxRnJhT3Y3Wkl1VTBiMWliV0lWVTl5Mmw0K2g4TU16NWI3LzZzK21PVlN2dFJKMzZqUkpFTnVtV05CRU5HMThJU0g5VTM2WkxwNHBBcTZhV1ZKWFNBem5EVi8wa0M0NU40eklEL0dMblRZRW9MRlJDWEVETE8yN1VXSWdwVXUrQUlzeE1Fdy9wUWVjUTVRYTZYdkxLcDRaWXFGYjQzSzVnMVY2bk1NcktxZ2dETUQrYjVOOWtPcnQ2RDBlU0g5Z1duSkJQZUlSalh2ZlNtUUZMdUhWNDFJcW1SSjh0MGpMUm41V0xUdDB1L3JjR2NNbHVrai85LytEMGo2SXJnbEQ1TzJaVThvSjY1M3dBbDF1NFhuNStxZ3pmWUxVWUFiSC9YdndjRXFPMkJIbk5YV0RVU2czUnJPdUp6bFFLOEI4cFVKTENVd05aRkRXTkVoZ2NQNm5aWFFFa0VvQTZIZHFMdXQxdUdiaElBeSt0KzV1NWp4S1NGcU1JQUdIZHl1cTFPeWRYZTZ4VWd5cmh3anVCcUZrMGV3ZENFb3ZBMFdSb0k4VW9QaUNacU80YmVrTXo3V1pCZWRlL3ZDT21uSGY4ZXNVUmFJYmdRTFBDTGxPcFRPUExYL1BoZWhqaU9YcXdSaDRhY01IMzl2U3N4STlYZnpEcUNoRGZFOXIwVk5qQXVvekEvOUxUai81RzBVd3NHYlhYTHh2MTRURjVLRXR3WTNqdys4TjM4V1hVVytHNnF1OWN5czM5M2NSSzJTc2V5VEdFVVd0OXBpVFFEbTJ4ODBFbHVsZmlIL2Y1SWcwQ2tsWnFoTzhDdUlsbkhEUWRuanFXbWtXZHZkN1J5M2t0TmphNk1FczN6UlBVcjBZYVhkZGFobWdJSTB4b000R1dNY2k1QmR3cUYwMnoxdHNuTkFBKzhIOEFsc2MweXJvYittNktBbTJiQzdlMTlYcWhuRi9YYWx2ZEFISVBDUU1MQldDRkpLcWhvZmNlWWRFQzl1TEg2amlSS3g2ekxoTXRnaW95c2EyM0FLTmdRQUFCTGRCbWlGaEdCMkFmeEJYLy83V3BWQUJPSFVQbEFEY1g4Q1VLclU3R1dLVUJRYmZpTWNaWUpqSUVCSFZKVktVblpiSEN6YzRESXJYU1BaclY2Y3Rndy84UGlHSDFKSzZWbzhMWVZIQ3FyNHp0d3J3ditZQXYxRTgzVDZqR1dWQzAzMTZqeTVIL0x5NFd0SCs0VWZCak5pN1dydytmZFQxZFcyTWNBeTVobXp2L0dyQk5JVkE2WUtjbEpZWExXT0tmOVJlSVBFcXNDTnJmVU5hUVdUZjN6dldYaHZkaXV2TWM4ZGhxejlNVU5PR1lQZXZxWFJETFY0MityL1NBSEVYSnBrYzVwbzBSRk5HdEtnWEs5cVErVnJoZkRvTWlRcWJ4VktXakFOYzVBOE1zUlBpZWUyZU5MekdCOFRQTytPVHkvVjlxdmpDSkF5Y1VuaVJWQWcwamxvMGlJazRFUTBGZUt2VVhKcmdmWXgwNVhDWCtGRXNEcGd5ZkFsQ1YvUVJFVE9PbEJxS1BPQmZFZXp2ZW5yZUgxajJoL2t1QXFIVmFWdC9RQWZjTTdjcllLZFc2S2llajRXdW5TYTJYYU5HTjh6bldFaEluT3lZKzREclA1RHcxaDFNWDRCYWdiKzR6ZHhYL3pERHF6Skp2c0cyVThXWHcvcU9kZk9QOFNadXE3dFBnRnpVcmhjQmtBUmZ5YXh2Zlo5RUJVNXdGLzJpd0dqSzArSnhFbDkyUGN6aExTcWpmSkhTUit1SGI4ZkZaL2VUTThkdkxDdEQ5em9BTWZsUGlCaHpaNlYvWnRMdjFJMzlHYzkzamp4K2FyZDk5UUg1OWNzOUVGbWdSanJQbVBuUHMrQUNSWkxVOHE2QXdWUmRjaURRRG9CZndQczhyZytIS3VuelNVbjJjck8rU09VaXFVMTUySHp0aXdCc2Y0aWRzU1l1S2dLQlRrazVaazBCUDZBb0x5VElHeTUzdUlMNWNwR3hmTGdNVlpRRmFDdE5qMHMzTkdXa2dUc0lqQXNTMHFJaHh6WCtTKzhQeFRRUVVwaEtNY0lUYUJzbmxXdVo4djdNc1E5RHVNV2pHOFZmQU9LenhtOFJRM05zek40dTJ1cHhvTHlkaElZM0NyNWFzUkxTYjJDMjNRaFdJMm5aNlpTOHhFNHh5VFE0dVYyd2F4SU0zMG52enVEWXpYRzN2aEptSkcrc3JSN1ZjSzhZYmdrVlRXZFh1Nm03Vys4RXRlVXpRa1JUWGYrN0p4QzAydFhodnM0UG4vQ21YYjdJdFRsNTB1YkhPVXJXTndaRzE3WWZoelArYktBRnh2MzFDa1BjR2ZkYXVVWGQ5ZENDUG1jSG1uN3BqWmdtSzJ3d0d1ZENsaXRCY0NiUjBENEhsS2h4V200L0lKOEhrQVc0enoxWGo0dkptcEpmQU11bCsvRUgrWGhpOUExTExSdkN1ZG5WeXE3K0ZWTjEyaFNQUWlWa1V3ZFB6WlpLdXdReU9RQlVqYzN4NHJUN1BpeXJNQ2I0U1QrZmNFRitNZnNhMmdOdkNJS2tIamtLRGxORnMwU0wrZE5wdzc1U3E1V1FRZGlIY1RvdXl5WlltMHJDUWRpampjUVRxbzFpUnU2WlBPQmpWYXFmaVJ1ajd0NDZHMjNQTVUwcFVPOTByV2RNaGo4dnRqdytlV0txUVV2LzZBdGJrNTRNVWhBbWRKQ0MvT04xR0dwL0lxWjF5VlNSMXdkSFd6Q0ROdzM3b25jcFlSaEd6UzZqdGNaV1M3bTd6UDZvQ002TFJOM0xvWmpvbDlDRDNvMjhmNTVYamNVb1IxOEZGaTJlbElXTC9hUC9xWWlYV3dQMUw1bWJVdlZ3ZFFQU3ZMNDQ4WU1zalFqYUhmYVliNjJLOHFEdjB4dFZ2c09RTXprNTFVRHZIaVZra3ErNFpmSFkwenNyRlRWOU1mUmVhQkV3czFFTXRVRUl2U1lTc3NxalNBUW1EU1JkNlJxUGY0N0ZYQ0dQamk3QVhuN2Z2cHNCOVg5NzU1THZkVHJ5V0oyOTZGSlg2K3VDSE1zQmZnc29UODBRWUJkZGxYeDh4aEQ0azRmM21BaUlWaE1ONkNlMEtvWmhKdldFV2RFK2ZUQ1I3Z0QwYzk4WkpQYS9Nc3NvQUFBRENtMXZiM1lBQUFCc2JYWm9aQUFBQUFBQUFBQUFBQUFBQUFBQUErZ0FBQWZRQUFFQUFBRUFBQUFBQUFBQUFBQUFBQUFCQUFBQUFBQUFBQUFBQUFBQUFBQUFBUUFBQUFBQUFBQUFBQUFBQUFBQVFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUlBQUFJMGRISmhhd0FBQUZ4MGEyaGtBQUFBQXdBQUFBQUFBQUFBQUFBQUFRQUFBQUFBQUFmUUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQkFBQUFBQUFBQUFBQUFBQUFBQUFBQVFBQUFBQUFBQUFBQUFBQUFBQUFRQUFBQUFGQUFBQUE4QUFBQUFBQUpHVmtkSE1BQUFBY1pXeHpkQUFBQUFBQUFBQUJBQUFIMEFBQUFBQUFBUUFBQUFBQnJHMWthV0VBQUFBZ2JXUm9aQUFBQUFBQUFBQUFBQUFBQUFBQVFBQUFBSUFBVmNRQUFBQUFBQzFvWkd4eUFBQUFBQUFBQUFCMmFXUmxBQUFBQUFBQUFBQUFBQUFBVm1sa1pXOUlZVzVrYkdWeUFBQUFBVmR0YVc1bUFBQUFGSFp0YUdRQUFBQUJBQUFBQUFBQUFBQUFBQUFrWkdsdVpnQUFBQnhrY21WbUFBQUFBQUFBQUFFQUFBQU1kWEpzSUFBQUFBRUFBQUVYYzNSaWJBQUFBSmR6ZEhOa0FBQUFBQUFBQUFFQUFBQ0hZWFpqTVFBQUFBQUFBQUFCQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUZBQVBBQVNBQUFBRWdBQUFBQUFBQUFBUUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFCai8vd0FBQURGaGRtTkRBV1FBRFAvaEFCaG5aQUFNck5sQlFmb1FBQUFEQUJBQUFBTUFJUEZDbVdBQkFBWm82K1BMSXNBQUFBQVljM1IwY3dBQUFBQUFBQUFCQUFBQUFnQUFRQUFBQUFBVWMzUnpjd0FBQUFBQUFBQUJBQUFBQVFBQUFCeHpkSE5qQUFBQUFBQUFBQUVBQUFBQkFBQUFBZ0FBQUFFQUFBQWNjM1J6ZWdBQUFBQUFBQUFBQUFBQUFnQUFEa0VBQUFTN0FBQUFGSE4wWTI4QUFBQUFBQUFBQVFBQUFEQUFBQUJpZFdSMFlRQUFBRnB0WlhSaEFBQUFBQUFBQUNGb1pHeHlBQUFBQUFBQUFBQnRaR2x5WVhCd2JBQUFBQUFBQUFBQUFBQUFBQzFwYkhOMEFBQUFKYWwwYjI4QUFBQWRaR0YwWVFBQUFBRUFBQUFBVEdGMlpqVTNMamN5TGpFd01BPT1cIjtcclxuICAgICAgICB0aGlzLl90ZXN0VmlkZW9Nb2RlID0gcGFyYW1zID8gcGFyYW1zLnRlc3RWaWRlb01vZGUgPyB0cnVlIDogZmFsc2UgOiBmYWxzZTtcclxuXHJcbiAgICAgICAgdGhpcy5fdGVzdFZpZGVvVXJsID0gcGFyYW1zID8gcGFyYW1zLnRlc3RWaWRlb1VybCA/IHBhcmFtcy50ZXN0VmlkZW9VcmwgOiB0aGlzLl90ZXN0VmlkZW9EYXRhIDogdGhpcy5fdGVzdFZpZGVvRGF0YTtcclxuXHJcbiAgICAgICAgdGhpcy5fd2ViY2FtUGFyYW1zID0gKHBhcmFtcyAmJiBwYXJhbXMuY29uc3RyYWludHMgKSA/IHBhcmFtcy5jb25zdHJhaW50cyA6IHtcclxuICAgICAgICAgICAgLy9hdWRpbzogdHJ1ZSxcclxuICAgICAgICAgICAgdmlkZW86IHtcclxuICAgICAgICAgICAgICAgIHdpZHRoOiA2NDAsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDQ4MCxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuX3ZpZGVvVGFnID0gcGFyYW1zID8gcGFyYW1zLnZpZGVvVGFnID8gcGFyYW1zLnZpZGVvVGFnIDogZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKSA6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XHJcblxyXG5cclxuICAgICAgICB0aGlzLl9sb2NhbE1lZGlhU3RyZWFtID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9vbkdldFVzZXJNZWRpYUNhbGxiYWNrID0gbnVsbDtcclxuICAgICAgICB0aGlzLl93ZWJjYW1TdGFydGVkID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHRoaXMuX29uU25hcFNob3RDYWxsYmFjayA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fc25hcFNob3RTaXplID0ge1xyXG4gICAgICAgICAgICB3aWR0aDogNjQwLCBoZWlnaHQ6IDQ4MFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5fc25hcFNob3RDYW52YXMgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX3NuYXBTaG90Q29udGV4dCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fY2FtZXJhRGV2aWNlID0gbnVsbDtcclxuXHJcbiAgICAgICAgdGhpcy5fdXNlSW1hZ2VDYXB0dXJlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9pbWFnZUNhcHR1cmUgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHVzZSBJbWFnZUNhcHR1cmUgQVBJIChEZWZhdWx0IGlzIHRydWUpXHJcbiAgICAgKlxyXG4gICAgICogVXNlIG5ldyBBUEkgZm9yIHRhaWtpbmcgYSBwaWN0dXJlXHJcbiAgICAgKiBodHRwczovL3czYy5naXRodWIuaW8vbWVkaWFjYXB0dXJlLWltYWdlLyNkb20taW1hZ2VjYXB0dXJlLXRha2VwaG90b1xyXG4gICAgICpcclxuICAgICAqIEdvb2dsZSBzYXlzIHRoaXMgQVBJIGhhcyBiZWVuIHN1cHBvcnRlZCBzaW5jZSBjaHJvbWUgNTkuQnV0IHRoaXMgQVBJIGlzIFdvcmtpbmcgRHJhZnQgc3RhdGUgYW5kXHJcbiAgICAgKiB0aGVyZSBhcmUgYnVncyBvbiB0YWtlcGhvdG8gQVBJIG9uIGNocm9tZSA2MiBmb3Igd2luLlxyXG4gICAgICogQW5kIHBvbHlmaWxsIGltcGxlbWVudGF0aW9uIGNhbm5vdCBoZWxwIG9uIHRoZSBsYXRlc3QgYnVnZ3kgaW1wbGVtZW50YXRpb24uXHJcbiAgICAgKlxyXG4gICAgICogaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vd2ViL3VwZGF0ZXMvMjAxNi8xMi9pbWFnZWNhcHR1cmVcclxuICAgICAqXHJcbiAgICAgKiBZb3UgY2FuIGNob29zZSB3aGV0aGVyIHlvdSB3YW50IHRvIHVzZSBpdCBvciBub3QuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHZhbHVlXHJcbiAgICAgKi9cclxuICAgIFdlYkNhbU1hbmFnZXIucHJvdG90eXBlLnNldFVzZUltYWdlQ2FwdHVyZUFQSSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgX3RoaXMuX3VzZUltYWdlQ2FwdHVyZSA9IHZhbHVlO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgaW5zdGFsbGVkIGNhbWVyYSBkZXZpY2VzXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gcmV0dXJucyBkZXZpY2VzIGFzIHByb21pc2VcclxuICAgICAqL1xyXG4gICAgV2ViQ2FtTWFuYWdlci5wcm90b3R5cGUuZ2V0Q2FtZXJhRGV2aWNlcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gW107XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblxyXG4gICAgICAgICAgICAvL2xpc3QgaW5zdGFsbGVkIGRldmljZXMoYXV0aW9pbnB1dCx2aWRlb2lucHV0LCwsKVxyXG4gICAgICAgICAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmVudW1lcmF0ZURldmljZXMoKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRldmljZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBkZXZpY2VzLmZvckVhY2goZnVuY3Rpb24gKGRldmljZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9jaGVjayBpZiB0aGlzIGRldmljZSBpcyBjYW1lcmEodmlkZW9pbnB1dClcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRldmljZS5raW5kID09IFwidmlkZW9pbnB1dFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChkZXZpY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiV2ViIGNhbWVyYSBub3QgZm91bmQgZT1cIiArIGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGNhbnZhcyBmb3IgaW50ZXJuYWwgZHJhd1xyXG4gICAgICogQHBhcmFtIGRldmljZVxyXG4gICAgICogQHJldHVybnMge251bGx8Kn1cclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIFdlYkNhbU1hbmFnZXIucHJvdG90eXBlLl9nZXRTbmFwU2hvdENhbnZhcyA9IGZ1bmN0aW9uIChkZXZpY2UpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIGlmICghX3RoaXMuX3NuYXBTaG90Q2FudmFzKSB7XHJcbiAgICAgICAgICAgIF90aGlzLl9zbmFwU2hvdENhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gX3RoaXMuX3NuYXBTaG90Q2FudmFzO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBjb250ZXh0KGNhbnZhcyBjb250ZXh0KSBmb3IgaW50ZXJuYWwgZHJhd1xyXG4gICAgICogQHBhcmFtIGRldmljZVxyXG4gICAgICogQHJldHVybnMge251bGx8Kn1cclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIFdlYkNhbU1hbmFnZXIucHJvdG90eXBlLl9nZXRTbmFwU2hvdENvbnRleHQgPSBmdW5jdGlvbiAoZGV2aWNlKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICBpZiAoIV90aGlzLl9zbmFwU2hvdENvbnRleHQpIHtcclxuICAgICAgICAgICAgX3RoaXMuX3NuYXBTaG90Q29udGV4dCA9IF90aGlzLl9nZXRTbmFwU2hvdENhbnZhcygpLmdldENvbnRleHQoXCIyZFwiKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBfdGhpcy5fc25hcFNob3RDb250ZXh0O1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogU3RhcnQgY2FtZXJhIHN0cmVhbWluZ1xyXG4gICAgICogQHBhcmFtIGRldmljZVxyXG4gICAgICovXHJcbiAgICBXZWJDYW1NYW5hZ2VyLnByb3RvdHlwZS5zZXRDYW1lcmFEZXZpY2UgPSBmdW5jdGlvbiAoZGV2aWNlKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICBpZiAoZGV2aWNlICYmIGRldmljZS5raW5kICYmIGRldmljZS5raW5kID09IFwidmlkZW9pbnB1dFwiKSB7XHJcbiAgICAgICAgICAgIF90aGlzLl9jYW1lcmFEZXZpY2UgPSBkZXZpY2U7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIFwidmlkZW9cIiBlbGVtZW50XHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqL1xyXG4gICAgV2ViQ2FtTWFuYWdlci5wcm90b3R5cGUuZ2V0VmlkZW9UYWcgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICByZXR1cm4gX3RoaXMuX3ZpZGVvVGFnO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCBzbmFwc2hvdChjYXB0dXJlZCBpbWFnZSkgY2FsbGJhY2suXHJcbiAgICAgKiBPbmNlIHlvdSBzZXQgdGhpcyBjYWxsYmFjaywgdGhlIGNhcHR1cmVkIGltYWdlIHdpbGwgYmUgc2VudCBldmVyeSB0aW1lLlxyXG4gICAgICogQHBhcmFtIGNhbGxiYWNrRnVuY1xyXG4gICAgICogQHBhcmFtIHdpZHRoXHJcbiAgICAgKiBAcGFyYW0gaGVpZ2h0XHJcbiAgICAgKi9cclxuICAgIFdlYkNhbU1hbmFnZXIucHJvdG90eXBlLnNldE9uU25hcFNob3RDYWxsYmFjayA9IGZ1bmN0aW9uIChjYWxsYmFja0Z1bmMsIHdpZHRoLCBoZWlnaHQpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIF90aGlzLl9vblNuYXBTaG90Q2FsbGJhY2sgPSBjYWxsYmFja0Z1bmM7XHJcblxyXG4gICAgICAgIGlmICh3aWR0aCAmJiBoZWlnaHQpIHtcclxuICAgICAgICAgICAgX3RoaXMuX3NuYXBTaG90U2l6ZS53aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgICAgICBfdGhpcy5fc25hcFNob3RTaXplLmhlaWdodCA9IGhlaWdodDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBfdGhpcy5fc25hcFNob3RTaXplLndpZHRoID0gbnVsbDtcclxuICAgICAgICAgICAgX3RoaXMuX3NuYXBTaG90U2l6ZS5oZWlnaHQgPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShfdGhpcy5fc25hcFNob3RMb29wLmJpbmQoX3RoaXMpKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIFdlYkNhbU1hbmFnZXIucHJvdG90eXBlLl9zbmFwU2hvdExvb3AgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgaWYgKCFfdGhpcy5fb25TbmFwU2hvdENhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShfdGhpcy5fc25hcFNob3RMb29wLmJpbmQoX3RoaXMpKTtcclxuXHJcbiAgICAgICAgaWYgKF90aGlzLl9vblNuYXBTaG90Q2FsbGJhY2spIHtcclxuXHJcblxyXG4gICAgICAgICAgICBpZiAoX3RoaXMuaXNWaWRlb1RyYWNrTGl2ZSgpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgX3RoaXMuZ3JhYkZyYW1lKF90aGlzLl9zbmFwU2hvdFNpemUud2lkdGgsIF90aGlzLl9zbmFwU2hvdFNpemUuaGVpZ2h0KVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChpbWFnZUJpdG1hcCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuX29uU25hcFNob3RDYWxsYmFjayhpbWFnZUJpdG1hcCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3JlcXVlc3RBbmltYXRpb25GcmFtZShfdGhpcy5fc25hcFNob3RMb29wLmJpbmQoX3RoaXMpKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLy0gQW4gZXJyb3Igb2NjdXJzIGlmIHRoZSBmcmFtZSBjYW4gbm90IGJlIHByZXBhcmVkXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUuZXJyb3IoXCJmcmFtZSBkcm9wcGVkIGVycm9yPVwiICsgZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoX3RoaXMuX3NuYXBTaG90TG9vcC5iaW5kKF90aGlzKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FwdHVyZSBpbWFnZShkYXRhIFVSSSkgZnJvbSBjYW1lcmEgbGl2ZSBzdHJlYW0gdXNpbmcgb2xkIGFwcHJvYWNoXHJcbiAgICAgKiBAcGFyYW0gd2lkdGhcclxuICAgICAqIEBwYXJhbSBoZWlnaHRcclxuICAgICAqIEBwYXJhbSBkYXRhRm9ybWF0XHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqL1xyXG4gICAgV2ViQ2FtTWFuYWdlci5wcm90b3R5cGUuY2FwdHVyZSA9IGZ1bmN0aW9uICh3aWR0aCwgaGVpZ2h0LCBkYXRhRm9ybWF0KSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgdmFyIHZpZGVvID0gX3RoaXMuX3ZpZGVvVGFnO1xyXG5cclxuXHJcbiAgICAgICAgaWYgKHZpZGVvLnJlYWR5U3RhdGUgPT09IHZpZGVvLkhBVkVfRU5PVUdIX0RBVEEgJiYgdmlkZW8udmlkZW9XaWR0aCA+IDApIHtcclxuXHJcbiAgICAgICAgICAgIC8vIC0gaWYgdmlkZW8gc3RyZWFtIGlzIHJlYWR5XHJcblxyXG4gICAgICAgICAgICAvLyAtIGlmIHNuYXBzaG90Q2FsbGJhY2sgc2V0XHJcblxyXG4gICAgICAgICAgICB2YXIgX3dpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgICAgIHZhciBfaGVpZ2h0ID0gaGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgdmFyIGNvbnRleHQgPSBfdGhpcy5fZ2V0U25hcFNob3RDb250ZXh0KCk7XHJcbiAgICAgICAgICAgIHZhciBjYW52YXMgPSBfdGhpcy5fZ2V0U25hcFNob3RDYW52YXMoKTtcclxuXHJcbiAgICAgICAgICAgIGNhbnZhcy53aWR0aCA9IF93aWR0aDtcclxuICAgICAgICAgICAgY2FudmFzLmhlaWdodCA9IF9oZWlnaHQ7XHJcblxyXG5cclxuICAgICAgICAgICAgLy9jYXB0dXJlIGltYWdlIGZyb20gbWVkaWEgc3RyZWFtLlxyXG4gICAgICAgICAgICBjb250ZXh0LmRyYXdJbWFnZSh2aWRlbywgMCwgMCwgX3dpZHRoLCBfaGVpZ2h0KTtcclxuICAgICAgICAgICAgaWYgKGRhdGFGb3JtYXQgPT0gXCJpbWFnZURhdGFcIikge1xyXG4gICAgICAgICAgICAgICAgdmFyIHNuYXBzaG90SW1hZ2VEYXRhID0gY29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgX3dpZHRoLCBfaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzbmFwc2hvdEltYWdlRGF0YTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciBzbmFwc2hvdEltYWdlRGF0YVVSTCA9IGNhbnZhcy50b0RhdGFVUkwoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzbmFwc2hvdEltYWdlRGF0YVVSTDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGEgc25hcHNob3Qgb2YgdGhlIGxpdmUgdmlkZW8gaW4gdGhlVHJhY2sgYXMgYW4gSW1hZ2VCaXRtYXBcclxuICAgICAqIEBwYXJhbSB3aWR0aCBJbiBcInVzZUltYWdlQ2FwdHVyZVwiIG1vZGUgdGhpcyBwYXJhbWV0ZXIgaXMgaWdub3JlZFxyXG4gICAgICogQHBhcmFtIGhlaWdodCBJbiBcInVzZUltYWdlQ2FwdHVyZVwiIG1vZGUgdGhpcyBwYXJhbWV0ZXIgaXMgaWdub3JlZFxyXG4gICAgICogQHJldHVybnMge1Byb21pc2V9XHJcbiAgICAgKi9cclxuICAgIFdlYkNhbU1hbmFnZXIucHJvdG90eXBlLmdyYWJGcmFtZSA9IGZ1bmN0aW9uICh3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgdmFyIHZpZGVvID0gX3RoaXMuX3ZpZGVvVGFnO1xyXG5cclxuXHJcbiAgICAgICAgaWYgKF90aGlzLl91c2VJbWFnZUNhcHR1cmUpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICh3aWR0aCAmJiBoZWlnaHQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgY29udGV4dCA9IF90aGlzLl9nZXRTbmFwU2hvdENvbnRleHQoKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY2FudmFzID0gX3RoaXMuX2dldFNuYXBTaG90Q2FudmFzKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLl9nZXRJbWFnZUNhcHR1cmUoKS5ncmFiRnJhbWUoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoaW1hZ2VCaXRtYXApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYW52YXMud2lkdGggPSB3aWR0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoaW1hZ2VCaXRtYXAsIDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh3aW5kb3cuY3JlYXRlSW1hZ2VCaXRtYXAoY2FudmFzKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLl9nZXRJbWFnZUNhcHR1cmUoKS5ncmFiRnJhbWUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIGV4ZWN1dG9yNEdyYWJGcmFtZShyZXNvbHZlLCByZWplY3QpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICghX3RoaXMuaXNWaWRlb1RyYWNrTGl2ZSgpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KG5ldyBET01FeGNlcHRpb24oJ0ludmFsaWRTdGF0ZUVycm9yJykpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgdmFyIF93aWR0aCwgX2hlaWdodDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAod2lkdGggJiYgaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3dpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgX2hlaWdodCA9IGhlaWdodDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3dpZHRoID0gdmlkZW8udmlkZW9XaWR0aDtcclxuICAgICAgICAgICAgICAgICAgICBfaGVpZ2h0ID0gdmlkZW8udmlkZW9IZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgY29udGV4dCA9IF90aGlzLl9nZXRTbmFwU2hvdENvbnRleHQoKTtcclxuICAgICAgICAgICAgICAgIHZhciBjYW52YXMgPSBfdGhpcy5fZ2V0U25hcFNob3RDYW52YXMoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjYW52YXMud2lkdGggPSBfd2lkdGg7XHJcbiAgICAgICAgICAgICAgICBjYW52YXMuaGVpZ2h0ID0gX2hlaWdodDtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHdpZHRoICYmIGhlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuZHJhd0ltYWdlKHZpZGVvLCAwLCAwLCBfd2lkdGgsIF9oZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmRyYXdJbWFnZSh2aWRlbywgMCwgMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh3aW5kb3cuY3JlYXRlSW1hZ2VCaXRtYXAoY2FudmFzKSk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICByZWplY3QobmV3IERPTUV4Y2VwdGlvbignVW5rbm93bkVycm9yJykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICBXZWJDYW1NYW5hZ2VyLnByb3RvdHlwZS50YWtlUGhvdG8gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgdmFyIHZpZGVvID0gX3RoaXMuX3ZpZGVvVGFnO1xyXG5cclxuICAgICAgICBpZiAoX3RoaXMuX3VzZUltYWdlQ2FwdHVyZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gX3RoaXMuX2dldEltYWdlQ2FwdHVyZSgpLnRha2VQaG90bygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIGV4ZWN1dG9yNEdyYWJGcmFtZShyZXNvbHZlLCByZWplY3QpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICghX3RoaXMuaXNWaWRlb1RyYWNrTGl2ZSgpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KG5ldyBET01FeGNlcHRpb24oJ0ludmFsaWRTdGF0ZUVycm9yJykpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgdmFyIF93aWR0aCwgX2hlaWdodDtcclxuXHJcbiAgICAgICAgICAgICAgICBfd2lkdGggPSB2aWRlby52aWRlb1dpZHRoO1xyXG4gICAgICAgICAgICAgICAgX2hlaWdodCA9IHZpZGVvLnZpZGVvSGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBjb250ZXh0ID0gX3RoaXMuX2dldFNuYXBTaG90Q29udGV4dCgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGNhbnZhcyA9IF90aGlzLl9nZXRTbmFwU2hvdENhbnZhcygpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNhbnZhcy53aWR0aCA9IF93aWR0aDtcclxuICAgICAgICAgICAgICAgIGNhbnZhcy5oZWlnaHQgPSBfaGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnRleHQuZHJhd0ltYWdlKHZpZGVvLCAwLCAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjYW52YXMudG9CbG9iKHJlc29sdmUpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICByZWplY3QobmV3IERPTUV4Y2VwdGlvbignVW5rbm93bkVycm9yJykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsYmFjayB3aGVuIGdldFVzZXJNZWRpYSBmaW5pc2hlZFxyXG4gICAgICogQHBhcmFtIGNhbGxiYWNrRnVuY1xyXG4gICAgICovXHJcbiAgICBXZWJDYW1NYW5hZ2VyLnByb3RvdHlwZS5zZXRPbkdldFVzZXJNZWRpYUNhbGxiYWNrID0gZnVuY3Rpb24gKGNhbGxiYWNrRnVuYykge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgX3RoaXMuX29uR2V0VXNlck1lZGlhQ2FsbGJhY2sgPSBjYWxsYmFja0Z1bmM7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3RhcnQgY2FtZXJhIHN0cmVhbWluZ1xyXG4gICAgICogQHBhcmFtIGNhbGxiYWNrRnVuY1xyXG4gICAgICovXHJcbiAgICBXZWJDYW1NYW5hZ2VyLnByb3RvdHlwZS5zdGFydENhbWVyYSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG5cclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuXHJcblxyXG4gICAgICAgICAgICBpZiAoX3RoaXMuX3dlYmNhbVN0YXJ0ZWQpIHtcclxuICAgICAgICAgICAgICAgIHJlamVjdCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBfdGhpcy5kb1dlYmNhbVBvbHlmaWxsKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIV90aGlzLmhhc0dldFVzZXJNZWRpYSgpIHx8IF90aGlzLl90ZXN0VmlkZW9Nb2RlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgX3RoaXMuX3dlYmNhbVN0YXJ0ZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIV90aGlzLl90ZXN0VmlkZW9Nb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIldlYiBjYW1lcmEgbm90IGZvdW5kXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIF90aGlzLl92aWRlb1RhZy5zcmMgPSBfdGhpcy5fdGVzdFZpZGVvVXJsO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuX3ZpZGVvVGFnLmxvb3AgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuX3ZpZGVvVGFnLnBsYXkoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoX3RoaXMuX29uR2V0VXNlck1lZGlhQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5fb25HZXRVc2VyTWVkaWFDYWxsYmFjay5iaW5kKF90aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5fb25HZXRVc2VyTWVkaWFDYWxsYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vSWduaXRlIHRoZSBzbmFwU2hvdExvb3Agd2hlbiBzdGFydENhbWVyYSBpcyBjYWxsZWRcclxuICAgICAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShfdGhpcy5fc25hcFNob3RMb29wLmJpbmQoX3RoaXMpKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgcmVqZWN0KCk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgd2ViY2FtUGFyYW0gPSBfdGhpcy5fd2ViY2FtUGFyYW1zO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBJZiB5b3UgdXNlIFwibWFuZGF0b3J5XCIgYW5kIFwiZGV2aWNlSWRcIiBhdCB0aGUgc2FtZSB0aW1lIG9uIGNocm9tZSB5b3UgZ2V0IGFuIGVycm9yIGxpa2VcclxuICAgICAgICAgICAgICAgIC8vIFwiTWFsZm9ybWVkIGNvbnN0cmFpbnQ6IENhbm5vdCB1c2UgYm90aCBvcHRpb25hbC9tYW5kYXRvcnkgYW5kIHNwZWNpZmljIG9yIGFkdmFuY2VkIGNvbnN0cmFpbnRzXCJcclxuICAgICAgICAgICAgICAgIC8vIFlvdSBzaG91bGQgdXNlIFwic291cmNlSWRcIiB3aXRoIFwibWFuZGF0b3J5XCIgaW5zdGVhZCBvZiB1c2luZyBcImRldmljZUlkXCJcclxuICAgICAgICAgICAgICAgIGlmIChfdGhpcy5fY2FtZXJhRGV2aWNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gLSBpZiBjYW1lcmEgZGV2aWNlIHNwZWNpZmllZCBleHBsaWNpdGx5XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHdlYmNhbVBhcmFtLnZpZGVvLm1hbmRhdG9yeSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3ZWJjYW1QYXJhbS52aWRlby5tYW5kYXRvcnkuc291cmNlSWQgPSBfdGhpcy5fY2FtZXJhRGV2aWNlLmRldmljZUlkO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlYmNhbVBhcmFtLnZpZGVvLmRldmljZUlkID0gd2ViY2FtUGFyYW0udmlkZW8uZGV2aWNlSWQgPyB3ZWJjYW1QYXJhbS52aWRlby5kZXZpY2VJZCA6IHdlYmNhbVBhcmFtLnZpZGVvLmRldmljZUlkID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlYmNhbVBhcmFtLnZpZGVvLmRldmljZUlkLmV4YWN0ID0gX3RoaXMuX2NhbWVyYURldmljZS5kZXZpY2VJZDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKHdlYmNhbVBhcmFtKS50aGVuKGZ1bmN0aW9uIChtZWRpYVN0cmVhbSkge1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuX2xvY2FsTWVkaWFTdHJlYW0gPSBtZWRpYVN0cmVhbTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBfdGhpcy5fdmlkZW9UYWcuc3JjT2JqZWN0ICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl92aWRlb1RhZy5zcmNPYmplY3QgPSBtZWRpYVN0cmVhbTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fdmlkZW9UYWcuc3JjID0gd2luZG93LlVSTCAmJiB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChtZWRpYVN0cmVhbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuZ2V0Q2FwYWJpbGl0aWVzKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLl92aWRlb1RhZy5wbGF5KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLl93ZWJjYW1TdGFydGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLl9vbkdldFVzZXJNZWRpYUNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl9vbkdldFVzZXJNZWRpYUNhbGxiYWNrLmJpbmQoX3RoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fb25HZXRVc2VyTWVkaWFDYWxsYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9JZ25pdGUgdGhlIHNuYXBTaG90TG9vcCB3aGVuIHN0YXJ0Q2FtZXJhIGlzIGNhbGxlZFxyXG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShfdGhpcy5fc25hcFNob3RMb29wLmJpbmQoX3RoaXMpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignV2ViIGNhbWVyYSBub3QgZm91bmQnLCBlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuX3ZpZGVvVGFnLnNyYyA9IF90aGlzLl90ZXN0VmlkZW9Vcmw7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuX3ZpZGVvVGFnLmxvb3AgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5fdmlkZW9UYWcucGxheSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5fd2ViY2FtU3RhcnRlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMuX29uR2V0VXNlck1lZGlhQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuX29uR2V0VXNlck1lZGlhQ2FsbGJhY2suYmluZChfdGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl9vbkdldFVzZXJNZWRpYUNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL0lnbml0ZSB0aGUgc25hcFNob3RMb29wIHdoZW4gc3RhcnRDYW1lcmEgaXMgY2FsbGVkXHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKF90aGlzLl9zbmFwU2hvdExvb3AuYmluZChfdGhpcykpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBXZWJDYW1NYW5hZ2VyLnByb3RvdHlwZS5nZXRDYXBhYmlsaXRpZXMgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICAgIHZhciB0cmFjayA9IF90aGlzLmdldFZpZGVvVHJhY2soKTtcclxuICAgICAgICBpZiAodHJhY2spIHtcclxuICAgICAgICAgICAgdmFyIGNhcGFiaWxpdGllcyA9IHRyYWNrLmdldENhcGFiaWxpdGllcygpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHZpZGVvIHRyYWNrXHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAqL1xyXG4gICAgV2ViQ2FtTWFuYWdlci5wcm90b3R5cGUuZ2V0VmlkZW9UcmFjayA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgaWYgKF90aGlzLl9sb2NhbE1lZGlhU3RyZWFtKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfdGhpcy5fbG9jYWxNZWRpYVN0cmVhbS5nZXRWaWRlb1RyYWNrcygpWzBdO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm4gdHJ1ZSB3aGVuIHZpZGVvIHRyYWNrIGlzIGxpdmUuXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgV2ViQ2FtTWFuYWdlci5wcm90b3R5cGUuaXNWaWRlb1RyYWNrTGl2ZSA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB2YXIgdHJhY2sgPSBfdGhpcy5nZXRWaWRlb1RyYWNrKCk7XHJcbiAgICAgICAgcmV0dXJuIHRyYWNrICYmIHRyYWNrLnJlYWR5U3RhdGUgPT09IFwibGl2ZVwiO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTdG9wIGNhbWVyYSBzdHJlYW1pbmdcclxuICAgICAqL1xyXG4gICAgV2ViQ2FtTWFuYWdlci5wcm90b3R5cGUuc3RvcENhbWVyYSA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgdmFyIHRyYWNrID0gX3RoaXMuZ2V0VmlkZW9UcmFjaygpO1xyXG4gICAgICAgIGlmICh0cmFjaykge1xyXG4gICAgICAgICAgICB0cmFjay5zdG9wKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChfdGhpcy5fdmlkZW9UYWcpIHtcclxuICAgICAgICAgICAgX3RoaXMuX3ZpZGVvVGFnLnBhdXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2Rpc3Bvc2UgX2ltYWdlQ2FwdHVyZSBvYmplY3RcclxuICAgICAgICBfdGhpcy5faW1hZ2VDYXB0dXJlID0gbnVsbDtcclxuXHJcbiAgICAgICAgX3RoaXMuX3dlYmNhbVN0YXJ0ZWQgPSBmYWxzZTtcclxuICAgIH07XHJcblxyXG4gICAgV2ViQ2FtTWFuYWdlci5wcm90b3R5cGUuZG9XZWJjYW1Qb2x5ZmlsbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHdpbmRvdy5VUkwgPSB3aW5kb3cuVVJMIHx8IHdpbmRvdy53ZWJraXRVUkw7XHJcbiAgICAgICAgLy9wb2x5ZmlsbFxyXG4gICAgICAgIGlmICghbmF2aWdhdG9yLm1lZGlhRGV2aWNlcykge1xyXG4gICAgICAgICAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzID0ge307XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2ZvciBvbGRlciBhcHByb2FjaCBuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhXHJcbiAgICAgICAgbmF2aWdhdG9yLmdldFVzZXJNZWRpYSA9IG5hdmlnYXRvci5nZXRVc2VyTWVkaWFcclxuICAgICAgICAgICAgfHwgbmF2aWdhdG9yLndlYmtpdEdldFVzZXJNZWRpYVxyXG4gICAgICAgICAgICB8fCBuYXZpZ2F0b3IubW96R2V0VXNlck1lZGlhIHx8IG5hdmlnYXRvci5tc0dldFVzZXJNZWRpYTtcclxuICAgIH07XHJcblxyXG4gICAgV2ViQ2FtTWFuYWdlci5wcm90b3R5cGUuaGFzR2V0VXNlck1lZGlhID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIChuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhIHx8IG5hdmlnYXRvci53ZWJraXRHZXRVc2VyTWVkaWFcclxuICAgICAgICAgICAgfHwgbmF2aWdhdG9yLm1vekdldFVzZXJNZWRpYSB8fCBuYXZpZ2F0b3IubXNHZXRVc2VyTWVkaWEgfHwgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEpO1xyXG4gICAgfTtcclxuXHJcbiAgICBXZWJDYW1NYW5hZ2VyLnByb3RvdHlwZS5fZ2V0SW1hZ2VDYXB0dXJlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcblxyXG5cclxuICAgICAgICBpZiAoX3RoaXMuX3VzZUltYWdlQ2FwdHVyZSAmJiAhX3RoaXMuX2ltYWdlQ2FwdHVyZSkge1xyXG4gICAgICAgICAgICBfdGhpcy5faW1hZ2VDYXB0dXJlID0gbmV3IEltYWdlQ2FwdHVyZShfdGhpcy5nZXRWaWRlb1RyYWNrKCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIF90aGlzLl9pbWFnZUNhcHR1cmU7XHJcblxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgcmV0dXJuIFdlYkNhbU1hbmFnZXI7XHJcbn0oKSk7XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBXZWJDYW1NYW5hZ2VyO1xyXG4iXX0=
