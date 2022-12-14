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
      length: reverse ? -data[4] : data[4],
      reverse
    };
  },

  draw: function(animation, x, y, idx) {
    const a = this.animations[animation];
    if (a.reverse) idx = a.length - idx - 1;
    
    this.ctx.drawImage(
      a.spriteSheet,
      a.x + a.w * idx, a.y,
      a.w, a.h,
      x, y,
      a.w, a.h
    );
  },

  drawCenter: function(animation, x, y, idx) {
    const a = this.animations[animation];
    if (a.reverse) idx = a.length - idx - 1;
    
    this.ctx.drawImage(
      a.spriteSheet,
      a.x + a.w * idx, a.y,
      a.w, a.h,
      x - a.w / 2, y - a.h / 2,
      a.w, a.h
    );
  },

  drawRotation: function(animation, x, y, angle, idx) {
    const a = Animation.animations[animation];
    if (a.reverse) idx = a.length - idx - 1;

    this.ctx.save();
    this.ctx.translate(x, y);
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