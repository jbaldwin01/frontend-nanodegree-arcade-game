// Enemies our player must avoid
class Enemy {
    constructor(x = 0, y = 63, s = 100) {
        this.x = x;
        this.y = y;
        this.speed = s;
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
        this.height = 70;
        this.width = 70;
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x+= this.speed * dt;
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.x  = 202;
        this.y = 383;
        this.height = 70;
        this.width = 70;
    }

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

    update() {
        
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const enemy1 = new Enemy();
const enemy2 = new Enemy(x = -101, y = 146, s = 200);
const enemy3 = new Enemy(x = -501, y = 146, s = 250);
const enemy4 = new Enemy(x = -201, y = 229, s = 150);
const allEnemies = [enemy1, enemy2, enemy3, enemy4];
const player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
