import State from "../../../utilities/state";
import MoveState from "./move";
import AttackState from "./attack";

class JumpState extends State {
    constructor(scene, actor) {
        super(scene, actor);

        this.jump = {
            timer   : 0,
            start   : null,
            height  : -1 * this.actor.data.get("jumpHeight"),

            upperbound  : 20,
            multiplier  : 4
        }
    }

    enter() {
        this.jump.timer = 1;

        if (this.actor.body.onFloor())
            this.actor.setVelocityY(this.jump.height);
    }

    exit() { this.jump.timer = 0; this.actor.stop("fall"); }

    handle(input) {
        this.jump.timer += 1;

        if (input.jump.isDown) {
            if (this.jump.timer < this.jump.upperbound) {
                let velocity = this.jump.height - 
                    (this.jump.timer * this.jump.multiplier);

                this.actor.setVelocityY(velocity);
            }
        }

        // In-house horizontal movement
        // Done this way in order to maintain accuracy of jump.timer
        if (input.left.isDown || input.right.isDown) {
            let direction = input.right.isDown ? true : false;

            MoveState.moveHorizontally(
                direction, false, this.actor.data.get("speed"), this.actor);
        }

        // Air attacks
        if (input.attack.isDown && !this.actor.body.onFloor()) {
            // Only execute air attack if not executing one currently
            let current = this.actor.anims.getName(),
                playing = this.actor.anims.isPlaying;

            if (current.includes("attack") && playing) {;} else {
                AttackState.airAttack(input, this.actor);
            }
        }
    }

    update(time, delta) {
        if (this.actor.body.onFloor())
            this.fsm.change("previous", true);

        // Update animation depending on player velocity
        // Jump for negative velocities and Fall otherwise
        else {
            let animationKey = 
                this.actor.body.velocity.y > 0 ? "fall" : "jump",
                currentAnimation = this.actor.anims.getName();
            
            // If currentAnimation is an attack
            // Skip
            if (currentAnimation.includes("attack") && this.actor.anims.isPlaying) return;

            // Swap between fall & jump
            if (currentAnimation != animationKey) this.actor.play(animationKey);     
        }
    }
}

export default JumpState;