import { Animation } from "../AssetsManagement/Animation.js"
import { Sprite } from "../AssetsManagement/Sprite.js";
import { SpriteSheet } from "../AssetsManagement/SpriteSheet.js";
import { Debugger } from "../Components/Collider.js";
import { KeyListener } from "../Components/KeyListener.js";

const Game = {
  canvas: null,
  ctx: null,
  obj: {},

  load: function(canvasID) {
    this.canvas = document.getElementById(canvasID);
    this.ctx = this.canvas.getContext("2d");

    KeyListener.listenKeyEvent();
    Animation.ctx = this.ctx;
    Sprite.ctx = this.ctx;
    Debugger.ctx = this.ctx;
    SpriteSheet.load();

    this.battleBox;
    this.player;

    this.ctx.withinRange = (x, y) => (-200 > x || x > this.canvas.width + 200 || -200 > y || y > 960 + 200);
    this.obj = {
      canvas: this.canvas,
      ctx: this.ctx,
      dt: 0,

      battleBox: this.battleBox,
      player: this.player
    };
  },

  start: function() {

  }
}

export { Game };