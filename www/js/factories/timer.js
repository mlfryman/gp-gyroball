(function(){
  'use strict';

  angular.module('gyroball', ['ionic', 'timer'])
  .factory('Timer', ['$scope', function($scope){
    /* MLF NOTE: I am testing if the timer directive will work in a different format.
     * Functions that are commented out are the original, working code.
     */

    function startTimer(){
      $scope.$broadcast('timer-start');
      $scope.timerRunning = true;
    }
    //- $scope.startTimer = function(){
    //-   $scope.$broadcast('timer-start');
    //-   $scope.timerRunning = true;
    //- };

    function stopTimer(){
      $scope.$broadcast('timer-stop');
      $scope.timerRunning = false;
    }
    //- $scope.stopTimer = function(){
    //-   $scope.$broadcast('timer-stop');
    //-   $scope.timerRunning = false;
    //- };

    $scope.$on('timer-stopped', function(event, data){
      console.log('Timer Stopped - data = ', data);
    });

    return {startTimer:startTimer, stopTimer:stopTimer};

  //- Last brackets
  }]);
})();
