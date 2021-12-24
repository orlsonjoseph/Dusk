import State from "../../../utilities/state";

class MoveState extends State {
    // Static definition to allow access from other states
    // such as jump
    static moveHorizontally(d, i, s, actor) {
        actor.setVelocityX((d ? 1 : -1) * s);

        actor.flipX = (i ? d : !d);
    }

    constructor(scene, actor) {
        super(scene, actor);

        this.speed = this.actor.data.get("speed");

        this.invert = false;
        this.direction = true;
    }

    exit() {
        // Stop horizontal motion
        this.actor.setVelocity(0);
    }

    handle(input) {
        // Movement only persists for a frame
        // unless movement keys are held

        // Update direction variable
        this.direction = input.right.isDown ? true : false;

        if (input.left.isUp && input.right.isUp)
            this.fsm.change("previous", true);

        if (input.jump.isDown) this.fsm.change("jump", true);

        // Change to AttackState if attack pressed
        if (input.attack.isDown && this.actor.allowed.attack)
            this.fsm.change("attack", true);

        // Dodge (only exception for complete boolean)
        if (input.dodge.isDown && this.actor.body.onFloor())
            this.fsm.change("dodge", false);

        // Change to DashState if button pressed
        if (input.dash.isDown && this.actor.allowed.dash)
            this.fsm.change("dash", false);
    }

    update(time, delta) {
        let grounded = this.actor.body.onFloor();

        if (!grounded) this.fsm.change("jump", true);
        MoveState.moveHorizontally(this.direction, this.invert, this.speed, this.actor);
    }
}

export default MoveState;