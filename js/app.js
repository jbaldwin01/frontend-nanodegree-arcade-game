/* Array of y coordinates cooresponding to each of the 
 * 3 paved lanes that the enemies travel on.
 */
const laneList = [63, 146, 229];

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
        if(this.x > 505) {
            this.x = this.startPosition;
            //randomly assign y to value for lane 1, 2 or 3
            this.y = laneList[Math.floor(Math.random() * 4)];
        }
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
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

    moveUp() {
        if(this.y > -32) {
            this.y -= 83;
        }
    }

    moveDown() {
        if(this.y < 383) {
            this.y += 83;
        }
    }

    moveLeft() {
        if(this.x > 0) {
            this.x -= 101;
        }
    }

    moveRight() {
        if(this.x < 404) {
            this.x += 101;
        }
    }

    /* Check to see if the player has reached the water and if so
     * reset the player to the starting position.
     */
    update() {
        if(this.y === -32) {
            this.reset();
        }
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
const enemy4 = new Enemy(x = -101, y = 229, s = 350);
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
