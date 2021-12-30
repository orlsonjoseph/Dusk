class Overlay extends Phaser.Scene {
    constructor() {
        super({ key: "Overlay" });

    }

    create() {
        // Retrieve Game Scene reference
        this.parent = this.scene.get("Game");

        // Disable input detection
        this.input.keyboard.enabled = false;

        // Define text-based resources
        ["health", "gloom"].forEach((item, i) => {
            let text = [item, this.parent.player.data.get(item)].join(": ");

            this[item] = this.add.text(8, 8 * i, text, { fontSize: "8px" });

            this.parent.events.on(item, function(actor) {
                let text = [item, actor[item]].join(": ");

                this[item].setText(text);
            }, this);
        });
    }
}

export default Overlay;