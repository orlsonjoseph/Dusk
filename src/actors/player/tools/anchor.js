class Anchor extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "anchor");

        this.scene = scene;
        this.scene.add.existing(this);

        this
            .setName("Anchor")
            .setVisible(false);
    }
}

export default Anchor;