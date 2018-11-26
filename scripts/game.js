var GAME_WIDTH = 960;
var GAME_HEIGHT = 720;
var TILE_SIZE = 64;
var BOARD_WIDTH = 10;
var BOARD_HEIGHT = 10;
var INITIAL_X = 160;
var INITIAL_Y = 60;

class FurryMonster {
    constructor () {
        this.MOVE_DISTANCE = TILE_SIZE;
        this.INITIAL_X = 160;
        this.INITIAL_Y = 60;
        this.boardX = 0;
        this.boardY = 0;
        this.dir = "right";
    }
    
    handleKeys (cursors) {
        if (cursors.left.isDown) {
            this.dir = "left";
        } else if (cursors.right.isDown) {
            this.dir = "right";
        } else if (cursors.up.isDown) {
            this.dir = "up";
        } else if (cursors.down.isDown) {
            this.dir = "down";
        }
    }

    setPosition () {
        this.furrySprite.x = this.boardX * this.MOVE_DISTANCE + this.INITIAL_X;
        this.furrySprite.y = this.boardY * this.MOVE_DISTANCE + this.INITIAL_Y;
    }

    move () {
        switch (this.dir) {
            case "right":
                this.boardX++;
                break;
            case "left":
                this.boardX--;
                break;
            case "up":
                this.boardY--;
                break;
            case "down":
                this.boardY++;
                break;
        }
        console.log(this.boardX, this.boardY);
        this.setPosition();
    }
    
};

var furryMonster = new FurryMonster();
var coin = {
    boardX: 0,
    boardY: 0
};

var gameScene = new Phaser.Scene("Game");
var cursors;

gameScene.preload = function () {
    this.load.image('background', '../img/tile.png');
    this.load.spritesheet('furry', '../img/furry.png', {
        frameWidth: TILE_SIZE,
        frameHeight: TILE_SIZE
    });
    this.load.image('coin', '../img/coin.png');
};

gameScene.create = function () {
    var board = this.add.tileSprite(INITIAL_X, INITIAL_Y, TILE_SIZE * BOARD_WIDTH, TILE_SIZE * BOARD_HEIGHT, "background");    
    board.setOrigin(0, 0);
    furryMonster.furrySprite = this.add.sprite(INITIAL_X, INITIAL_Y, 'furry');
    furryMonster.furrySprite.setOrigin(0, 0);
    console.log(furryMonster);
    this.timer = this.time.addEvent({
        delay: 300,                // ms
        callback: furryMonster.move,
        callbackScope: furryMonster,
        loop: true
    });
    cursors = this.input.keyboard.createCursorKeys();
};

gameScene.update = function () {
    furryMonster.handleKeys(cursors);
    if (furryMonster.boardX < 0 || furryMonster.boardX > 9 || furryMonster.boardY < 0 || furryMonster.boardY > 9) {
        this.timer.paused = true;
    }
    
};

var config = {
    type: Phaser.AUTO,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    pixelArt: true,
    scene: gameScene,
    
};

var game = new Phaser.Game(config);


// function move () {
//     furryMonster.furrySprite.x += TILE_SIZE;
// }

