const Hero = class extends Phaser.Sprite {
    constructor(game, x, y, asset, frame, health, bulletSpeed) {
        super(game, x, y, asset, frame);
        
        // phaser api
        this.anchor.x = 0.5;
        this.anchor.y = 0.5
        this.scale.x = 0.5
        this.scale.y = 0.5
        this.inputEnabled = true;
        this.input.enableDrag(true);
        
        // not phaser api
        this.mode = 'move'
        this.fireRate = 1500;
        this.nextFire = 0;
        this.currentTarget = null;
        this.range = 300;
        this.indicateRange = true;
    }

    create() {}

    update() {  
        if (this.indicateRange) {
            if (!this.renderedRange) { 
                this.renderedRange = game.graphics.drawCircle(0, 0, this.range * 2); 
            }

            this.renderedRange.x = this.x;
            this.renderedRange.y = this.y;
        } 

        if (this.mode === 'move') {
            const foundEnemy = this.findUnitInRange(game.enemies);
            if (foundEnemy) { 
                this.currentTarget = foundEnemy;
                this.mode = "attacking"; 
            } else {
                this.y -= 1;    
            }
        }

        if (this.mode === 'attacking') {
            if (this.currentTarget && this.isInRangeOf(this.currentTarget)) { 
                this.fireAt(this.currentTarget)
            } else {
                this.currentTarget = null;
                this.mode = 'move'
            };
        }
    }


    isInRangeOf(unit) {
        return game.physics.arcade.distanceBetween(this, unit) < this.range + 30;
    }

    findUnitInRange(unitGroup) {
        let foundUnit = false;
        unitGroup.forEachAlive((unit) => {
            if (this.isInRangeOf(unit)) {
                foundUnit = unit;
            }
        })
        return foundUnit;
    }

    fireAt(unit){
        const fireball = game.fireballs.getFirstDead();
        if (game.time.now > this.nextFire) {
            this.nextFire = game.time.now + this.fireRate;
            fireball.target = unit;
            fireball.reset(this.x, this.y);
            fireball.scale.setTo(0.03, 0.03)
        }
    }
}


const Enemy = class extends Phaser.Sprite {
    constructor(game, x, y, asset, frame, health, bulletSpeed) {
        super(game, x, y, asset, frame);
        this.inputEnabled = true;
        this.input.enableDrag(true);
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
        this.scale.setTo(0.125, 0.125);
    }

    create(){
    }

    update() {
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
        game.load.image('fireball', 'fireball.png');
        game.stage.backgroundColor = '#182d3b';
        game.stage.disableVisibilityChange = true;
    }
    create() {
        game.projectiles = [];

        game.graphics = game.add.graphics(0,0);
        game.graphics.lineStyle(1, 0x00ff00, 1);

        game.physics.startSystem(Phaser.Physics.ARCADE)

        game.heroes = game.add.group();
        game.heroes.add(new Hero(game, 300, 800, 'hero'))
        game.heroes.physicsBodyType = Phaser.Physics.ARCADE;

        game.enemies = game.add.group(); 
        game.enemies.add(new Enemy(game, 300, 100, 'warrior'));
        game.enemies.add(new Enemy(game, 300, 100, 'warrior'));
        game.enemies.add(new Enemy(game, 300, 100, 'warrior'));
        game.enemies.add(new Enemy(game, 300, 100, 'warrior'));
        game.enemies.physicsBodyType = Phaser.Physics.ARCADE;

        game.fireballs = game.add.group();
        game.fireballs.enableBody = true;
        game.fireballs.physicsBodyType = Phaser.Physics.ARCADE;
        game.projectiles.push(game.fireballs);

        game.fireballs.createMultiple(50, 'fireball');
        game.fireballs.setAll('checkWorldBounds', true);
        game.fireballs.setAll('outOfBoundsKill', true);
        game.fireballs.setAll('anchor.x', 0.5);
        game.fireballs.setAll('anchor.y', 0.5);
    } 

    render() {
        game.debug.inputInfo(32, 32);
    }

    update() {
        game.projectiles.forEach((spriteGroup) => {
            spriteGroup.forEachAlive((projectile) => {
                game.physics.arcade.moveToObject(projectile, projectile.target);
                if (Phaser.Rectangle.intersects(projectile.getBounds(), projectile.target.getBounds())) {
                    projectile.kill();
                }
            })
        })
    }
}

const game = new Phaser.Game(540, 960, Phaser.AUTO);
game.state.add('GameState', GameState, false);
game.state.start('GameState');
