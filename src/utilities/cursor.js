class Cursor {
    constructor(scene) {
        return scene.input.keyboard.addKeys({
            up: "up",
            down: "down",
            left: "left",
            right: "right",

            jump: "Z",
            attack: "X",
            dodge: "C",
            unravel: "V",
        })
    }
}

export default Cursor;