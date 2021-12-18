import State from "../../../utilities/state";

class AttackState extends State {
    constructor(scene, actor) {
        super(scene, actor);

        this.attack = {
            duration: 60,

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
        // Relay to static method
        AttackState.attack(this, input);
    }

    static attack(state, input) {
        // Execute only if not completed
        if (state.attack.incomplete) {
            console.log("attacking");
            // Default attack direction
            state.attack.direction = state.actor.flipX ? "left" : "right";

            // Compute alternative attack direction
            if (input.up.isDown) state.attack.direction = "up";
            else if (input.down.isDown) state.attack.direction = "down";

            // Compute weapon offsets
            let offsets = null;

            switch (state.attack.direction) {
                case "up":
                    offsets = { x: 0, y: -state.attack.offset };
                    break;

                case "down":
                    offsets = { x: 0, y: state.attack.offset };
                    break;

                case "left":
                    offsets = { x: -state.attack.offset, y: 0 };
                    break;

                default: // default is right
                    offsets = { x: state.attack.offset, y: 0 };
            }

            // Position weapon zone
            let center = state.actor.getCenter(),
                x = center.x + offsets.x,
                y = center.y + offsets.y;

            state.actor.weapon.enableBody(true, x, y, true, false);

            // Completed Attack State (delay for animation)
            state.attack.incomplete = false;
        }
    }
}

export default AttackState;