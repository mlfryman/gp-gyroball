/* jshint boss: true */
(function(){
  'use strict';

  //  Ball.init({
  //  size: 20,
  //  xPos: Game.playground.width - 30,
  //  yPos: Game.playground.height - 30
  //  });

  angular.module('gyroball')
  .factory('Ball', [function(){
    var Ball = {

      init: function(settings) {
        this.size = settings.size;
        this.status = 'rolling'; // rolling, crashing, onabrick
        this.position = {
            x: settings.xPos,
            y: settings.yPos
        };

          // Draw the ball
        this.draw();
    },

      // Draw the ball
    draw: function() {
      Game.playgroundContext.fillStyle = '#8d2544';
      Game.playgroundContext.beginPath();
      Game.playgroundContext.arc(this.position.x, this.position.y, this.size / 2, 0, 2 * Math.PI);
      Game.playgroundContext.closePath();
      Game.playgroundContext.fill();
    },

    // Ball movement
    roll: function(motionX, motionY) {

      this.position.y += motionY;
      this.position.x += motionX;

      Game.clearPlayground();
      Target.draw();
      this.draw();
      Boundaries.draw();
      Obstacles.draw();
    },

    /*
     * Make the ball crash against boundaries
     */
    crash: function(outofboundaries) {
      this.status = 'crashing';

      if (outofboundaries === 'left') {
        this.position.x = Boundaries.left - 0 + (this.originalSize / 2);
      }
      else if (outofboundaries === 'top') {
        this.position.y = Boundaries.top - 0 + (this.originalSize / 2);
      }
      else if (outofboundaries === 'right') {
        this.position.x = Boundaries.top - 0 + Boundaries.width - (this.originalSize / 2);
      }
      else if (outofboundaries === 'bottom') {
        this.position.y = Boundaries.left - 0 + Boundaries.height - (this.originalSize / 2);
      }

      this.draw();
    },

    /*
     * fall
     * Make the ball fall into the hole
     */
    fall: function(x, y) {
      /* Update ball status */
      this.status = 'falling';

      /* Update ball position */
      this.position.x = x;
      this.position.y = y;

      /* Decrease ball size */
      this.size -= 1;

      /* Repaint */
      Game.clearPlayground();
      Target.draw();
      //  Boundaries.draw();
      //  Obstacles.draw();
      this.draw();

      /* Animate until the ball is visible */
      if (this.size > 0) {
        var self = this;
        window.requestAnimationFrame(function() {
          self.fall(x, y);
        });
      }
      else {
        this.status = 'rolling';
      }
    }
  };
  }]);
})();
