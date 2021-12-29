import Actor from "../../actor";

import DieState from "../states/die";
import StaggerState from "../states/stagger";
import PatrolState from "./../states/patrol";

// Wanderer halts movement when staggered

let STATES = {
    "patrol": PatrolState,
    "stagger": StaggerState,

    "die": DieState
}

let ATTRIBUTES = {
    gravity: 900,

    stagger: { duration: 120, next: "patrol" },
    velocity: { x: 12, y: 0 },

    health: 7,
    power: 1,
}

class Wanderer extends Actor {
    constructor(scene, item, sprite) {
        super(scene, item.x, item.y, sprite ? sprite : "enemy");

        // Define character attributes
        for (var attribute in ATTRIBUTES) {

            this.data.set(attribute, ATTRIBUTES[attribute])
        }

        // Initialize actor states
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