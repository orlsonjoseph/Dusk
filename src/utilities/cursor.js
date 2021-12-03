
class Cursor {
    constructor(scene) {
        return scene.input.keyboard.addKeys({
            left    : "left",
            right   : "right",

            jump    : "up",
            
            dash    : "space",
        })
    }
}

export default Cursor;