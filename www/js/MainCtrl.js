/* jshint unused: false */

(function(){
  'use strict';

  angular.module('gyroball', ['ionic'])
  .controller('AppCtrl', ['$scope', '$interval', 'Ball', 'Boundaries', 'DeviceMotionControl', 'Game', 'ScreenOrientation', 'Target', 'Timer', function($scope, $interval, Ball, Boundaries, DeviceMotionControl, Game, ScreenOrientation, Target, Timer){
      /*
       * Initialize the app by calling all init functions
       */
     function init(){
        /* Initialize Game */
        Game.init();

        /* Create Boundaries */
        Boundaries.init({
          margin: 10
        });

        /* Create Target */
        Target.init({
          size: 50,
          xPos: 100,
          yPos: 50
        });

        /* Create Ball */
        Ball.init({
          size: 20,
          xPos: Game.playground.width - 30,
          yPos: Game.playground.height - 30
        });

        /* Lock Screen Orientation to Portrait */
        ScreenOrientation.init();
        ScreenOrientation.lockOrientation('portrait-primary');

        /* Init Device Motion Control */
        DeviceMotionControl.init();

        /* Start the Game */
        Game.start();
    }
  }]);
})();
