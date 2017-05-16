const Hero = class extends Phaser.Sprite {
    constructor(game, x, y, asset, frame, health, bulletSpeed) {
        super(game, x, y, asset, frame);
        this.inputEnabled = true;
        this.input.enableDrag(true);
        this.mode = 'move'
        this.anchor.x = 0.5;
        this.anchor.y = 0.5
        this.range = 100;
        this.scale.x = 0.5
        this.scale.y = 0.5

        this.renderedRange = game.graphics.drawCircle(0, 0, this.range * 2);
    }

    create(){
    }

    update() {  
        this.renderedRange.x = this.x;
        this.renderedRange.y = this.y;

        if (this.mode === 'move') {
            this.y -= 1;
            if (this.checkRangeForUnits(game.enemies)) this.mode = "bone"
            return;
        }
    }

    checkRangeForUnits(unitGroup) {
        let foundUnit = false;
        unitGroup.forEachAlive((unit) => {
            if (this.isInRange(unit)) {
                foundUnit = true;
            }
        })
        return foundUnit;
    }

    isInRange(unit){
        return (game.physics.arcade.distanceBetween(this, unit) < this.range + 30)
    }
}


const Enemy = class extends Phaser.Sprite {
    constructor(game, x, y, asset, frame, health, bulletSpeed) {
        super(game, x, y, asset, frame);
        this.inputEnabled = true;
        this.input.enableDrag(true);
        this.mode = '';
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
        this.scale.setTo(0.125, 0.125);
    }

    create(){
    }

    update() {
        if (this.mode === 'move') {
            this.y -= 1;
            return;
        }

        if (this.mode === 'look') {
            game.heroes.forEachAlive((hero) => {
                // console.log("I can see ", hero.x);
            })
        }

        // console.log("no mode")
    }
}

const Preload = class {
    preload() {
       
    }
    create() {
        this.state.start('GameState');
    }
}

const GameState = class extends Phaser.State {
    init() {
        this.thugometer = 9000
    }
    preload() {
        game.load.image('bone', 'bone.png');
        game.load.image('warrior', 'bonewarrior.png');
        game.load.image('hero', 'hero.png');
        game.stage.backgroundColor = '#182d3b';

    }
    create() {
        // game.boneSprite = createBone(game);
        // game.world.add(new BoneWarrior(game, 300, 300, 'warrior'))

        game.graphics = game.add.graphics(0,0);
        game.graphics.lineStyle(1, 0x00ff00, 1);

        game.heroes = game.add.group();
        game.heroes.add(new Hero(game, 300, 800, 'hero'))
        game.enemies = game.add.group(); 
        game.enemies.add(new Enemy(game, 300, 100, 'warrior'));

    }  
    render() {
        game.debug.inputInfo(32, 32);
    }
    update() {
        // game.boneSprite.y += 1;
    }
}

var game = new Phaser.Game(540, 960, Phaser.AUTO);
game.state.add('GameState', GameState, false);
game.state.start('GameState');




const createBone = (gameObj) => {
    const thug = () => {
        const boneSprite = gameObj.add.sprite(220, 220, 'bone');
        boneSprite.inputEnabled = true;
        boneSprite.input.enableDrag(true);
        return boneSprite
    }
    return thug();
}




// game.state.add('PreloadState', Preload, false);
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

// new Game();

// import Bonethug from 'objects/bonethug';













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
