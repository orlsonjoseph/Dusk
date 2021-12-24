class Cursor {
    constructor(scene) {
        return scene.input.keyboard.addKeys({
            up: "up",
            down: "down",
            left: "left",
            right: "right",

            jump: "Z",
            attack: "X",
            dash: "C",

            cast: "A",
            dodge: "S",
        })
    }
}

export default Cursor;