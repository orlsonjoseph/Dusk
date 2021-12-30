import Player from "../actors/player/player";
import Cursor from "../utilities/cursor";

import { Catalog } from "../actors/catalog";

// Customized functions
import { Dusk } from "../utilities/fxs";

class Game extends Phaser.Scene {
    constructor() {
        super({ key: "Game" });

        this.level = { name: "dev-block", asset: "tiles", key: null };
        this.listOfEnemies = Catalog.enemies;

        // for debugging purposes, clear localStorage
        localStorage.clear();
    }

    init(data) {

        // Initialize level information
        this.level.init = data;
    }

    create() {
        [this.map, this.tiles] = Dusk.loadTilemap(this, this.level.init.key, {
            name: this.level.name,
            image: this.level.asset
        });

        // Layers from Tiled 
        this.positions = Dusk.readPositions(this, this.map, "Positions");

        this.platforms = Dusk.createPlatformLayer(this.map, this.tiles);
        this.ground = Dusk.createSpecifiedLayer(this.map, this.tiles, "Ground");

        // Setting world & camera bounds
        [this.physics.world, this.cameras.main].forEach((item, i) => {
            item.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        });

        // Compute where player should be positioned
        let spawn = Dusk.computeSpawnPoint(this.level.init, this.positions);
        console.log(spawn);
        // Defining actors & entities
        this.player = new Player(this, spawn.x, spawn.y);

        this.enemies = Dusk.createEnemies(this, this.map, this.listOfEnemies);

        // Definition of colliders
        // Actors & Levels
        this.physics.add.collider(
            [this.player, this.enemies], [this.ground, this.platforms]);

        // Weapon & Enemies
        this.physics.add.overlap(
            this.player.weapon, this.enemies, this.player.weapon.damage, null, this.player.weapon);

        // Player & Doors
        this.physics.add.overlap(
            this.player, this.positions.doors, this.transition, null, this);

        // Define cursors aka game keys
        this.cursors = new Cursor(this);

        // Set camera to follow player
        this.cameras.main.startFollow(this.player, true, 1, 1, -35, 20);

        // Inititate Overlay scene
        this.scene.launch("Overlay");

        // TILE BIAS
        this.physics.world.TILE_BIAS = 8;
    }

    // Transition from current level to door's destination
    transition(player, door) {
        this.scene.stop();

        // Stop updating of scene and scene's children
        this.events.off("update", null, this.player);

        this.scene.start("Game", {
            key: door.destination,
            from: this.level.init.key,

            initial: true, // Boolean flag for death respawns
        });
    }
}

export default Game;