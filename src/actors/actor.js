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
        let originalHealth = this.data.get("health");

        if (originalHealth) {
            let newHealth = Math.max(0, originalHealth - power);

            // Reduce actor health
            this.data.set("health", newHealth);
            console.log("new", newHealth);
            // Change to DeathState if 0
            if (newHealth <= 0) this.manager.change("die", true);
        }
    }
}

export default Actor;