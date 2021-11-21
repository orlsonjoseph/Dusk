import Phaser from 'phaser';

import Preload from "./scenes/preload.js";
import Game from "./scenes/game.js";

class Dusk extends Phaser.Game {
    constructor () {
        super({
            renderType: Phaser.CANVAS,

            width: 320,
            height: 180,
            
            backgroundColor: 0xfff,

            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH
            },

            antialias: false,
            autoFocus: true,
            autoRound: true,
            disableContextMenu: true,
            expandParent: true,

            fps: {
                min: 30,
                target: 60,
                forceSetTimeOut: true,
                smoothStep: true,
            },

            gameTitle: "Dusk",

            inputMouse: false,
            pixelArt: true,

            physics: {
                default: "arcade",
                arcade: {
                    gravity: {
                      y: 100
                    },
                    debug: true
                }
            },
        });

    this.scene.add("Preload", Preload, false);
    this.scene.add("Game", Game, false);

    this.scene.start("Preload");
    }
}
      
new Dusk();
