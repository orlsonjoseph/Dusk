import State from "../../../utilities/state";

class MoveState extends State {
    // Static definition to allow access from other states
    // such as jump
    static moveHorizontally(d, i, s, actor) {
        actor.setVelocityX((d? 1 : -1) * s);
    
        actor.flipX = (i ? d: !d);
    }

    constructor(scene, actor) {
        super(scene, actor);

        this.speed = this.actor.data.get("speed");
    }

    enter(direction, invert = false) {
        this.actor.play("move");
        // direction    : direction of motion
        // invert       : character orientation align with direction?
        MoveState.moveHorizontally(direction, invert, this.speed, this.actor);
    }

    exit() { this.actor.stop("move") }

    handle(input) {
        // Movement only persists for a frame
        // unless movement keys are held
        if (input.left.isUp && input.right.isUp)
            this.fsm.change("previous", true);

    }
}

export default MoveState;