import { Dusk } from "../../../utilities/fxs";
import State from "../../../utilities/state";

class AttackState extends State {
    constructor(scene, actor) {
        super(scene, actor);

        // Delay after which if no combat action
        // animation is reset to 0
        this.inactivityDuration = 720;
    }
    
    enter() {
        // Attacking locks you into place
        if (this.actor.body.onFloor()) this.actor.setVelocityX(0);
        
        let infos = this.actor.data.get("combatAnimation"), key = null,
            currentTime = this.scene.game.getTime();

        if (infos.time == null ||
            currentTime >= (infos.time + this.inactivityDuration)) {
                key = 1
            } else {
                key = (infos.image % 3) + 1
            }
        
        this.actor.data.set("combatAnimation", {
            time: currentTime, image: key
        });
        
        AttackState.hitboxDisplay(
            this.actor, "attack-" + key, this.actor.weapon);
    }

    static hitboxDisplay(actor, animation, weapon) {
        actor.play(animation); weapon.body.enable = true;

        let [x, y] = AttackState.computeOffset(actor);
        Dusk.positionRelativeTo(weapon, actor, {
            horizontal: x, vertical: y
        });

        actor.once("animationcomplete", AttackState.postAttackCleanUp, this.actor);
    }

    // Weapon hitbox offset
    static computeOffset(actor) {
        return [actor.flipX ? 4 : 12, -2]
    }

    static postAttackCleanUp() {
        let fsm = this.manager;
        fsm.change("previous", true);

        this.weapon.body.enable = false;
    }
}

export default AttackState;