
class Preload extends Phaser.Scene {
	constructor() {
        super({key: "Preload"});
    }

	preload() {
        this.load.baseURL = "../src/assets/";

        // load spritesheets
        this.load.spritesheet("player", "spritesheets/player.png",
            {
                frameWidth: 50, frameHeight: 37
            });
            
        // load tilesets
        this.load.image("tiles", "tilesets/sheet.png");

        // load exported Tiles JSON
        this.load.tilemapTiledJSON("map", "tilemaps/level1.json");
	}

	create() {

		this.scene.start("Game");
	}
}

export default Preload;