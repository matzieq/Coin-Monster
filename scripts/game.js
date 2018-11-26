var gameScene = new Phaser.Scene("Game");

gameScene.preload = function () {
    this.load.image('background', '../img/tile.png');
    this.load.spritesheet('furry', '../img/furry.png', {
        frameWidth: 64,
        frameHeight: 64
    });
    this.load.image('coin', '../img/coin.png');
};

gameScene.create = function () {
    var board = this.add.tileSprite(160, 60, 640, 640, "background");    
    board.setOrigin(0, 0);
    var furry = this.add.sprite(160, 60, 'furry');
    furry.setOrigin(0, 0);
};

var config = {
    type: Phaser.AUTO,
    width: 960,
    height: 720,
    pixelArt: true,
    scene: gameScene,
    
};

var game = new Phaser.Game(config);


