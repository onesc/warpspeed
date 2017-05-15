class Preload extends Phaser.State {

	preload() {
		this.load.image('bone', 'bone.png');
	}

	create(){
    	this.state.start('Game');
	}

}

export default Preload;