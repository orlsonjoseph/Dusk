
class Hitbox extends Phaser.GameObjects.Zone {
    constructor(scene, x, y, width, height) {
        super(scene, x, y, width, height);

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this
            .setOrigin(0, 1)
            .setName("Hitbox");
    }
}

export default Hitbox;