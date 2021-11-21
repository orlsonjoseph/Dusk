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
				name: "development_tiled_assets", image: "tiles"});
		
		this.platforms = Dusk.createPlatformLayer(this.map, this.tiles);

		// Setting world & camera bounds
		[this.physics.world, this.cameras.main].forEach((item, i) => {

			item.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
		});

		this.player = new Player(this, 50, 50);
		this.physics.add.collider(this.player, this.platforms);

		// Define cursors aka game keys
		this.cursors = new Cursor(this);

		// Set camera to follow player
		this.cameras.main.startFollow(this.player, true, 1, 1, -35, 20);
	}
}

export default Game;