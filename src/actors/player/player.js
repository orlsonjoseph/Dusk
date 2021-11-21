import Actor from "../actor";
import IdleState from "./states/idle";
import JumpState from "./states/jump";
import MoveState from "./states/move";

let STATES = {
    idle: IdleState,
    jump: JumpState,
    move: MoveState
}

let ATTRIBUTES = {
    speed   : 50.0,
    gravity : 250,

    jumpHeight  : 140,
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
            .setGravityY(this.data.get("gravity"));

        // Initialize player states
        for(var state in STATES) {
            this.manager &&
                this.manager.add(state, new (STATES[state])(scene, this))
        }

        this.manager.initialize();
    }

    update(time, delta) {

        this.manager.update(time, delta, this.scene.cursors)
    }
}

export default Player;