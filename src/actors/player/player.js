import Actor from "../actor";

import IdleState from "./states/idle";
import JumpState from "./states/jump";
import MoveState from "./states/move";
import DodgeState from "./states/dodge";
import AttackState from "./states/attack";
import UnravelState from "./states/unravel";

import Weapon from "./tools/weapon";
import Anchor from "./tools/anchor";

let STATES = {
    idle: IdleState,
    jump: JumpState,
    move: MoveState,

    dodge: DodgeState,
    attack: AttackState,

    unravel: UnravelState,
}

let ATTRIBUTES = {
    gravity: 590,

    speed: 65.0,
    vertical: 35,

    dodge: { delay: 540, next: 0 },
    attack: { delay: 240, next: 0 },

    unravel: { delay: 540, cooldown: 4096, expiration: 8192 },

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
        this.allowed = {
            jump: true,
            dodge: true,
            attack: true,
            // Controls whether or not manager executes the state
            unravel: true,
        };

        // Controls whether setting or getting anchor
        this.unravel = {
            state: false,

            anchor: new Anchor(this.scene, x, y)
        };

        // Actor weapon
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