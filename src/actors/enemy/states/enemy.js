import Actor from "../actor";


let STATES = {

}

let ATTRIBUTES = {

}

class Enemy extends Actor {
    constructor(scene, x, y, sprite) {
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

        this.manager.initialize();
    }

    update(time, delta) {

        this.manager.update(time, delta, this.scene.cursors)
    }
}

export default Enemy;