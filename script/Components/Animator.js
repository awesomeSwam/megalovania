import { Animation } from "../AssetsManagement/Animation.js";

class Animator {
  constructor(ctx) {
    this.ctx = ctx;
    this.animations = {};

    this.idx = 0;
    this.t = 0;
  }

  addAnimation(animation, speed) {
    this.animations[animation] = {
      animation: Animation.animations[animation],
      speed
    };
  }

  initialize() {
    this.idx = this.t = 0;
  }

  update(animation, dt) {
    const a = this.animations[animation];
    const l = a.animation.length;

    this.t += dt;
    
    if (this.t >= a.speed) {
      this.idx += Math.floor(this.t / a.speed);
      
      this.t %= a.speed;
      if (this.idx >= l) {
        this.idx %= l;
        return true;
      }
    }

    return false;
  }

  play(x, y) {
    Animation.draw(this.animation, x, y, this.idx);
  }

  playCenter(x, y) {
    Animation.playCenter(this.animation, x, y, this.idx);
  }

  playRotation(x, y, angle) {
    Animation.drawRotation(this.animation, x, y, angle, this.idx);
  }
}

export { Animator };