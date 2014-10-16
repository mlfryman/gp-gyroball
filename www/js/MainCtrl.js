(function(){
  'use strict';

  angular.module('gyroball', ['ionic', 'timer'])
  .controller('MainCtrl', ['$scope', function($scope){
    // Timer
    $scope.timerRunning = true;
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
    // END Timer

    function success(orientation){
      $scope.alpha = orientation.alpha;
      $scope.beta = orientation.beta;
      $scope.gamma = orientation.gamma;
      $scope.absolute = orientation.absolute;
      console.log(orientation);
    }

    console.log(success, error);

    function error(o){
      console.log('ERROR:', o);
    }

    $scope.start = function(){
      navigator.gyroscope.watchGyroscope(success, error);
      console.log(success, error);
    };

    $scope.reset = function(){
      navigator.gyroscope.clearWatch();
    };
    });
  }]);
})();
