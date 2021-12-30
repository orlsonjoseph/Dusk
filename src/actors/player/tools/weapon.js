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

        // Current step collisions
        this.stepHit = [];
    }

    damage(actor, enemy) {
        // Current step collisions to prevent continuous hits
        if (this.stepHit.includes(enemy)) return;

        // Reduce HP
        enemy.damage(this.power);
        enemy.manager.change("stagger", false);

        // Add current enemy to current step collision
        this.stepHit.push(enemy);
    }

    clear() {

        // Clear current step collisions after attack completion
        this.stepHit.length = 0;
    }
}

export default Weapon;