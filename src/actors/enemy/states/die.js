import State from "../../../utilities/state";

class DieState extends State {
    constructor(scene, actor) {
        super(scene, actor);

    }

    enter() {

        // Disable physics body and hide sprite
        this.actor.disableBody(true, true);
    }
}

export default DieState;