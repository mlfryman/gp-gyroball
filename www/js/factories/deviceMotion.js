/* jshint unused: false */

(function(){
  'use strict';

  angular.module('gyroball', ['ionic'])
  .factory('DeviceMotion', ['$scope', 'ScreenOrientation', function($scope, ScreenOrientation){

    // Initialize device motion control
    function init(){
    }

    /*
     * Check if the device orientation event is supported
     * @returns {Boolean}
     */
    function isDeviceOrientationEventSupported(){
       if(window.DeviceOrientationEvent){
         return true;
       }
       return false;
     }

     /*
      * Check if the device motion event is supported
      * @returns {Boolean}
      */
     function isDeviceMotionEventSupported(){
       if(window.DeviceMotionEvent){
         return true;
       }
       return false;
     }

     /*
      * Listen to the devicemotion event and invoke the callback function every time the event is fired
      * @param {Function} callback
      */
      function handleMotionEvent(cb){
        /* In Safari for iOS the direction are reversed on axes x and y */
        var implementationFix = 1;

        if(window.navigator.userAgent.match(/^.*(iPhone|iPad).*(OS\s[0-9]).*(CriOS|Version)\/[.0-9]*\sMobile.*$/i)){ // is Mobile Safari
          implementationFix = -1;
        }

        /* Check whether the DeviceMotionEvent is supported */
        if(this.isDeviceMotionEventSupported()){
          /* Add a listener for the devicemotion event */
          window.ondevicemotion = function(deviceMotionEvent){

            /* Get acceleration on x, y and z axis */
            var x = deviceMotionEvent.accelerationIncludingGravity.x * implementationFix,
                y = deviceMotionEvent.accelerationIncludingGravity.y * implementationFix,
                z = deviceMotionEvent.accelerationIncludingGravity.z,
                /* Get the interval (ms) at which data is obtained from the underlying hardware */
                interval = deviceMotionEvent.interval;

            /* Handle the screen orientation */
            ScreenOrientation.handleOrientation({
              portraitPrimaryCallback: function(){
                cb(-x, y, z, interval);
              },
              landscapePrimaryCallback: function(){
                cb(y, x, z, interval);
              },
              portraitSecondaryCallback: function(){
                cb(-y, -x, z, interval);
              },
              landscapeSecondaryCallback: function(){
                cb(x, -y, z, interval);
              }
            });
          };
        }
      }

      return {init:init, isDeviceOrientationEventSupported:isDeviceOrientationEventSupported, isDeviceMotionEventSupported:isDeviceMotionEventSupported, handleMotionEvent:handleMotionEvent};

   //- Last brackets
   }]);
})();
