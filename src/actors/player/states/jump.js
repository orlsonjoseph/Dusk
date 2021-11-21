import State from "../../../utilities/state";

class JumpState extends State {
    constructor(scene, actor) {
        super(scene, actor);

    }

    enter() {
        this.actor.setVelocityY(-125);
    }

    update() {
        
        if (this.actor.body.onFloor()) this.fsm.change("previous", true);
    }
}

export default JumpState;