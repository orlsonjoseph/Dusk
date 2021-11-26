import State from "../../../utilities/state";

class AttackState extends State {
    constructor(scene, actor) {
        super(scene, actor);

        // Delay after which if no combat action
        // animation is reset to 0
        this.inactivityDuration = 720;
    }
    
    enter() {
        // Solely handles ground attack
        if (this.actor.body.onFloor()) {
            let infos = this.actor.data.get("combatAnimation"), key = null,
            currentTime = this.scene.game.getTime();

            if (infos.time == null ||
                currentTime >= (infos.time + this.inactivityDuration)) {
                    key = 1
                } else {
                    key = (infos.image % 3) + 1
                }
            
            this.actor.data.set("combatAnimation", {time: currentTime, image: key});
            
            this.actor.play("attack-" + key);
            this.actor.once("animationcomplete", function () {
                this.fsm.change("idle", true)
            }, this);
        } 
    }

    static airAttack(input, actor) {
        // Define direction of attack
        let direction = input.up.isDown ? "up" :
            (input.down.isDown ? "down" : "horizontal");
        
        // Play the appropriate animation
        actor.play("air-attack-" + direction);
    }
}

export default AttackState;