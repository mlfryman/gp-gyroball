/* jshint boss: true */
(function(){
  'use strict';

  angular.module('gyroball')
  .factory('Collision', ['$scope', 'Ball', 'Boundaries', 'Game', 'Target', function($scope, Ball, Boundaries, Game, Target){
    /*
     * Check whether the ball should fall into target/hole
     * @param {Double} x; @param {Double} y
     * @returns {Boolean}
     */
    function target(x, y){
      if ((y <= Target.position.y + Ball.size && y >= Target.position.y - Ball.size) && (x <= Target.position.x + Ball.size && x >= Target.position.x - Ball.size)){
        return true;
      }
      return false;
    }

    /*
     * Check whether the ball should crash against a boundary
     * @param {Double} x; @param {Double} y
     * @returns {String} collision direction
     */
    function boundaries(x, y){
      var ret = '';

      if (y <= (Boundaries.top - 0 + (Ball.size / 2))){
        ret += 'top';
      }
      else if (y >= (Boundaries.height - 0 + Boundaries.margin - (Ball.size / 2))){
        ret += 'bottom';
      }

      if (x <= (Boundaries.left + (Ball.size / 2))){
        ret += 'left';
      }
      else if (x >= (Boundaries.width - 0 + Boundaries.margin - (Ball.size / 2))){
        ret += 'right';
      }

      if (ret !== ''){
        return ret;
      }

      return false;
    }

    return {target:target, boundaries:boundaries};

  //- Last brackets
  }]);
})();
