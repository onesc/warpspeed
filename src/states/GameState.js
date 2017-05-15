import RainbowText from 'objects/RainbowText';

class GameState extends Phaser.State {

	create() {
		let center = { x: this.game.world.centerX, y: this.game.world.centerY }
		this.background = this.add.tileSprite(0,0, 1200, 800, 'bone');
		let text = new RainbowText(this.game, center.x, center.y, "- phaser -\nwith a sprinkle of\nES6 dust!");
		text.anchor.set(0.5);
	}

}

export default GameState;
