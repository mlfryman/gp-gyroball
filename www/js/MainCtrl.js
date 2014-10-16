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
    window.addEventListener('device-orientation', function(data){
      $scope.data = data;
      $scope.digest();
    });
    // END DEVICE ORIENTATION

    // BALL
    $scope.x = document.documentElement.clientWidth;
    $scope.y = document.documentElement.clientHeight-20; //-20 accounts for iphone availHeight

    $scope.ballY =Math.floor(Math.random()*$scope.y+1);
    $scope.ballX =Math.floor(Math.random()*$scope.x+1);

  }]);
})();
