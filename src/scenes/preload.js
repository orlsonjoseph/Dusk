class Preload extends Phaser.Scene {
    constructor() {

        super({ key: "Preload" });
    }

    preload() {
        this.load.baseURL = "../src/assets/";

        // load spritesheets
        this.load.image("player", "spritesheets/player.png");
        this.load.image("enemy", "spritesheets/enemy.png");

        // load tilesets
        this.load.image("tiles", "tilesets/dev-block.png");

        // load exported Tiles JSON
        this.load.tilemapTiledJSON("map", "tilemaps/level_test.json");
    }

    create() { this.scene.start("Game") }
}

export default Preload;