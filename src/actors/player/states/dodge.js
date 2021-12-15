import State from "../../../utilities/state";

class DodgeState extends State {
    constructor(scene, actor) {
        super(scene, actor);

        this.dodge = {
            duration: 120,
            end: null,

            velocity: this.actor.data.get("speed") * 3.5
        };
    }

    enter() {
        let infos = this.actor.data.get("dodge"),
            now = this.scene.time.now;

        if ((infos.next > 0 && now < infos.next)) {
            this.fsm.change("previous", true);

            return;
        }

        // Set end time to restore control over to player
        this.dodge.end = now + this.dodge.duration;

        // Compute dodge direction
        let horizontal = this.actor.flipX ? -1 : 1;

        // Perform dodge & disable gravity
        this.actor.setVelocityX(horizontal * this.dodge.velocity);

        // Store new information about dodge
        infos.next = now + infos.delay;
        this.actor.data.set("dodge", infos);
    }

    update(time, delta) {
        if (this.dodge.end && time > this.dodge.end) {

            this.fsm.change("previous", true);
        }
    }
}

export default DodgeState;