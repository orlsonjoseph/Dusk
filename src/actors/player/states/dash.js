import State from "../../../utilities/state";

class DashState extends State {
    constructor(scene, actor) {
        super(scene, actor);

        this.dash = {duration: 90, end: null, velocity: 475, push: 30};
    }
    
    enter() {
        let dashInfos = this.actor.data.get("dash"),
            now = this.scene.time.now;

        if ((dashInfos.next > 0 && now < dashInfos.next) ||
                (this.actor.allowed.dash == false)) {
            this.fsm.change("previous", true);

            return;
        }

        // Set end time to restore control over to player
        this.dash.end = now + this.dash.duration;

        // Compute dash direction
        let horizontal = this.actor.flipX ? -1 : 1;

        // Perform dash & disable gravity
        this.actor.setVelocity(
            horizontal * this.dash.velocity, - this.dash.push);

        this.actor.body.setAllowGravity(false);

        // Store new information about dash
        dashInfos.next = now + dashInfos.delay;
        this.actor.data.set("dash", dashInfos);
    }

    exit() {
        this.actor.setVelocity(0);

        this.actor.body.setAllowGravity(true);
        this.actor.allowed.dash = false;
    }

    update(time, delta) {
        if (this.dash.end && time > this.dash.end) {

            this.fsm.change("previous", true);
        }
    }
}

export default DashState;