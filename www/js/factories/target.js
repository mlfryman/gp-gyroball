(function(){
  'use strict';

  angular.module('gyroball')
  .factory('Target',['$scope', 'Game', function($scope, Game){

    // Initialize the target/hole
    function init(settings){
        this.size = settings.size;

        this.position = {
            x: settings.xPos,
            y: settings.yPos
        };

        this.draw();
    }

    // Draw target/hole
    function draw(){
        Game.playgroundContext.fillStyle = '#000000';
        Game.playgroundContext.beginPath();
        Game.playgroundContext.arc(this.position.x, this.position.y, this.size / 2, 0, 2 * Math.PI);
        Game.playgroundContext.closePath();
        Game.playgroundContext.fill();
    }

    return {init:init, draw:draw};

  //- Last brackets
  }]);
})();
