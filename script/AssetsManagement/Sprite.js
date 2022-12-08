import { toRad } from "../Constants/GameMath.js";

const Sprite = {
  sprites: { },
  ctx: null,

  addSprite: function(spriteSheet, sprite, data) {
    this.sprites[sprite] = {
      spriteSheet,
      x: data[0],
      y: data[1],
      w: data[2],
      h: data[3]
    };
  },

  getData: function(sprite) {
    return this.sprites[sprite];
  },

  draw: function(sprite, x, y) {
    const s = Sprite.sprites[sprite];
    x = Math.floor(x);
    y = Math.floor(y);

    this.ctx.drawImage(
      s.spriteSheet,
      s.x, s.y,
      s.w, s.h,
      x, y,
      s.w, s.h
    );
  },

  drawCenter: function(sprite, x, y) {
    const s = this.sprites[sprite];
    x = Math.floor(x) - s.w / 2;
    y = Math.floor(y) - s.h / 2;

    this.ctx.drawImage(
      s.spriteSheet,
      s.x, s.y,
      s.w, s.h,
      x, y,
      s.w, s.h
    );
  },

  drawRotation: function(sprite, x, y, angle) {
    const s = Sprite.sprites[sprite];
    
    this.ctx.save();
    this.ctx.translate(Math.floor(x), Math.floor(y));
    this.ctx.rotate(angle * toRad);
    this.ctx.drawImage(
      s.spriteSheet,
      s.x, s.y,
      s.w, s.h,
      -s.w / 2, -s.h / 2,
      s.w, s.h
    );
    this.ctx.restore();
  }
};

export { Sprite };