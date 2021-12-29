import State from "../../../utilities/state";

class DieState extends State {
    constructor(scene, actor) {
        super(scene, actor);

    }

    enter() {

        this.actor.disableBody(true, true);
    }
}

export default DieState;