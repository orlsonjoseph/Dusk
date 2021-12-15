import State from "../../../utilities/state";

class AttackState extends State {
    constructor(scene, actor) {
        super(scene, actor);

        this.attack = {
            duration: 150,

            direction: null,
            incomplete: false,

            offset: 12,
        }
    }

    enter() {
        // Reset velocity on X-axis upon entering
        this.actor.setVelocityX(0);

        // Set completed flag
        this.attack.incomplete = true;

        // Exit after set duration
        this.scene.time.delayedCall(this.attack.duration, function() {
            this.actor.weapon.disableBody(true, false);

            this.fsm.change("previous", true);
        }, null, this);
    }

    handle(input) {
        // Execute only if not completed
        if (this.attack.incomplete) {

            // Default attack direction
            this.attack.direction = this.actor.flipX ? "left" : "right";

            // Compute alternative attack direction
            if (input.up.isDown) this.attack.direction = "up";
            else if (input.down.isDown) this.attack.direction = "down";

            // Compute weapon offsets
            let offsets = null;

            switch (this.attack.direction) {
                case "up":
                    offsets = { x: 0, y: -this.attack.offset };
                    break;

                case "down":
                    offsets = { x: 0, y: this.attack.offset };
                    break;

                case "left":
                    offsets = { x: -this.attack.offset, y: 0 };
                    break;

                default: // default is right
                    offsets = { x: this.attack.offset, y: 0 };
            }

            // Position weapon zone
            let center = this.actor.getCenter(),
                x = center.x + offsets.x,
                y = center.y + offsets.y;

            this.actor.weapon.enableBody(true, x, y, true, false);

            // Completed Attack State (delay for animation)
            this.attack.incomplete = false;
        }
    }
}

export default AttackState;