(function(){
  'use strict';

  angular.module('gyroball', ['ionic'])
  .factory('ScreenOrientation', ['$scope', function($scope){

    // Initialize screen properties taking into account vendor prefixes
    function init(){
      screen.orientation = screen.orientation || screen.mozOrientation || screen.msOrientation;
      screen.lockOrientation = screen.lockOrientation || screen.mozLockOrientation || screen.msLockOrientation;
      screen.unlockOrientation = screen.unlockOrientation || screen.mozUnlockOrientation || screen.msUnlockOrientation;
    }

    /*
     * Check if window.orientation property is supported
     * @returns {Boolean}
     */
    function isScreenOrientationSupported(){
      if(screen.orientation){
        return true;
      }
      return false;
    }

    /*
     * get device orientation
     * @returns {String} orientation
     */
    function getOrientation(){
      return screen.orientation || window.orientation;
    }

    /*
     * Lock the screen orientation to the value specified as parameter
     * @param {String} orientation
     */
    function lockOrientation(orientation){
      if(screen.lockOrientation){
        screen.lockOrientation(orientation);
      }
    }

    // Unlock the orientation
    function unlockOrientation(){
      if(screen.unlockOrientationFunction){
        screen.unlockOrientationFunction();
      }
    }

    /*
     * handle screen orientation
     * @param {Object} callbacks
     */
    function handleOrientation(callbacks){
      var self = this,
      /* Check the orientation and invoke the callback functions */
          screenOrientation = self.getOrientation();

      if(screenOrientation || window.orientation){
        if(screenOrientation === 'portrait-primary' || screenOrientation === 0){
          if(callbacks.portraitPrimaryCallback){
            callbacks.portraitPrimaryCallback();
          }
        }
        else if(screenOrientation === 'landscape-primary' || screenOrientation === 90){
          if(callbacks.landscapePrimaryCallback){
            callbacks.landscapePrimaryCallback();
          }
        }
        else if(screenOrientation === 'landscape-secondary' || screenOrientation === -90){
          if(callbacks.portraitSecondaryCallback){
            callbacks.portraitSecondaryCallback();
          }
        }
        else if(screenOrientation === 'portrait-secondary' || screenOrientation === 180){
          if(callbacks.landscapeSecondaryCallback){
            callbacks.landscapeSecondaryCallback();
          }
        }
      }
      else { // portrait-primary
        if(callbacks.portraitPrimaryCallback){
          callbacks.portraitPrimaryCallback();
        }
      }
    }

    /*
     * handle orientation change
     * @param {Object} callbacks
     */
    function handleOrientationChange(callbacks){
       var self = this;

       /* if the OrientationChangeEvent is supported in screen */
       if('onorientationchange' in screen || 'onmozorientationchange' in window){
         /* Invoke handleOrientation on orientation change */
         screen.onorientationchange = function(){
           setTimeout(function(){
             self.handleOrientation(callbacks);
           }, 500);
         };
       }
       /* if the OrientationChangeEvent is supported in window */
       else if('onorientationchange' in window){

         /* Invoke handleOrientation on orientation change */
         window.onorientationchange = function(){

           setTimeout(function(){
             self.handleOrientation(callbacks);
           }, 500);

         };
       }
       else { // fallback
         /* Invoke handleOrientation on window resize */
         window.onresize = function(){
           setTimeout(function(){
             self.handleOrientation(callbacks);
           }, 500);
         };
       }
      }

    return {init:init, isScreenOrientationSupported:isScreenOrientationSupported, getOrientation:getOrientation, lockOrientation:lockOrientation, unlockOrientation:unlockOrientation, handleOrientation:handleOrientation, handleOrientationChange:handleOrientationChange};

  //- Last brackets
  }]);
})();
