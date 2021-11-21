
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
    enter() {

        this.name && console.log("enter not defined for", this.name);
    }

    // Execute prior to exiting state
    exit() {

        this.name && console.log("exit not defined for", this.name);
    }

    // Handles input for state
    handle(input) {

        this.name && console.log("handle not defined for", this.name);
    }
    
    // Propagates update loop
    update(time, delta) {}
}

export default State;