import State from "../../../utilities/state";

class MoveState extends State {
    constructor(scene, actor) {
        super(scene, actor);

        this.speed = this.actor.data.get("speed");
    }
    
    enter(direction, invert = false) {
        // direction    : direction of motion
        // invert       : character orientation align with direction?

        this.actor.setVelocityX((direction ? 1 : -1) * this.speed);
        this.actor.flipX = (invert ? direction : !direction);
    }

    exit() {
        // Reset velocity on X-axis upon exiting
        this.actor.setVelocityX(0);
    }

    update(time, delta) {
        // Movement only persists for a frame
        // unless movement keys are held
        this.fsm.change("previous", true);
    }
}

export default MoveState;