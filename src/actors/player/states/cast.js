import State from "../../../utilities/state";

class CastState extends State {
    constructor(scene, actor) {
        super(scene, actor);

    }

    // Spells

    // Heal
    // Lock the player into healing state until complete
    // Suffering damage exits the state and does not refund cost

    // Shriek

    handle(input) {

    }
}

export default CastState;