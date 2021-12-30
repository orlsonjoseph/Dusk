import Door from "../actors/entity/door";

export var Dusk = {

    // Load tilemap with given key and tileset options
    loadTilemap: function(scene, key, tileset) {
        let map = scene.make.tilemap({ key: key }),
            tiles = map.addTilesetImage(tileset.name, tileset.image);

        return [map, tiles];
    },

    // Extract and create specified layer from map
    createSpecifiedLayer: function(map, tiles, key) {
        return map
            .createLayer(key, tiles)
            .setCollisionByExclusion(-1, true);
    },

    // Extract and create platform layer from map
    createPlatformLayer: function(map, tiles) {
        let layer = Dusk.createSpecifiedLayer(map, tiles, "Platforms");

        // Edit collision settings for platforms from sides
        // to only top side
        layer.forEachTile(
            function(tile) {
                tile.canCollide
                    // left - right - up - down
                    &&
                    tile.setCollision(true, true, true, false)
            });

        return layer;
    },

    // TODO
    readPositions: function(scene, map, key) {
        let layer = map.getObjectLayer(key),
            lib = {};

        // Create door group
        lib.doors = scene.physics.add.group();

        layer.objects.forEach((item, i) => {
            switch (item.type) {
                case "door": // Exit doors
                    lib.doors.add(new Door(scene, item));
                    break;

                case "spawn": // Player spawn
                    lib[item.type] = item;
                    break;
            }
        });

        return lib;
    },

    createEnemies: function(scene, map, listOfEnemies) {
        let layer = map.getObjectLayer("Enemies"),
            group = scene.physics.add.group({
                bounceX: 1,
                allowGravity: true,
                collideWorldBounds: true
            });

        // Create object Enemy & add to group
        layer.objects.forEach((item, i) => {
            let type = item.type;

            if (listOfEnemies.hasOwnProperty(type)) {
                var enemy = new(listOfEnemies[type])(group.scene, item);

                group.add(enemy, false);
            }
        })

        // Activate object attributes
        group.getChildren().forEach(function(enemy) {
            let data = enemy.data.getAll();

            enemy
                .setGravityY(data.gravity)
                .setVelocityX(data.velocity.x)
                .setVelocityY(data.velocity.y);
        }, this);

        return group;
    },

    // Compute where player should be spawned
    computeSpawnPoint: function(data, positions) {
        // Rules
        // Spawn point if from = null
        // If initial = false & bench defined => bench
        // If initial = false & bench undefined (spikes death) => spawn
        // Otherwise => door

        if (data.from === null) return positions.spawn;

        // Otherwise, door
        for (const door of positions.doors.getChildren()) {

            if (door.destination == data.from) return door.spawn();
        };
    },

    // Create animation
    createAnimationFromJSON: function(scene, actor, key, options) {
        let game = scene.game;

        options["key"] = key;
        options["frames"] = game.anims.generateFrameNumbers(
            actor.texture.key, {
                start: options.start,
                end: options.end
            });

        actor.anims.create(options);
    },
}