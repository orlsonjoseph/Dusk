import State from "../../../utilities/state";

// Patrol on Ground || Platforms

class PatrolState extends State {
    constructor(scene, actor) {
        super(scene, actor);

        this.velocity = actor.data.get("velocity");
    }

    update(time, delta) {
        let flag = !PatrolState.checkFloorContinuation(this.actor, this.scene, "Platforms") &&
            !PatrolState.checkFloorContinuation(this.actor, this.scene, "Ground");

        if (flag) this.actor.toggleFlipX().setVelocityX(
            (this.actor.flipX ? -1 : 1) * this.velocity.x);

    }

    // Static functions

    static checkFloorContinuation(actor, scene, layer) {
        let position = actor.getCenter(),
            unit = 8,

            x = position.x + (actor.flipX ? -1 : 1) * unit,
            y = position.y + unit;

        return scene.map.getTileAtWorldXY(x, y, false, null, layer) ? true : false;
    }
}

export default PatrolState;