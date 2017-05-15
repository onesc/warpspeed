export default class Bonethug extends Phaser.Sprite {
	constructor(game, x, y, key, frame) {
		super(game, x, y, key, frame);
		game.add.sprite(300, 300, 'bone');
		this.logme();
	}

	update() {
		console.log("bones")
	}
	
	logme() {
		console.log(this, "bone thugged logd himself")
	}
}