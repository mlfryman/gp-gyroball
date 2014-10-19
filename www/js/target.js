(function(){
  'use strict';

  angular.module('gyroball')
  .factory('Target',['Game', function(Game){
    /*
     * init
     * Initialize the object
     */
    function init(settings){
        this.size = settings.size;

        this.position = {
            x: settings.xPos,
            y: settings.yPos
        };

        /* Draw the hole */
        this.draw();
    }
    /*
     * draw
     * Draw the hole
     */
    function draw(){
        Game.playgroundContext.fillStyle = '#000000';
        Game.playgroundContext.beginPath();
        Game.playgroundContext.arc(this.position.x, this.position.y, this.size / 2, 0, 2 * Math.PI);
        Game.playgroundContext.closePath();
        Game.playgroundContext.fill();
    }

    return {init:init, draw:draw};
  }]);
})();
