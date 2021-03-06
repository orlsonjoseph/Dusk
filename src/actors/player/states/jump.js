import State from "../../../utilities/state";
import MoveState from "./move";

class JumpState extends State {
    constructor(scene, actor) {
        super(scene, actor);

        this.jump = {
            timer: 0,
            start: null,
            upperbound: 18,
            multiplier: 3.25,
            height: -1 * this.actor.data.get("vertical")
        }
    }

    enter() {
        this.jump.timer = 1;

        if (this.actor.body.onFloor() && this.actor.allowed.jump)
            this.actor.setVelocityY(this.jump.height);
    }

    exit() { this.jump.timer = 0 }

    handle(input) {
        // Allowed to perform jump
        if (this.actor.allowed.jump == true) {
            this.jump.timer += 1;

            if (input.jump.isDown && this.jump.timer > 0) {
                if (this.jump.timer < this.jump.upperbound) {
                    let velocity = this.jump.height -
                        (this.jump.timer * this.jump.multiplier);

                    this.actor.setVelocityY(velocity);
                }
            }

            // If button released, complete jump
            if (input.jump.isUp) this.jump.timer = this.jump.upperbound;

            // 
            if (this.jump.timer >= this.jump.upperbound)
                this.actor.allowed.jump = false;
        }

        // In-house horizontal movement
        // Done this way in order to maintain accuracy of jump.timer
        if (input.left.isDown || input.right.isDown) {
            let direction = input.right.isDown ? true : false;

            MoveState.moveHorizontally(
                direction, false, this.actor.data.get("speed"), this.actor);
        }

        // Reduce horizontal velocity if key not down
        if (input.left.isUp && input.right.isUp) {
            let velocity = this.actor.body.velocity.x,
                isPositive = velocity > 0;

            if (velocity == 0) {} else {
                let newVelocity = isPositive ? velocity - 0.5 : velocity + 0.5;

                this.actor.setVelocityX(newVelocity);
            }
        }

        // If attack is pressed; execute attack in mid-air
        if (input.attack.isDown && this.actor.allowed.attack)
            this.fsm.change("attack", false);

        // Change to DashState if button pressed
        if (input.dash.isDown && this.actor.allowed.dash)
            this.fsm.change("dash", false);
    }

    update(time, delta) {
        if (this.actor.body.onFloor())
            this.fsm.change("previous", true);
    }
}

export default JumpState;