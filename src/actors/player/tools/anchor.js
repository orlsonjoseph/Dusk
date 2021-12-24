class Anchor extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "anchor");

        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this
            .setName("Anchor")
            .setVisible(true)
            .setOrigin(0, 1)
            .body.setAllowGravity(false);
    }
}

export default Anchor;