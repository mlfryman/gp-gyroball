/* jshint boss: true */
(function(){
  'use strict';
  var canvas = document.getElementById('gameCanvas'),
      ctx = canvas.getContext('2d'),
      // img = document.getElementById('ball'),
      // ctx.drawImage(img,10,10),
      ball = {},
      gravity = 0.2,
      bounceFactor = 0.7,
      W = document.documentElement.clientWidth,
      H = document.documentElement.clientHeight - 20; //-20 accounts for iphone availHeight
  // Applying these to the canvas element
  canvas.height = H;
  canvas.width = W;
  // The ball object
  // It will contain the following details
  // 1) Its x and y position
  // 2) Radius and color
  // 3) Velocity vectors
  // 4) the method to draw or paint it on the canvas

  ball = {x: Math.floor(Math.random() * canvas.W + 1),
    y: Math.floor(Math.random() * canvas.H + 1),
    radius: 15,
    color: 'red',
    vx: 0,
    vy: 1,
    draw: function(){
      // Begin drawing the path, using the arc() function to draw the circle.
      // Arc function accepts 6 parameters: x position, y position, radius,
      // start angle, end angle and a boolean for anti-clockwise direction.
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
    }
  };
  // Repaints canvas each frame- helps in keeping the area clean without
  // any repetition mess.
  function clearCanvas(){
    ctx.clearRect(0, 0, W, H);
  }
  // Update the position of the ball
  function update(){
    clearCanvas();
    ball.draw();
    // Adds velocity vectors to its positionball.y += ball.vy;
    // Adds accelerationball.vy += gravity;
    // Rebounds
    if(ball.y + ball.radius > H){
      // First, reposition the ball on top of the floor and then bounce it!
      ball.y = H - ball.radius;
      ball.vy *= -bounceFactor;
      // The bounceFactor variable that we created decides the elasticity or how
      // elastic the collision will be. If it's 1, then the collision will be
      // perfectly elastic. If 0, then it will be inelastic.
    }
  }
  setInterval(update, 1000/60);
})();
