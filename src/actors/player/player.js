import Actor from "../actor";

import IdleState from "./states/idle";
import JumpState from "./states/jump";
import MoveState from "./states/move";
import DodgeState from "./states/dodge";
import AttackState from "./states/attack";
import DashState from "./states/dash";

import Weapon from "./tools/weapon";

let STATES = {
    idle: IdleState,
    jump: JumpState,
    move: MoveState,

    dodge: DodgeState,
    attack: AttackState,

    dash: DashState,
}

let ATTRIBUTES = {
    gravity: 900,

    speed: 80,
    vertical: 77.5,

    dodge: { delay: 540, next: 0 },
    attack: { delay: 240, next: 0 },

    dash: { duration: 150, velocity: 280, coyote: 30, cooldown: 200 },

    life: 5,
    gloom: 17,
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
            jump: false,
            dodge: true,
            attack: true,

            dash: true,
        };

        this.vulnerable = true;

        // Actor weapon
        this.weapon = new Weapon(this.scene, x, y, 16);

        this.manager.initialize();
    }

    update(time, delta) {
        let grounded = this.body.onFloor();

        if (grounded) {
            if (this.allowed.jump == false && this.scene.cursors.jump.isUp)
                this.allowed.jump = true;

            if (this.allowed.refill) this.allowed.dash = true;
        }

        if (!this.allowed.attack &&
            time > this.data.get("attack").next) {
            this.allowed.attack = true;
        }

        this.manager.update(time, delta, this.scene.cursors)
    }
}

export default Player;