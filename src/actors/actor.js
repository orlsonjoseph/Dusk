import Manager from "../utilities/manager";

class Actor extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite);

        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.scene.events.on("update", this.update, this);

        this
            .setOrigin(0, 1)
            .setName("Actor")
            .setCollideWorldBounds(true);
        
        // Define state manager for Actor
        this.manager = new Manager(scene);
    }
}

export default Actor;