class Weapon extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, radius, power) {
        super(scene, x, y, null);

        this.scene = scene;
        this.scene.physics.add.existing(this);

        this
            .setName("Weapon")
            .setVisible(false)
            .setCircle(radius)
            .setCollideWorldBounds(false)
            .disableBody(true, false);

        // Damage dealt by weapon
        this.power = power ? power : 1;
    }

    damage(actor, enemy) {
        // Reduce HP
        enemy.damage(actor.data.get("power"));

        enemy.manager.change("stagger", false);
    }
}

export default Weapon;