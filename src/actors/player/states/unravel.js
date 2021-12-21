import State from "../../../utilities/state";

class UnravelState extends State {
    constructor(scene, actor) {
        super(scene, actor);

        // Delay that prevents the state from executing
        // goTo & set within the same delta period
        let infos = actor.data.get("unravel");

        this.delay = {
            cooldown: infos.cooldown,
            probation: infos.delay,

            expiration: infos.expiration,
        };
    }

    enter() {
        let flag = this.actor.unravel.state;

        return flag ? this.getAnchor() : this.setAnchor();
    }

    getAnchor() {
        // Teleport player to point then exit
        let anchor = this.actor.unravel.anchor;

        this.actor.unravel.state = false;
        this.actor.setPosition(anchor.x, anchor.y);
        anchor.setVisible(false);

        // Teleport quality of life settings
        this.actor.setVelocity(0);
        this.actor.body.setAllowGravity(false);

        this.scene.time.delayedCall(180, function() {
            // Resetting Gravity
            this.actor.body.setAllowGravity(true);
        }, null, this);

        // Exiting
        this.setExitConditions(true);
    }

    setAnchor() {
        // Set anchor point then exit
        let position = this.actor.getCenter(),
            anchor = this.actor.unravel.anchor;

        anchor.setPosition(position.x, position.y);
        anchor.setVisible(true);

        this.actor.unravel.state = true;

        // Anchors expires after time
        this.setAnchorExpirationTime();
        this.setExitConditions(false);
    }

    setAnchorExpirationTime() {
        this.scene.time.delayedCall(this.delay.expiration, function() {
            if (this.actor.unravel.state) {

                this.actor.unravel.state = false;
                this.actor.unravel.anchor.setVisible(false);

                this.setExitConditions(true);
            }
        }, null, this);
    }

    setExitConditions(withCooldown) {
        // Define delay depending on 
        // get (with CD) or set (w/ CD but probation)
        let delay =
            withCooldown ? this.delay.cooldown : this.delay.probation;

        // Exit after set duration
        this.actor.allowed.unravel = false;

        this.scene.time.delayedCall(delay, function() {
            this.actor.allowed.unravel = true;

        }, null, this);

        this.fsm.change("previous", true);
    }
}

export default UnravelState;