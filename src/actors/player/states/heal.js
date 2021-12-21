import State from "../../../utilities/state";

class HealState extends State {
    constructor(scene, actor) {
        super(scene, actor);

    }

    handle(input) {
        // Lock the player into healing state until complete
        // Suffering damage exits the state and does not refund cost
    }
}

export default HealState;