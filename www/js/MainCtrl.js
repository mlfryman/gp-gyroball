(function(){
  'use strict';

  angular.module('gyroball', ['ionic', 'timer'])
  .controller('MainCtrl', ['$scope', function($scope){
    // TIMER
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

    // GYROSCOPE
    function success(orientation){
      console.log('------SUCCESS!-------\n' +
        'orientation= ' + '\n' +
        'alpha: ' + orientation.alpha + '\n' +
        'beta: ' + orientation.beta + '\n' +
        'gamma: ' + orientation.gamma + '\n' +
        'absolute: ' + orientation.absolute + '\n');
    }

    function error(){
      alert('ERROR!');
    }

    $scope.start = function(){
      console.log('-------Starting Gyroscope-------');
      navigator.gyroscope.watchGyroscope(success, error);
    };

    $scope.reset = function(){
      // @param {String} id - the id of the watch returned from #watchGyroscope.
      navigator.gyroscope.clearWatch();
    };
    // END Gyroscope
    // place ball in random location
    });
  }]);
})();
