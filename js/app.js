/**
The Enemy function, which initiates the Enemy by:
- Loading the image by setting this.sprite to the appropriate image in the image folder (already provided)
- Setting the Enemy initial location (you need to implement)
- Setting the Enemy speed (you need to implement)

The update method for the Enemy
- Updates the Enemy location (you need to implement)
- Handles collision with the Player (you need to implement)

- You can add your own Enemy methods as needed

You will also need to implement the Player class, and you can use the Enemy class as an example on how to get started. At minimum you should implement the following:

The Player function, which initiates the Player by:
- Loading the image by setting this.sprite to the appropriate image in the image folder (use the code from the Enemy function as an example on how to do that)
- Setting the Player initial location

- The update method for the Player (can be similar to the one for the Enemy)
- The render method for the Player (use the code from the render method for the Enemy)
- The handleInput method, which should receive user input, allowedKeys (the key which was pressed) and move the player according to that input. In particular:

- Left key should move the player to the left, right key to the right, up should move the player up and down should move the player down.
- Recall that the player cannot move off screen (so you will need to check for that and handle appropriately).
- If the player reaches the water the game should be reset by moving the player back to the initial location (you can write a separate reset Player method to handle that).

- You can add your own Player methods as needed.

Once you have completed implementing the Player and Enemy, you should instantiate them by:

- Creating a new Player object
- Creating several new Enemies objects and placing them in an array called allEnemies
*/
var tileHeight = 83; // Tile's Height (Col)
var tileWidth = 101; // Tile's Width (Row)
var numRows = 6,     // Num of Rows
    numCols = 5;     // Num of Cols
var minSpeed = 2,    // Enemy Bug's min speed
    maxSpeed = 6;    // Enemy Bug's max speed
var enemyYOffset = -20,   // Enemy Bug's Y-coordinate offset for display
    playerYOffset = -10;  // Player's Y-coordinate offset for display
var hitOffset = 20;       // Enemy and Player's Center Hit Offset,
 // e.g., if hitOffset = 0, then Enemy's center should match to Player's center coordinate to hit

var playerImages = [
         'images/char-boy.png',
         'images/char-cat-girl.png',
         'images/char-horn-girl.png',
         'images/char-pink-girl.png',
         'images/char-princess-girl.png'
     ];


// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.initNewEnemy();
};

Enemy.prototype.initNewEnemy = function() {
    this.col = -1;
    this.row = Math.floor((Math.random() * 3) + 1) // random number: 1, 2, or 3
    this.speed = Math.floor((Math.random() * (maxSpeed - minSpeed)) + minSpeed); // speed : 3 ~ 6 col moves / sec
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.col += dt * this.speed;
    if (this.col > numRows) {
      this.initNewEnemy();
    }

    if (this.isHitPlayer()) {
      player.score = 0;
      player.initPlayer();
    }
};

Enemy.prototype.x = function() {
  return this.col * tileWidth;
}

Enemy.prototype.y = function() {
  return this.row * tileHeight + enemyYOffset;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x(), this.y());
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.isHitPlayer = function() {
  if (player.row === this.row) { // Player and Enemy are in the same row,
    var playerXCenter = player.x() + tileWidth / 2;
    var enemyXCenter = this.x() + tileWidth / 2;

    if ((enemyXCenter - hitOffset) < playerXCenter && // Enemy hits Player's location
      playerXCenter < (enemyXCenter + hitOffset)) {
      return true;
    }
  }

  return false;
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  this.sprite = 'images/char-boy.png';
  this.initPlayer();
  this.score = 0;
  this.highest = 0;
};

Player.prototype.initPlayer = function() {
  this.col = 2;
  this.row = 4;
};

Player.prototype.update = function() {

};

Player.prototype.x = function() {
  return this.col * tileWidth;
}

Player.prototype.y = function() {
  return this.row * tileHeight + playerYOffset;
}

Player.prototype.render = function() {
  // draw player character
  ctx.drawImage(Resources.get(this.sprite), this.x(), this.y());

  // draw current score / highest score
  ctx.font="20px Georgia";
  ctx.clearRect(0, 0, 505, 50);

  for (var i = 0; i < playerImages.length; i++) {
    ctx.fillText((i+1), i * 50 + 120, 35);
    ctx.drawImage(Resources.get(playerImages[i]), i * 50 + 130, 0, 30, 50);
  }

  ctx.fillText("Score: " + this.score, 10, 40);
  ctx.fillText("Highest: " + this.highest, 400, 40);
};

Player.prototype.handleInput = function(key) {
  switch (key) {
    case 'left':
      if (this.col > 0) { // if player's col index > 0
        this.col--;
      } // otherwise, it cannot move off screen
      break;
    case 'right':
      if (this.col < (numCols - 1)) { // if player's col index < (numCols - 1)
        this.col++;
      } // otherwise, it cannot move off screen
      break;
    case 'up':
      if (this.row === 1) { // you reach to the water, now reset the player's location
        this.score++; // you succeed, gain score
        if (this.highest < this.score) this.highest = this.score;
        this.initPlayer();
      }
      else { // otherwise, player can move up
        this.row--;
      }
      break;
    case 'down':
      if (this.row < (numRows - 1)) { // if player's row index < (numRows - 1)
        this.row++;
      } // otherwise, it cannot move off screen
      break;

    default:
     if ('1' <= key && key <= '5') {
       var playerImageIndex = key - '1';
       this.sprite = playerImages[playerImageIndex];
     }

  }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

Resources.load([
  'images/char-cat-girl.png',
  'images/char-horn-girl.png',
  'images/char-pink-girl.png',
  'images/char-princess-girl.png'
]);

var numOfEnemies = 3;
var allEnemies = [];

for (var i = 0; i < numOfEnemies; i++) {
  var enemy = new Enemy();
  allEnemies.push(enemy);
}
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        49: '1',
        50: '2',
        51: '3',
        52: '4',
        53: '5'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
