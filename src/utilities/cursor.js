
class Cursor {
    constructor(scene) {
        return scene.input.keyboard.addKeys({
            left    : "left",
            right   : "right",

            up      : "up",
            down    : "down",

            jump    : "space",

            attack  : "q",
        })
    }
}

export default Cursor;