import { NONE } from "phaser";
import State from "../../../utilities/state";
import MoveState from "./move";

class JumpState extends State {
    constructor(scene, actor) {
        super(scene, actor);

        this.jump = {
            timer: 0, start: null, upperbound: 18, multiplier: 6.45,
            height: -1 * this.actor.data.get("vertical")}
    }

    enter() {
        this.jump.timer = 1;

        if (this.actor.body.onFloor())
            this.actor.setVelocityY(this.jump.height);
    }

    exit() { this.jump.timer = 0 }

    handle(input) {
        this.jump.timer += 1;

        if (input.jump.isDown && this.jump.timer > 0) {
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
    }

    update(time, delta) {
        if (this.actor.body.onFloor())
            this.fsm.change("previous", true);       
    }
}

export default JumpState;