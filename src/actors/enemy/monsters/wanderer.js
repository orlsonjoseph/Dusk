import Actor from "../../actor";
import PatrolState from "./../states/patrol";

let STATES = {
    "patrol": PatrolState,
}

let ATTRIBUTES = {
    gravity: 900,

    velocity: { x: 7, y: 0 },
}

class Wanderer extends Actor {
    constructor(scene, item, sprite) {
        super(scene, item.x, item.y, sprite ? sprite : "enemy");

        // Define character attributes
        for (var attribute in ATTRIBUTES) {

            this.data.set(attribute, ATTRIBUTES[attribute])
        }

        // Initialize player states
        for (var state in STATES) {
            this.manager &&
                this.manager.add(state, new(STATES[state])(scene, this))
        }

        this.setName("Enemy");
        this.manager.initialize("patrol");
    }

    update(time, delta) {

        this.manager.update(time, delta)
    }
}

export default Wanderer;