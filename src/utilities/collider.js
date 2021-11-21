
// Handles player 
export function collider(actor, entity) {

    switch(entity.name) {

        case "Enemy":
            entity.isAttaking(actor);
            break;

        default:

    }
}