(function(){
  'use strict';

  angular.module('gyroball')
  .factory('Boundaries', ['$scope', 'Game', function($scope, Game){

    // Initialize boundaries
    function init(settings){
        if (settings){
            this.margin = settings.margin;
        }

        this.top = this.margin;
        this.left = this.margin;
        this.width = Game.playground.width - (2 * this.margin);
        this.height = Game.playground.height - (2 * this.margin);

        this.draw();
    }

    // Draw boundaries
    function draw(){
        Game.playgroundContext.strokeStyle = '#000000';
        Game.playgroundContext.beginPath();
        Game.playgroundContext.rect(this.left, this.top, this.width, this.height);
        Game.playgroundContext.closePath();
        Game.playgroundContext.stroke();
    }

    return {init:init, draw:draw};

  //- Last brackets
  }]);
})();
