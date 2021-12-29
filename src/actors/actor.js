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
            .setCollideWorldBounds(true)
            .setDataEnabled()
            .body.setMaxVelocity(210);

        // Define state manager for Actor
        this.manager = new Manager(scene);
    }

    damage(power) {
        let health = this.data.get("health");
        console.log(Math.min(0, health - power));
        if (health) {
            // Reduce actor health
            this.data.set("health", Math.min(0, health - power));

            // Change to DeathState if 0
            if (this.data.get("health") <= 0) this.manager.change("die", true);
            console.log("health", this.data.getAll());
        }
    }
}

export default Actor;