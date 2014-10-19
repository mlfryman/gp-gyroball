(function(){
  'use strict';

  //  Ball.init({
  //  size: 20,
  //  xPos: Game.playground.width - 30,
  //  yPos: Game.playground.height - 30
  //  });

  angular.module('gyroball')
  .factory('Ball', ['$scope', 'Game', 'Boundaries', 'Target', function($scope, Game, Boundaries, Target){

    // Initialize the ball
    function init(settings){
      this.size = settings.size;
      this.status = 'rolling'; // rolling, crashing
      this.position = {
        x: settings.xPos,
        y: settings.yPos
      };
      this.draw();
    }

    // Draw the ball
    function draw(){
      Game.playgroundContext.fillStyle = '#8d2544';
      Game.playgroundContext.beginPath();
      Game.playgroundContext.arc(this.position.x, this.position.y, this.size / 2, 0, 2 * Math.PI);
      Game.playgroundContext.closePath();
      Game.playgroundContext.fill();
    }

    // Ball movement
    function roll(motionX, motionY){

      this.position.y += motionY;
      this.position.x += motionX;

      Game.clearPlayground();
      Target.draw();
      this.draw();
      Boundaries.draw();
    }

    // Crash ball against boundaries
    function crash(outofboundaries){
      this.status = 'crashing';

      if (outofboundaries === 'left'){
        this.position.x = Boundaries.left - 0 + (this.size / 2);
      }
      else if (outofboundaries === 'top'){
        this.position.y = Boundaries.top - 0 + (this.size / 2);
      }
      else if (outofboundaries === 'right'){
        this.position.x = Boundaries.top - 0 + Boundaries.width - (this.size / 2);
      }
      else if (outofboundaries === 'bottom'){
        this.position.y = Boundaries.left - 0 + Boundaries.height - (this.size / 2);
      }

      this.draw();
    }

    // Ball falls into the target/hole
    function fall(x, y){
      this.status = 'falling';

      this.position.x = x;
      this.position.y = y;

      Game.clearPlayground();

      // Alert user that they have won the game!

    }

    return {init:init, draw:draw, roll:roll, crash:crash, fall:fall};

  //- Last brackets
  }]);
})();
