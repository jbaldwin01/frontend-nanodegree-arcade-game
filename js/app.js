// Y coordinate of paved lane 1
const lane1 = 63;
// Y coordinate of paved lane 2
const lane2 = 146;
// Y coordinate of paved lane 3
const lane3 = 229;
/* Array of y coordinates cooresponding to each of the 
 * 3 paved lanes that the enemies travel on.
 */
const laneList = [lane1, lane2, lane3];
// Minimum y coordinate the player can move to
const minY = -32;
// Maximum y coordinate the player can move to
const maxY = 383;
// Minimum x coordinate the player can move to
const minX = 0;
// Maximum x coordinate the player can move to
const maxX = 404;
// X coordinate of the right boundary of the game canvas
const rightBoundary = 505;
// Left/right increment
const horizontalIncrement = 101;
// Up/down increment
const verticleIncrement = 83;

/* The Enemy class represents objects the
 * player must avoid.
 */
class Enemy {
    constructor(x = -101, y = 63, s = 150) {
        this.startPosition = x;
        this.x = x;
        this.y = y;
        this.speed = s;
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
        this.height = 70;
        this.width = 70;
    }

    /* Update the enemy's position, required method for game.
     * Parameter: dt, a time delta between ticks
     */
    update(dt) {
        /* Multiply the movement by the dt parameter
         * to ensure the game runs at the same speed for
         * all computers.
         */
        this.x+= this.speed * dt;
        //reset enemy starting location after it moves off screen
        if(this.x > rightBoundary) {
            this.x = this.startPosition;
            //randomly assign paved lane 1, 2 or 3 for the enemies next pass
            this.y = laneList[Math.floor(Math.random() * allEnemies.length)];
        }
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

/* 
 * The Rock class is a subclass of Enemy
 */
class Rock extends Enemy {
    constructor(x = -101, y = 63, s = 150) {
        super(x, y, s);
        this.sprite = 'images/Rock.png';
    }
}

/* The Player class represents the object the user controls. 
 * This class requires an update(), render() and handleInput() method.
 */
class Player {
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.startX = 202;
        this.startY = 383;
        this.x  = 202;
        this.y = 383;
        this.height = 70;
        this.width = 70;
    }

    /* Evaluates which arrow key was pressed and moves the 
     * player object accordingly.
     */
    handleInput(keyText) {
        switch (keyText) {
            case 'up':
                this.moveUp();
                break;
            case 'down':
                this.moveDown();
                break;
            case 'left':
                this.moveLeft();
                break;
            case 'right':
                this.moveRight();
                break;
        }

    }

    /*
     * Move the player up one position on the grid.
     */
    moveUp() {
        // Prevent the player from moving off the top of the screen.
        if(this.y > minY) {
            this.y -= verticleIncrement;
        }
    }

    /*
     * Move the player down one position on the grid.
     */
    moveDown() {
        // Prevent the player from moving off the bottom of the screen.
        if(this.y < maxY) {
            this.y += verticleIncrement;
        }
    }

    /*
     * Move the player left one position on the grid.
     */
    moveLeft() {
        // Prevent the player from moving off the left side of the screen.
        if(this.x > minX) {
            this.x -= horizontalIncrement;
        }
    }

    /*
     * Move the player right one position on the grid.
     */
    moveRight() {
        // Prevent the player from moving off the right side of the screen.
        if(this.x < maxX) {
            this.x += horizontalIncrement;
        }
    }

    /* Check to see if the player has reached the water and if so
     * reset the player to the starting position.
     */
    update() {
        if(this.reachedWater()) {
            alert("You made it across safely!!!  Click OK to play again.");
            this.reset();
        }
    }

    /*
     * Return true if player has reached the water.
     */
    reachedWater() {
        return this.y === minY ? true : false;
    }

    /* Reset the player's x and y coordinates to the
     * starting position.
     */
    reset() {
        this.x = this.startX;
        this.y = this.startY;
    }

    // Draw the player on the canvas.
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Instantiate objects.
// All enemy objects must be placed in an array called allEnemies.
// The player object must be assigned to a variable called player.
const enemy1 = new Enemy();
const enemy2 = new Enemy(x = -101, y = 146, s = 200);
const enemy3 = new Enemy(x = -101, y = 146, s = 250);
const enemy4 = new Rock(x = -101, y = 229, s = 350);
const allEnemies = [enemy1, enemy2, enemy3, enemy4];
const player = new Player();


/* Listen for key presses and send the key to the
 * Player.handleInput() method.
 */
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
