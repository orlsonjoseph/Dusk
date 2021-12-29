import State from "../../../utilities/state";

class StaggerState extends State {
    constructor(scene, actor) {
        super(scene, actor);

        this.duration = actor.data.get("stagger").duration;
    }

    enter() {
        this.actor.setVelocity(0).body.setAllowGravity(false);
        this.actor.setTintFill(0xffffff);

        this.scene.time.delayedCall(this.duration, function() {
            let next = this.actor.data.get("stagger").next;

            this.actor.clearTint().body.setAllowGravity(true);
            this.fsm.change(next, true);
        }, null, this);
    }
}

export default StaggerState;