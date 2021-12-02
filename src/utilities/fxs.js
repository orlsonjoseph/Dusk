
export var Dusk = {

    // Load tilemap with given key and tileset options
    loadTilemap: function (scene, key, tileset) {
        let map = scene.make.tilemap({key: key}),
            tiles = map.addTilesetImage(tileset.name, tileset.image);

        return [map, tiles];
    },

    // Extract and create specified layer from map
    createSpecifiedLayer: function (map, tiles, key) {
        return map
                .createLayer(key, tiles)
                .setCollisionByExclusion(-1, true);
    },

    // Extract and create platform layer from map
    createPlatformLayer: function (map, tiles) {
        let layer = Dusk.createSpecifiedLayer(map, tiles, "Platforms");

        // Edit collision settings for platforms from sides
        // to only top side
        layer.forEachTile(
            function (tile) { tile.canCollide 
                // left - right - up - down
                && tile.setCollision(false, false, true, false)
            });

        return layer;
    },

    // TODO
    readPositions: function (map, key) {
        let layer = map.getObjectLayer(key), lib = {};

        layer.objects.forEach((item, i) => {
            lib[item.name] = item;
        });

        return lib;
    },

    // Create animation
    createAnimationFromJSON: function(scene, actor, key, options) {
        let game = scene.game;
        
        options["key"] = key;
        options["frames"] = game.anims.generateFrameNumbers(
            actor.texture.key, {
                start: options.start, end: options.end});
        
        actor.anims.create(options);
    },
}
