// Exit doors that connect to different level loads

class Door extends Phaser.GameObjects.Zone {
    constructor(scene, item) {
        super(scene, item.x, item.y, 8, 24);

        this.setOrigin(0, 1);

        this.offset = 12;
        this.side = item.side;

        // Define extra item properties
        item.properties.forEach(element => {
            this[element.name] = element.value;
        });

        this.destination = item.name.split("@")[1];
    }

    spawn() {
        let x, y = null;

        switch (this.side) {
            case "right":
                x = this.x - this.offset;
                y = this.y;
                break;

            case "left":
                x = this.x + this.offset;
                y = this.y;
                break;

                // TOP & BOTTOM cases
        }

        return { x: x, y: y };
    }
}

export default Door;