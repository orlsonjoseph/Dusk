class Weapon extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, radius) {
        super(scene, x, y, null);

        this.scene = scene;
        this.scene.physics.add.existing(this);

        this
            .setName("Weapon")
            .setVisible(false)
            .setCircle(radius)
            .setCollideWorldBounds(false)
            .disableBody(true, false);

        // Origin is center
    }
}

export default Weapon;