import Player from "../actors/player/player";
import Cursor from "../utilities/cursor";
import { Catalog } from "../actors/catalog";

// Customized functions
import { Dusk } from "../utilities/fxs";

class Game extends Phaser.Scene {
    constructor() {
        super({ key: "Game" });

        this.settings = {
            tileset: {
                name: "dev-block",
                asset: "tiles"
            },
        }

        this.listOfEnemies = Catalog.enemies;

        // for debugging purposes, clear localStorage
        localStorage.clear();
    }

    create() {
        [this.map, this.tiles] = Dusk.loadTilemap(this, "map", {
            name: this.settings.tileset.name,
            image: this.settings.tileset.asset
        });

        // Layers from Tiled 
        this.positions = Dusk.readPositions(this.map, "Positions");

        this.platforms = Dusk.createPlatformLayer(this.map, this.tiles);
        this.ground = Dusk.createSpecifiedLayer(this.map, this.tiles, "Ground");

        // Setting world & camera bounds
        [this.physics.world, this.cameras.main].forEach((item, i) => {
            item.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        });

        // Defining actors & entities
        this.player = new Player(
            this, this.positions.player.x, this.positions.player.y);

        this.enemies = Dusk.createEnemies(this, this.map, this.listOfEnemies);

        // Definition of colliders
        this.physics.add.collider(
            [this.player, this.enemies], [this.ground, this.platforms]);

        this.physics.add.overlap(
            this.player.weapon, this.enemies, this.player.weapon.damage, null, this.player.weapon);

        // Define cursors aka game keys
        this.cursors = new Cursor(this);

        // Set camera to follow player
        this.cameras.main.startFollow(this.player, true, 1, 1, -35, 20);

        // Inititate Overlay scene
        this.scene.launch("Overlay");

        // TILE BIAS
        this.physics.world.TILE_BIAS = 8;
    }
}

export default Game;