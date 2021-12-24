import State from "../../../utilities/state";

class IdleState extends State {
    constructor(scene, actor) {
        super(scene, actor);

    }

    handle(input) {
        // Reset velocity on X-axis upon entering
        this.actor.setVelocityX(0);

        // Change to Dodge state if grounded and button pressed
        if (input.dodge.isDown && this.actor.body.onFloor())
            this.fsm.change("dodge", false);

        // Change to JumpState if jump is pressed
        if (input.jump.isDown && this.actor.allowed.jump)
            this.fsm.change("jump", false);

        // Change to MoveState if arrow keys are pressed
        if (input.left.isDown || input.right.isDown)
            this.fsm.change("move", false);

        // Change to AttackState if attack pressed
        if (input.attack.isDown && this.actor.allowed.attack)
            this.fsm.change("attack", false);

        // Change to DashState if button pressed
        if (input.dash.isDown && this.actor.allowed.dash)
            this.fsm.change("dash", false);
    }

    update(time, delta) {
        let grounded = this.actor.body.onFloor();

        // If not on platform; fall
        if (!grounded) this.fsm.change("jump", false);
    }
}

export default IdleState;