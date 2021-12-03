import Actor from "../actor";

import IdleState from "./states/idle";
import JumpState from "./states/jump";
import MoveState from "./states/move";
import DashState from "./states/dash";

let STATES = {
    idle: IdleState,
    jump: JumpState,
    move: MoveState,
    dash: DashState,
}

let ATTRIBUTES = {speed: 70.0, vertical: 25, gravity: 410,
        dash: {delay: 540, next: 0},
    }

class Player extends Actor {
    constructor(scene, x, y, sprite = "player") {
        super(scene, x, y, sprite);
        
        // Define character attributes
        for(var attribute in ATTRIBUTES) {

            this.data.set(attribute, ATTRIBUTES[attribute])
        }

        // Actor object specifications
        this
            .setScale(1)
            .setBodySize(8, 16)
            .setGravityY(this.data.get("gravity"));

        // Initialize player states
        for(var state in STATES) {
            this.manager &&
                this.manager.add(state, new (STATES[state])(scene, this))
        }

        // Flags
        this.allowed = {dash: true, current: 3};

        this.manager.initialize();
    }

    update(time, delta) {
        let grounded = this.body.onFloor();

        if (grounded) {

            this.allowed.dash = true;
        }
        
        this.manager.update(time, delta, this.scene.cursors)
    }
}

export default Player;