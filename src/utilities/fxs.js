
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
    }
}
