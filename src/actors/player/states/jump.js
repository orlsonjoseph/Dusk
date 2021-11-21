import State from "../../../utilities/state";

class JumpState extends State {
    constructor(scene, actor) {
        super(scene, actor);

        this.jumpHeight = -1 * this.actor.data.get("jumpHeight");
    }

    enter() {

        this.actor.setVelocityY(this.jumpHeight);
    }

    update() {
        
        if (this.actor.body.onFloor()) this.fsm.change("previous", true);
    }
}

export default JumpState;