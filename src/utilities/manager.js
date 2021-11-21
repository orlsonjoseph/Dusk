import Stack from "./stack";

class Manager {
    constructor(scene) {
        this.scene = scene;

        this.map = {};
        this.stack = new Stack();

        this.current = null;
    }
    
    // Add new state to library
    add(name, state) {
        state.name = name;

        this.map[name] = state;
    }
    
    // Initialize Actor with default state
    initialize(initial = "idle") {
        this.stack.enqueue(this.map[initial]);

        this.current = this.stack.peek();
        this.current.enter()
    }

    // Change current state to the given state name
    change(key, completed, args = null) {
        // Exit the current state
        if (this.current && completed) this.current.exit();

        // If current state not completed
        // Enqueue next w/ dequeuing
        
        if (completed) {
            this.stack.dequeue();

            if (key != "previous") this.stack.enqueue(this.map[key]);
        } else {
            // Not accounting for not completed and call on previous
            // Non completed states only move foward

            this.stack.enqueue(this.map[key]);
        }
        
        this.current = this.stack.peek();
        if (key != "previous") this.current.enter(args);
    }
    
    // Propagates update to current state + inputs
    update(time, delta, input) {
        this.current.update(time, delta);

        this.current.handle(input);
    }
}
  
export default Manager;