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
        this.load.tilemapTiledJSON("0", "tilemaps/level_test.json");
        this.load.tilemapTiledJSON("1", "tilemaps/level.json");
    }

    // Todo (level selection)
    create() {

        this.scene.start("Game", { key: 0, from: null, initial: true })
    }
}

export default Preload;