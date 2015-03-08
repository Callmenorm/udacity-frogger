// Enemies our player must avoid
var Enemy = function(startX, startY, movementSpeed) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';

  this.speed = movementSpeed || 150 + 100 * Math.random();
  this.x = startX;
  this.y = startY;
};

Enemy.prototype.interactX = function() {
  var beginOffset = 0,
    endOffset = 101;
  return [this.x + beginOffset, this.x + endOffset];
};

Enemy.prototype.interactY = function() {
  return this.y;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.

  this.x = this.x + dt * this.speed;
  if (this.x > canvasWidth) {
    this.x = -100;
    this.speed = Math.random() * 240;
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  var beginx = 0,
    endx = 101,
    beginy = 80,
    endy = 130;
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  ctx.beginPath();
  ctx.moveTo(this.x + beginx, this.y + beginy);
  ctx.lineTo(this.x + endx, this.y + beginy);
  ctx.lineTo(this.x + endx, this.y + endy);
  ctx.lineTo(this.x + beginx, this.y + endy);
  ctx.lineTo(this.x + beginx, this.y + beginy);
  ctx.stroke();
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  this.sprite = 'images/char-horn-girl.png';
  this.moves = [];
  this.possibleX = [0, 101, 202, 303, 404];
  this.possibleY = [-20, 60, 140, 220, 300, 380];
  this.reset();
  // this.x = 100 * Math.floor((Math.random() * 4));
  // this.y = 300 + Math.round(Math.random());
};

Player.prototype.interactX = function() {
  var beginOffset = 5,
    endOffset = 85;
  return [this.possibleX[this.x] + beginOffset, this.possibleX[this.x] + endOffset];
};

Player.prototype.interactY = function() {
  return this.possibleY[this.y];
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.possibleX[this.x], this.possibleY[this.y]);
};

Player.prototype.reset = function() {
  this.x = 1;
  this.y = 4;
};

Player.prototype.update = function(dt) {
  var newX, newY;
  while (this.moves.length > 0) {
    switch (this.moves.pop()) {
      case 'left':
        newX = this.x - 1;
        this.x = Math.max(0, newX);
        break;
      case 'right':
        newX = this.x + 1;
        this.x = Math.min(newX, this.possibleX.length - 1);
        break;
      case 'up':
        newY = this.y - 1;
        this.y = Math.max(newY, 0);
        break;
      case 'down':
        newY = this.y + 1;
        this.y = Math.min(newY, this.possibleY.length - 1);
        break;
    }
  }
};

Player.prototype.won = function() {
  return this.y === 0;
};

Player.prototype.handleInput = function(key) {
  if (!key) {
    return;
  }
  this.moves.push(key);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
var allEnemies = [
  new Enemy(-100, 60), new Enemy(-300, 60),
  new Enemy(-100, 140), new Enemy(-300, 140),
  new Enemy(-100, 220), new Enemy(-300, 220)
];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    32: 'space'
  };
  if (e.keyCode === 32) {
    allEnemies.forEach(function(enemy) {
      console.log(enemy.x + ',' + enemy.y);
    });
    console.log(player.x + ',' + player.y);
  }

  player.handleInput(allowedKeys[e.keyCode]);
});
