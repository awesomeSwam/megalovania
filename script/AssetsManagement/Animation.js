import { toRad } from "../Constants/GameMath.js";

const Animation = {
  animations: { },
  ctx: null,

  addAnimation: function(spriteSheet, animation, data, reverse = false) {
    this.animations[animation] = {
      spriteSheet,
      x: data[0],
      y: data[1],
      w: data[2],
      h: data[3],
      length: data[4],
      reverse
    };
  },

  draw: function(animation, x, y, idx) {
    if (a.reverse) idx = a.length - idx - 1;
    const a = this.animations[animation];
    x = Math.floor(x) - a.w / 2;
    y = Math.floor(y) - a.h / 2;
    
    this.ctx.drawImage(
      a.spriteSheet,
      a.x + a.w * idx, a.y,
      a.w, a.h,
      x, y,
      a.w, a.h
    );
  },

  drawCenter: function(animation, x, y, idx) {
    if (a.reverse) idx = a.length - idx - 1;
    const a = this.animations[animation];
    x = Math.floor(x);
    y = Math.floor(y);
  
    this.ctx.drawImage(
      a.spriteSheet,
      a.x + a.w * idx, a.y,
      a.w, a.h,
      x, y,
      a.w, a.h
    );
  },

  drawRotation: function(animation, x, y, angle, idx) {
    if (a.reverse) idx = a.length - idx - 1;
    const a = Animation.animations[animation];

    this.ctx.save();
    this.ctx.translate(Math.floor(x), Math.floor(y));
    this.ctx.rotate(angle * toRad);
    this.ctx.drawImage(
      a.spriteSheet,
      a.x + a.w * idx, a.y,
      a.w, a.h,
      -a.w / 2, -a.h / 2,
      a.w, a.h
    );
    this.ctx.restore();
  }
}

export  { Animation };