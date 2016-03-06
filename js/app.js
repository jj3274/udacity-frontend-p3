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

// Customizable Constants for Game Setting
var ENEMY_MIN_SPEED = 2, // Enemy Bug's min speed
  ENEMY_MAX_SPEED = 6; // Enemy Bug's max speed
var SCORE_POINT_FOR_REACH_TO_WATER = 10, // score collection point when a player reaches to water
  SCORE_POINT_FOR_GEM_COLLECTION = 2; // score collection point when a player collects a gem
var MIN_NUM_OF_GEMS = 2, // minimum number of gem in the game
  MAX_NUM_OF_GEMS = 8; // maximum number of gem in the game
var NUM_OF_ENEMIES = 3; // number of enemies that will appear at the same time
var COLLIDE_CENTER_OFFSET = 20; // Enemy and Player's Center Hit Offset,
// e.g., if COLLIDE_CENTER_OFFSET = 0, then Enemy's center should exactly match to Player's center coordinate to collide

// Constants Variables
var TILE_HEIGHT = 83; // Tile's Height (Col)
var TILE_WIDTH = 101; // Tile's Width (Row)
var NUM_OF_ROWS = 6, // Num of Rows
  NUM_OF_COLS = 5; // Num of Cols
var ENEMY_Y_OFFSET = -20, // Enemy Bug's Y-coordinate offset for display
  PLAYER_Y_OFFSET = -10; // Player's Y-coordinate offset for display

var PLAYER_IMAGE_SET = [
  'images/char-boy.png',
  'images/char-cat-girl.png',
  'images/char-horn-girl.png',
  'images/char-pink-girl.png',
  'images/char-princess-girl.png'
];
var GEM_IMAGE_SET = [
  'images/Gem Blue.png',
  'images/Gem Green.png',
  'images/Gem Orange.png'
];

/**
 * Enemies our player must avoid
 */
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
  this.speed = Math.floor((Math.random() * (ENEMY_MAX_SPEED - ENEMY_MIN_SPEED)) +
    ENEMY_MIN_SPEED); // speed : 3 ~ 6 col moves / sec
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.col += dt * this.speed;
  if (this.col > NUM_OF_ROWS) {
    this.initNewEnemy();
  }

  if (this.isCollide()) { // Enemy caught the player, reset game
    player.score = 0;
    gameController.init();
  }
};

Enemy.prototype.x = function() {
  return this.col * TILE_WIDTH;
}

Enemy.prototype.y = function() {
  return this.row * TILE_HEIGHT + ENEMY_Y_OFFSET;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x(), this.y());
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.isCollide = function() {
  if (player.row === this.row) { // Player and Enemy are in the same row,
    var playerXCenter = player.x() + TILE_WIDTH / 2;
    var enemyXCenter = this.x() + TILE_WIDTH / 2;

    if ((enemyXCenter - COLLIDE_CENTER_OFFSET) < playerXCenter && // Enemy hits Player's location
      playerXCenter < (enemyXCenter + COLLIDE_CENTER_OFFSET)) {
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
  this.row = 5;
};

Player.prototype.update = function() {

};

Player.prototype.x = function() {
  return this.col * TILE_WIDTH;
};

Player.prototype.y = function() {
  return this.row * TILE_HEIGHT + PLAYER_Y_OFFSET;
};

Player.prototype.render = function() {

  // draw player character
  ctx.drawImage(Resources.get(this.sprite), this.x(), this.y());

  ctx.font = "20px Georgia";
  ctx.clearRect(0, 0, 505, 50); // clear score board and player icon panel

  // draw player icons
  for (var i = 0; i < PLAYER_IMAGE_SET.length; i++) {
    ctx.fillText((i + 1), i * 50 + 120, 35);
    ctx.drawImage(Resources.get(PLAYER_IMAGE_SET[i]), i * 50 + 130, 0, 30, 50);
  }

  // draw current score / highest score
  ctx.fillText("Score: " + this.score, 10, 40);
  ctx.fillText("Highest: " + this.highest, 380, 40);
};

Player.prototype.handleInput = function(key) {
  switch (key) {
    case 'left':
      if (this.col > 0) { // if player's col index > 0
        this.col--;
      } // otherwise, it cannot move off screen
      break;
    case 'right':
      if (this.col < (NUM_OF_COLS - 1)) { // if player's col index < (NUM_OF_COLS - 1)
        this.col++;
      } // otherwise, it cannot move off screen
      break;
    case 'up':
      if (this.row === 1) { // you reach to the water, now reset the player's location
        this.score += SCORE_POINT_FOR_REACH_TO_WATER; // you succeed, gain score
        if (this.highest < this.score) this.highest = this.score;
        gameController.init();
      } else { // otherwise, player can move up
        this.row--;
      }
      break;
    case 'down':
      if (this.row < (NUM_OF_ROWS - 1)) { // if player's row index < (NUM_OF_ROWS - 1)
        this.row++;
      } // otherwise, it cannot move off screen
      break;

    default:
      if ('1' <= key && key <= '5') {
        var playerImageIndex = key - '1';
        this.sprite = PLAYER_IMAGE_SET[playerImageIndex];
      }

      return;
  }

  // Player moved to new tile, so do something for this movement
  gameController.playerMoved();
};

// This is Gem tile class
var Gem = function() {
  var gemImageIndex = Math.floor(Math.random() * GEM_IMAGE_SET.length) // random number: 1, 2, or 3

  this.sprite = GEM_IMAGE_SET[gemImageIndex];
  this.row = Math.floor((Math.random() * 3) + 1); // 1, 2, 3
  this.col = Math.floor(Math.random() * 5); // 0, 1, 2, 3, 4
  this.active = true;
};

Gem.prototype.x = function() {
  return this.col * TILE_WIDTH + TILE_WIDTH / 2 - 15;
};

Gem.prototype.y = function() {
  return this.row * TILE_HEIGHT + TILE_HEIGHT / 2 + 15;
};

Gem.prototype.render = function() {
  if (this.active) {
    ctx.drawImage(Resources.get(this.sprite), this.x(), this.y(), 30, 50);
  }
};

// This is Game Controller class
var GameController = function() {
  this.init();
};

GameController.prototype.init = function() {
  // Init player
  player.initPlayer();

  // Init Gem tiles
  numOfGems = Math.floor((Math.random() * (MAX_NUM_OF_GEMS - MIN_NUM_OF_GEMS +
    1)) + MIN_NUM_OF_GEMS);
  allGems = [];
  for (var i = 0; i < numOfGems; i++) {
    var gem = new Gem();
    allGems.push(gem);
  }
};

/**
 * when a player moves, check if there is a gem that the player can take.
 */
GameController.prototype.playerMoved = function() {
  for (var i = 0; i < allGems.length; i++) {
    if (player.col === allGems[i].col && player.row === allGems[i].row) {
      allGems[i].active = false; // player takes gem in the current tile
      player.score += SCORE_POINT_FOR_GEM_COLLECTION; // add score per the collected gem.
    }
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

Resources.load(PLAYER_IMAGE_SET);
Resources.load(GEM_IMAGE_SET);

var allEnemies = [];

for (var i = 0; i < NUM_OF_ENEMIES; i++) {
  var enemy = new Enemy();
  allEnemies.push(enemy);
}
var player = new Player();

var numOfGems;
var allGems;

var gameController = new GameController();

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
