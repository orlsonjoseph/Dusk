import State from "../../../utilities/state";

class IdleState extends State {
    constructor(scene, actor) {
        super(scene, actor);

    }
    
    handle(input) {
        // Change to JumpState if jump is pressed
        if (input.jump.isDown) this.fsm.change("jump", false);

        // Change to MoveState if arrow keys are pressed
        // Args is direction of movement: true -> right; false -> left
        if (input.left.isDown || input.right.isDown) {
            let direction = input.right.isDown ? true : false;

            this.fsm.change("move", false, direction);
        }   
    }
}

export default IdleState;