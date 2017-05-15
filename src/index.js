// import GameState from 'states/GameState';
// import Preload from 'states/Preload';

// class Game extends Phaser.Game {

// 	constructor() {
// 		super(500, 500, Phaser.AUTO, 'content', null);
// 		this.state.add('Preload', Preload, null);
// 		this.state.add('GameState', GameState, false);
// 		this.state.start('GameState');
// 	}

// }

// new Game();


var game = new Phaser.Game(1200, 800, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {
    //  The second parameter is the URL of the image (relative)
    game.load.image('bone', 'bone.png');

}
let boneSprite;

function create() {
    game.stage.backgroundColor = '#182d3b';
    boneSprite = game.add.sprite(300, 300, 'bone');
    // boneSprite.rotation = 1;
    // boneSprite.anchor.x = 0.5;
    // boneSprite.anchor.y = 0.5;

    console.log(boneSprite)

    // game.physics.arcade.enable(boneSprite);
    boneSprite.inputEnabled = true;
    boneSprite.input.enableDrag(true);

    // boneSprite.body.velocity.x = 150;
}

function update () {
    // boneSprite.rotation += 0.14;

    //  if the sprite is > 8px away from the pointer 
    // if (game.physics.arcade.distanceToPointer(boneSprite, game.input.activePointer) > 8) 
    // {//  move the boneSprite to the pointer , 600 ?
    //     game.physics.arcade.moveToPointer(boneSprite, 9999999);
    // }
    // else //  turn off velocity because we're close enough to the pointer
    // {
    //     boneSprite.body.velocity.set(0);
    // }
}

function render () {
    game.debug.inputInfo(32, 32);
}
