import Player from "../actors/player/player";
import Cursor from "../utilities/cursor";

// Customized functions
import { Dusk } from "../utilities/fxs";

class Game extends Phaser.Scene {
	constructor() {
		super({key: "Game"});

		this.here = null;

		// for debugging purposes, clear localStorage
		localStorage.clear();
	}

	create() {
		[this.map, this.tiles] =
			Dusk.loadTilemap(this, "map", {
				name: "dev-tileset", image: "tiles"});
		
		// Layers from Tiled 
		this.positions = Dusk.readPositions(this.map, "Positions");

		this.platforms = Dusk.createPlatformLayer(this.map, this.tiles);
		this.ground =  Dusk.createSpecifiedLayer(this.map, this.tiles, "Ground");

		// Setting world & camera bounds
		[this.physics.world, this.cameras.main].forEach((item, i) => {
			item.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
		});

		// TODO fall animation not playing
		//		layer reading refactoring
		//		platform fall through

		this.player = new Player(
			this, this.positions.player.x, this.positions.player.y);

		this.physics.add.collider(this.player, [this.ground, this.platforms]);

		// Define cursors aka game keys
		this.cursors = new Cursor(this);

		// Set camera to follow player
		this.cameras.main.startFollow(this.player, true, 1, 1, -35, 20);
	}
}

export default Game;