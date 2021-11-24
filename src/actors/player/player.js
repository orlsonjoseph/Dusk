import Actor from "../actor";

import IdleState from "./states/idle";
import JumpState from "./states/jump";
import MoveState from "./states/move";
import AttackState from "./states/attack";

import { animations } from "./animations";

import { Dusk } from "../../utilities/fxs";

let STATES = {
    idle: IdleState,
    jump: JumpState,
    move: MoveState,

    attack: AttackState,
}

let ATTRIBUTES = {
    speed   : 70.0,
    gravity : 330,

    jumpHeight  : 55,
}

class Player extends Actor {
    constructor(scene, x, y, sprite = "player") {
        super(scene, x, y, sprite);
        
        // Define character attributes
        for(var attribute in ATTRIBUTES) {

            this.data.set(attribute, ATTRIBUTES[attribute])
        }

        this.data.set("combatAnimation", {time: null, image: 0});

        // Actor object specifications
        this
            .setScale(1)
            .setOffset(20, 8)
            .setBodySize(11, 26, false)
            .setGravityY(this.data.get("gravity"));

        // Manage animations
		for (var key in animations) {
			if (animations.hasOwnProperty(key)) {
                Dusk.createAnimationFromJSON(
                    this.scene, this, key, animations[key]);
			}
		}

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