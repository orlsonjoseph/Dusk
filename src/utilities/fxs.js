
export var Dusk = {

    // Load tilemap with given key and tileset options
    loadTilemap: function (scene, key, tileset) {
        let map = scene.make.tilemap({key: key}),
            tiles = map.addTilesetImage(tileset.name, tileset.image);

        return [map, tiles];
    },

    // Extract and create platform layer from map
    createPlatformLayer: function (map, tiles, key="platforms",) {
        return map
                .createLayer(key, tiles)
                .setCollisionByExclusion(-1, true);
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
