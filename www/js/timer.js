(function(){
  'use strict';

  angular.module('gyroball', ['ionic', 'timer'])
  .factory('Timer', ['$scope', function($scope){
    // TIMER
    //- $scope.timerRunning = false;
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
  });
})();
