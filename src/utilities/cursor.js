
class Cursor {
    constructor(scene) {
        return scene.input.keyboard.addKeys({
            left    : "left",
            right   : "right",

            jump    : "space",
        })
    }
}

export default Cursor;