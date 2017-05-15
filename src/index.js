// import GameState from 'states/GameState';
// import Preload from 'states/Preload';

// class Game extends Phaser.Game {

//  constructor() {
//      super(500, 500, Phaser.AUTO, 'content', null);
//      this.state.add('Preload', Preload, null);
//      this.state.add('GameState', GameState, false);
//      this.state.start('GameState');
//  }

// }

// new Game();

// import Bonethug from 'objects/bonethug';

const createBoneThug = (game) => {
    const thug = () => {
        const boneSprite = game.add.sprite(220, 220, 'bone');
        boneSprite.inputEnabled = true;
        boneSprite.input.enableDrag(true);
        return boneSprite
    }
    return thug();
}



const Preload = class {
    preload() {
       
    }
    create() {
        this.state.start('GameState');
    }
}

const GameState = class {
    init() {
        this.thugometer = 9000
    }
    preload() {
        game.load.image('bone', 'bone.png');
    }
    create() {
        game.stage.backgroundColor = '#182d3b';
        game.boneSprite = createBoneThug(game);
    }  
    render() {
        game.debug.inputInfo(32, 32);
    }
    update() {
        game.boneSprite.x += 1;
    }
}

var game = new Phaser.Game(1200, 800, Phaser.AUTO);
// game.state.add('PreloadState', Preload, false);
game.state.add('GameState', GameState, false);
game.state.start('GameState');


// function preload() {
//     game.load.image('bone', 'bone.png');
// }

// function create() {
//     game.stage.backgroundColor = '#182d3b';
//     game.boneSprite = createBoneThug(game);
// }

// function update () {
//     game.boneSprite.x += 1;
// }

// function render () {
//     game.debug.inputInfo(32, 32);
// }



















// import GameState from 'states/GameState';
// import Preload from 'states/Preload';

// class Game extends Phaser.Game {

//  constructor() {
//      super(500, 500, Phaser.AUTO, 'content', null);
//      this.state.add('Preload', Preload, null);
//      this.state.add('GameState', GameState, false);
//      this.state.start('GameState');
//  }

// }
