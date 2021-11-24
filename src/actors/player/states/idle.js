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
        // Args is direction of movement: true -> right; false -> left
        if (input.left.isDown || input.right.isDown) {

            this.fsm.change("move", false);
        }

        // Change to AttackState
        if (input.attack.isDown) this.fsm.change("attack", false);
    }

    update(time, delta) {
        // No animation currently playing; queue idle
        if (!this.actor.anims.isPlaying) this.actor.play("idle");

        // If not on platform; fall
        if (!this.actor.body.onFloor()) this.fsm.change("jump", false);
    }
}

export default IdleState;