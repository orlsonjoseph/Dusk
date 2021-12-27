import Enemy from "./enemy/enemy";
import Wanderer from "./enemy/monsters/wanderer";

export var Catalog = {
    enemies: {
        default: Enemy,

        wanderer: Wanderer,
    }
}