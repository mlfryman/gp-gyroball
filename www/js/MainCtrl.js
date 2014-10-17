(function(){
  'use strict';

  angular.module('gyroball', ['ionic', 'timer'])
  .controller('MainCtrl', ['$scope', '$interval', function($scope, $interval){
    // TIMER
    // $scope.timerRunning = false;
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
    // END Timer

    // DEVICE ORIENTATION
    window.addEventListener('deviceorientation', function(data){
      $scope.data = data;
      console.log(data);
      $scope.digest();
    });
    // END DEVICE ORIENTATION
    // BALL
  }]);
})();
