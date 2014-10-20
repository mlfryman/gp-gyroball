/* jshint undef: false */

(function(){
  'use strict';

  angular.module('gyroball')
  .factory('Game', ['$scope', 'Ball', 'Boundaries', 'Collision', 'DeviceMotionControl', 'ScreenOrientation', 'Target', function($scope, Ball, Boundaries, Collision, DeviceMotionControl, ScreenOrientation, Target){

    var Game = {};

    // Initialize the game
    function init(){
        this.status = 'stopped';
        this.level = 1;
        this.speed = 1;

        this.playground = document.getElementById('playground');
        this.playground.setAttribute('width', window.innerWidth - 5);
        this.playground.setAttribute('height', window.innerHeight - 5);

        this.playgroundContext = this.playground.getContext('2d');

        this.lastMotionX = 0;
        this.lastMotionY = 0;

        /* Initialize window.requestAnimationFrame taking into account vendor prefixes */
        window.requestAnimationFrame = window.requestAnimationFrame || ozRequestAnimationFrame ||
                window.webkitRequestAnimationFrame || sRequestAnimationFrame;

    }

    // Start the level
    function start(){
        /* Clear the playground */
        this.clearPlayground();

        this.playground.setAttribute('width', window.innerWidth - 5);
        this.playground.setAttribute('height', window.innerHeight - 5);

        /* Draw game pieces */
        Boundaries.init();
        this.generateTarget();
        //this.generateObstacles();
        this.generateBall();

        /* Handle the screen orientation change */
        ScreenOrientation.handleOrientationChange({
            portraitPrimaryCallback: Game.resume.bind(Game),
            landscapePrimaryCallback: Game.pause.bind(Game),
            portraitSecondaryCallback: Game.pause.bind(Game),
            landscapeSecondaryCallback: Game.pause.bind(Game)
        });

        /* Activate the device motion control */
        DeviceMotionControl.handleMotionEvent(Game.step.bind(Game));

        /* The game is running now */
        this.status = 'running';
    }

    /*
     * Push the game a step forward, called every time the ball moves
     * @param {Double} motionX; @param {Double} motionY; @param {Double} motionZ; @param {Integer} interval
     */
    function step(motionX, motionY, motionZ, interval){

        var self = this;

        /* Stop if the game is not running */
        if (this.status !== 'running'){
            return;
        }

        /* Check the motion on the z axis */
        if (motionZ > 12){
            var jumpX = 0, jumpY = 0;

            /* Calculate direction to jump */
            if (motionX !== 0) {
                jumpX = motionX < 0 ? -1 : 1;
            }
            if (motionY !== 0) {
                jumpY = motionY < 0 ? -1 : 1;
            }

            /* Make the ball jump */
            Ball.jump(jumpX, jumpY, motionZ);

            return;
        }

        /* Stop if ball is not rolling */
        if (Ball.status !== 'rolling'){
            return;
        }

        /* Calculate the next position of the ball */
        var nextPositionX = Ball.position.x - 0 + motionX,
            nextPositionY = Ball.position.y - 0 + motionY;

        /* Check if the ball reached the target */
        if (Collision.target(nextPositionX, nextPositionY)){
            self.stop();
            self.nextLevel();

            return;
        }

        /* Check if the ball collides with boundaries  */
        var collision = Collision.boundaries(nextPositionX, nextPositionY);
        if (collision) {

            if (collision === 'left' || collision === 'right') {
                if ((motionX < 0 && this.lastMotionX < 0) || (motionX > 0 && this.lastMotionX > 0)) {
                    motionX = 0;
                }
            }
            else if (collision === 'top' || collision === 'bottom') {
                if ((motionY < 0 && this.lastMotionY < 0) || (motionY > 0 && this.lastMotionY > 0)) {
                    motionY = 0;
                }
            }
            else if (collision === 'topleft' || collision === 'topright' || collision === 'bottomleft' || collision === 'bottomright') {
                return;
            }
        }

        /* Make the ball roll at the right speed */
        if (this.speed >= 0) {
            this.speed--;
            window.requestAnimationFrame(function(){
                self.step(motionX, motionY, motionZ, interval);
            });
        }
        else {
            this.speed = interval / 100;
        }

        Ball.roll(motionX, motionY);

        /* Save last motion */
        if (motionX !== 0) {
            this.lastMotionX = motionX;
        }
        if (motionY !== 0) {
            this.lastMotionY = motionY;
        }

    }

    // Pause the game
    // MLF NOTE: this feature will be included in the next version
    function pause(){
        this.status = 'paused';
    }

    // Resume the game
    // MLF NOTE: this feature will be included in the next version
    function resume(){
        var self = this;
        setTimeout(function(){
            self.status = 'running';
        }, 1000);
    }

    // Stop the game
    function stop(){
        this.status = 'stopped';
    }

    // Go to next level
    // MLF NOTE: this feature will be included in the next version
    function nextLevel(){
        Ball.fall(Target.position.x, Target.position.y);

        var self = this;
        window.setTimeout(function(){
            self.level++;
//            self.start();
            window.location = '';
        }, 3000);
    }

    // Remove game pieces from playground
    function clearPlayground(){
        this.playgroundContext.clearRect(0, 0, this.playground.width, this.playground.height);
    }

    // Draw the target/hole in a random position
    function generateTarget(){
        var xPos,
            yPos,
            leftMax = Boundaries.left - 0 + (Boundaries.width / 2) - Target.size,
            leftMin = Boundaries.left - 0 + Target.size,
            topMax = Boundaries.top - 0 + (Boundaries.height / 2) - Target.size,
            topMin = Boundaries.top - 0 + Target.size;

        do {
            xPos = (Math.random() * (leftMax - leftMin)) - 0 + leftMin;
            yPos = (Math.random() * (topMax - topMin)) - 0 + topMin;
        }
        while(Collision.obstacles(xPos, yPos) || Collision.boundaries(xPos, yPos));

        Target.position.x = xPos;
        Target.position.y = yPos;
        Target.draw();
    }

    // Draw the ball in a random position
    function generateBall(){
        Ball.size = Ball.originalSize;

        var xPos,
            yPos,
            leftMax = Boundaries.left - 0 + Boundaries.width - Ball.size,
            leftMin = Boundaries.left - 0 + (Boundaries.width / 2),
            topMax = Boundaries.top - 0 + Boundaries.height - Ball.size,
            topMin = Boundaries.top - 0 + (Boundaries.height / 2);

        do{
            xPos = (Math.random() * (leftMax - leftMin)) - 0 + leftMin;
            yPos = (Math.random() * (topMax - topMin)) - 0 + topMin;
        }
        while(Collision.boundaries(xPos, yPos) || Collision.target(xPos, yPos));

        Ball.position.x = xPos;
        Ball.position.y = yPos;
        Ball.draw();
    }

    return {init:init, start:start, step:step, pause:pause, resume:resume, stop:stop, nextLevel:nextLevel, clearPlayground:clearPlayground, generateTarget:generateTarget, generateBall:generateBall};

  //- Last brackets
  }]);
})();
