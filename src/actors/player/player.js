import Actor from "../actor";

import IdleState from "./states/idle";
import JumpState from "./states/jump";
import MoveState from "./states/move";
import DodgeState from "./states/dodge";
import AttackState from "./states/attack";

import Weapon from "./weapon";

let STATES = {
    idle: IdleState,
    jump: JumpState,
    move: MoveState,

    dodge: DodgeState,
    attack: AttackState,
}

let ATTRIBUTES = {
    gravity: 590,

    speed: 65.0,
    vertical: 35,

    dodge: { delay: 540, next: 0 },
    attack: { delay: 360, next: 0 },

    health: 100,
    stamina: 100,
}

class Player extends Actor {
    constructor(scene, x, y, sprite = "player") {
        super(scene, x, y, sprite);

        // Define character attributes
        for (var attribute in ATTRIBUTES) {

            this.data.set(attribute, ATTRIBUTES[attribute])
        }

        // Actor object specifications
        this
            .setScale(1)
            .setBodySize(8, 16)
            .setImmovable(true)
            .setGravityY(this.data.get("gravity"));

        // Initialize player states
        for (var state in STATES) {
            this.manager &&
                this.manager.add(state, new(STATES[state])(scene, this))
        }

        // Flags
        this.allowed = { dodge: true, jump: true, attack: true };

        // Weapon
        this.weapon = new Weapon(this.scene, x, y, 16);

        this.manager.initialize();
    }

    update(time, delta) {
        let grounded = this.body.onFloor();

        if (grounded) { this.allowed.jump = true; }
        if (!this.allowed.attack &&
            time > this.data.get("attack").next) {
            this.allowed.attack = true;
        }

        this.manager.update(time, delta, this.scene.cursors)
    }
}

export default Player;