(function(){
  'use strict';

  angular.module('gyroball', ['ionic', 'timer'])
  .controller('AppCtrl', ['$scope', '$interval', 'Ball', 'Boundaries', 'Collision', 'DeviceMotion', 'Game', 'ScreenOrientation', 'Target', function($scope, $interval, Ball, Boundaries, Collision, DeviceMotion, Game, ScreenOrientation, Target){
     // Timer
     $scope.startTimer = function(){
       $scope.$broadcast('timer-start');
       $scope.timerRunning = true;
     };


     $scope.stopTimer = function(){
       $scope.$broadcast('timer-stop');
       $scope.timerRunning = false;
     };

     $scope.$on('timer-stopped', function(event, data){
       console.log('Timer Stopped - data = ', data);
     });
     //END Timer

     // Initialize the app by calling all init functions
     var App = {
       init: function(){
          // Initialize game
          Game.init();

          // Initialize boundaries
          Boundaries.init({
            margin: 10
          });

          // Initialize target/hole
          Target.init({
            size: 50,
            xPos: 100,
            yPos: 50
          });

          // Initialize ball
          Ball.init({
            size: 20,
            xPos: Game.playground.width - 30,
            yPos: Game.playground.height - 30
          });

          // Lock Screen Orientation to Portrait
          ScreenOrientation.init();
          ScreenOrientation.lockOrientation('portrait-primary');

          // Initialize device motion montrol
          DeviceMotion.init();

          // Start the actual game
          Game.start();
        }
      };

      /* Initialize app when the window is loaded */
      window.onload = App.init();
  //- Last brackets
  }]);
})();
