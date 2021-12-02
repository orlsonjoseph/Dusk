import State from "../../../utilities/state";

class IdleState extends State {
    constructor(scene, actor) {
        super(scene, actor);

    }
    
    handle(input) {
        // Reset velocity on X-axis upon exiting
        this.actor.setVelocityX(0);

        // Change to JumpState if jump is pressed
        if (input.jump.isDown) this.fsm.change("jump", false);

        // Change to MoveState if arrow keys are pressed
        if (input.left.isDown || input.right.isDown)
            this.fsm.change("move", false);
    }

    update(time, delta) {
        // If not on platform; fall
        if (!this.actor.body.onFloor()) this.fsm.change("jump", false);
    }
}

export default IdleState;