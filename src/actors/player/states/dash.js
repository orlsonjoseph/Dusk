import State from "../../../utilities/state";

class DashState extends State {
    constructor(scene, actor) {
        super(scene, actor);

        // Retrieve dash settings information
        this.dash = actor.data.get("dash");
    }

    enter() {
        this.actor.allowed.dash = false;
        this.actor.allowed.refill = false;

        this.actor.body.setAllowGravity(false);

        // Compute direction and increase velocity
        let direction = this.actor.flipX ? -1 : 1;

        this.actor.setVelocityX(this.dash.velocity * direction);
        this.actor.setVelocityY(0);

        // Delay to wait for anchor to move
        this.scene.time.delayedCall(this.dash.duration, function() {
            this.actor.setVelocityX(0);
            this.fsm.change("previous", true);

            this.scene.time.delayedCall(this.dash.coyote, function() {

                this.actor.body.setAllowGravity(true);
            }, null, this);
        }, null, this);

        this.scene.time.delayedCall(this.dash.cooldown, function() {
            this.actor.allowed.refill = true;
        }, null, this);
    }
}

export default DashState;