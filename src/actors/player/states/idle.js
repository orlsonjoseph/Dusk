import State from "../../../utilities/state";

class IdleState extends State {
    constructor(scene, actor) {
        super(scene, actor);

    }
    
    handle(input) {

        if (input.jump.isDown) this.fsm.change("jump", false);
    }
}

export default IdleState;