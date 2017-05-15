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

    //  You can fill the preloader with as many assets as your game requires

    //  Here we are loading an image. The first parameter is the unique
    //  string by which we'll identify the image later in our code.

    //  The second parameter is the URL of the image (relative)
    game.load.image('bone', 'bone.png');

}
let bone;

function create() {

    //  This creates a simple sprite that is using our loaded image and
    //  displays it on-screen
    game.stage.backgroundColor = '#182d3b';
    bone = game.add.sprite(0, 0, 'bone');
    bone.rotation = 1;
    bone.anchor.x = 0.5;
    bone.anchor.y = 0.5;

    console.log(bone)

    game.physics.arcade.enable(bone);
    // bone.body.velocity.x = 150;
}

function update () {

    bone.rotation += 0.14;

    // if left key is down
    // bone.x += 4

    //  If the sprite is > 8px away from the pointer then let's move to it
    if (game.physics.arcade.distanceToPointer(bone, game.input.activePointer) > 8)
    {
        //  Make the object seek to the active pointer (mouse or touch).
        game.physics.arcade.moveToPointer(bone, 600);
    }
    else
    {
        //  Otherwise turn off velocity because we're close enough to the pointer
        bone.body.velocity.set(0);
    }
}

function render () {

    game.debug.inputInfo(32, 32);

}
