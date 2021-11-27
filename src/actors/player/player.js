import Actor from "../actor";

import IdleState from "./states/idle";
import JumpState from "./states/jump";
import MoveState from "./states/move";
import AttackState from "./states/attack";

import { animations } from "./animations";

import { Dusk } from "../../utilities/fxs";
import Hitbox from "../../utilities/hitbox";

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

    combatAnimation : {
        image: 0, time: null,
    },
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

        // Define player character weapon
        var width = this.body.width * 3.25, height = this.body.height * 1.25;

        this.weapon = new Hitbox(scene, x, y, width, height);
        this.weapon.body.enable = false; // Disable weapon 
        this.manager.initialize();
    }

    update(time, delta) {

        this.manager.update(time, delta, this.scene.cursors)
    }
}

export default Player;