import Actor from "../actor";
import IdleState from "./states/idle";
import JumpState from "./states/jump";

let STATES = {
    idle: IdleState,
    jump: JumpState
}

class Player extends Actor {
    constructor(scene, x, y, sprite = "player") {
        super(scene, x, y, sprite);

        this.setScale(1);
        
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