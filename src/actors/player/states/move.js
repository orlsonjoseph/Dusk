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
        
        this.invert = false;
        this.direction = true;
    }

    enter() { this.actor.play("move") }

    exit() { this.actor.stop("move") }

    handle(input) {
        // Movement only persists for a frame
        // unless movement keys are held
        if (input.left.isUp && input.right.isUp)
            this.fsm.change("previous", true);
        else if (input.jump.isDown) {
            this.fsm.change("jump", true);
        } else {
            // Update direction variable
            this.direction = input.right.isDown ? true : false;
        }
    }

    update(time, delta) {
        // Update function for movement
        MoveState.moveHorizontally(
            this.direction, this.invert, this.speed, this.actor);
    }
}

export default MoveState;