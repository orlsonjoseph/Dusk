
class State {
    constructor(scene, actor) {
        this.scene = scene;

        // Owner of current state 
        this.actor = actor;

        // Manager of actor's states
        this.fsm = this.actor.manager;

        this.name = "undefined";
    }

    // Execute upon entering state
    enter() {}

    // Execute prior to exiting state
    exit() {}

    // Handles input for state
    handle(input) {}
    
    // Propagates update loop
    update(time, delta) {}
}

export default State;