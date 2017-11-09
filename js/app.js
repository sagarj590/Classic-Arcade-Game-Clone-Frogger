// Set the Enemy class and a random value to controll moving speed of enemy-bugs.
var Enemy = function(url, x, y, rand) {
    this.x = x;
    this.y = y;
    this.rand = rand;

    // enemy-bugs image file.
    this.sprite = url;
};

// Define this function to update enemies' locations.
// Parameters: dt (Time between two instances) ensures the same moving speed on different computers.
// Set base distance = dt/base
Enemy.prototype.update = function(dt) {
    
    let base = 0.016;
    this.x = (this.x > c.width + 50) ? -50 : Math.floor(this.x + dt/base * this.rand);
};

// Display the enemies on the screen.
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Set the player class.
var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};

// Show the player image on screen.
Player.prototype.render = function() {
    var imgSource = Resources.get(this.sprite);
    if (imgSource) {
        ctx.drawImage(imgSource, this.x, this.y);
    }
};

// Set the event of 'Winning'.
Player.prototype.handleInput = function(key) {
    if (play === true || isWin === true) {
        switch (key) {
            case "left":
                this.x = (this.x == 0) ? this.x : this.x - rowUnit;
                break;
            case "up":
                this.y = (this.y == 0) ? this.y : this.y - colUnit;
                break;
            case "right":
                this.x = (this.x / rowUnit == 4) ? this.x : this.x + rowUnit;
                break;
            case "down":
                this.y  = (this.y / colUnit == 5) ? this.y : this.y + colUnit;
                break;
        }
    }
};

//Set the star variable.
var Star = function(x, y) {
    this.sprite = "images/Star.png";
    this.x = x;
    this.y = y;
};

Star.prototype.render = function() {
    var imgSource = Resources.get(this.sprite);
    if (imgSource) {
        ctx.drawImage(imgSource, this.x, this.y);
    }
};

var play = true, 
    isWin = false; 

// Set the unit consts for calculating (x, y).
const rowUnit = 101,
      colUnit = 75;

// Instanciate enemy-bugs and use random value of speeds for bugs betwwen 1 - 10.
var rand = Math.floor((Math.random() * 10) + 1); 
var enemy1 = new Enemy('images/enemy-bug.png', 0, 1 * colUnit, rand);

rand = Math.floor((Math.random() * 10) + 1); 
var enemy2 = new Enemy('images/enemy-bug1.png', 0, 2 * colUnit, rand);

rand = Math.floor((Math.random() * 10) + 1); 
var enemy3 = new Enemy('images/enemy-bug2.png', 0, 3 * colUnit, rand);

// Create allEnemies array and place all enemy objects in it.
var allEnemies = [enemy1, enemy2, enemy3];

// Set player instance.
var player = new Player(2 * rowUnit, 5 * colUnit);

var star1 = new Star(1 * rowUnit, 2 * colUnit);
var star2 = new Star(3 * rowUnit + 40, 1 * colUnit - 10);
var star3 = new Star(4 * rowUnit - 40, 4 * colUnit + 15);
var star4 = new Star(0 + 40, 4 * colUnit + 15);
var star5 = new Star(-5, 10);
var allStars = [star1, star2, star3, star4, star5];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
