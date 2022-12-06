import { Animator } from "./AssetsManagement/Animator.js";
import { Sprite } from "./AssetsManagement/Sprite.js";
import { Collider } from "./Collider.js";
import { toRad, lerp } from "../Constants/GameMath.js";

const GasterBlasterLazerTime = Math.PI / 3;

const GasterBlaster_before = 0;
const GasterBlaster_animation = 1;
const GasterBlaster_after = 2;

class GasterBlaster {
  constructor(obj, x, y, angle, targetX, targetY, targetAngle) {
    this.obj = obj;
    this.ctx = obj.ctx;
    
    this.x = x;
    this.y = y;
    this.angle = angle;

    this.targetX = targetX;
    this.targetY = targetY;
    this.targetAngle = targetAngle;
    
    this.speed = 300;
    this.lazer = null;
    this.rad = null;
    this.alpha = 1;
    this.state = GasterBlaster_before;

    this.setAnimations();
  }

  update() {
    if (this.state == GasterBlaster_before) {
      if (!this.moveToTarget()) {
        this.addLazer();
        this.state++;
      }
    } else { 
      this.moveBack();
      
      if (this.state == GasterBlaster_animation && this.animator.update("gasterBlaster_attack", obj.dt)) {
        this.state++;
      }

      if (this.state == GasterBlaster_after) {
        this.alpha -= this.obj.dt;
        if (this.alpha < 0) {
          return true;
        }
      }

      if (this.lazer && !this.updateLazer()) {
        this.lazer = null;
      }
    }

    return false;
  }

  draw() {
    this.ctx.globalAlpha = this.alpha;
    if (this.state == GasterBlaster_animation) {
      this.drawGasterBlaster();
    } else {
      if (this.state == GasterBlaster_before) {
        this.drawGasterBlasterAttackBefore();
      } else {
        this.drawGasterBlasterAttackAfter();
      }
    }

    if (this.lazer) {
      this.drawLazer();
    }
    this.ctx.globalAlpha = 1;
  }

  check() {
    if (this.lazer) {
      return this.lazer.collider.OBB(this.obj.player.collider)
    }

    return false;
  }

  setAnimations() {
    this.animator = new Animator(this.ctx);
    this.animator.addAnimation("gasterBlaster_attack", 0.06);
  }

  moveToTarget() {
    this.x += lerp(this.x, this.targetX, 0.3 * this.obj.dt);
    this.y += lerp(this.y, this.targetY, 0.3 * this.obj.dt);
    this.angle += lerp(this.angle, this.targetAngle, 0.3 * this.obj.dt);

    const dx = this.x - this.targetX;
    const dy = this.y - this.targetY;
    if (dx * dy < 25) {
      this.rad = (this.angle + 90) * toRad;
      this.x = this.targetX;
      this.y = this.targetY;
      this.angle = this.targetAngle;
      return false;
    }

    return true;
  }

  moveBack() {
    this.x -= Math.cos(this.rad) * this.speed * this.obj.dt;
    this.y -= Math.sin(this.rad) * this.speed * this.obj.dt;
    this.speed += this.obj.dt * 1000;
  }

  drawGasterBlaster() {
    this.animator.playRotation(this.x, this.y, this.angle);
  }

  drawGasterBlasterAttackBefore() {
    Sprite.drawRotation(this.ctx, "gasterBlaster_attackBefore", this.x, this.y, this.angle);
  }

  drawGasterBlasterAttackAfter() {
    Sprite.drawRotation(this.ctx, "gasterBlaster_attackAfter", this.x, this.y, this.angle);
  }

  addLazer() {
    this.lazer = {
      t: 0,
      w: 0,
      l: 10000,
      collider: new Collider(this, 0, 0, 0, 10000)
    }; 
  }

  updateLazer() {
    this.lazer.t += this.obj.dt;
    if (this.lazer.t >= GasterBlasterLazerTime) {
      return false;
    }

    this.lazer.collider.l = this.lazer.collider.r = this.lazer.w = Math.sin(this.t * 3) * 50;
    return true;
  }

  drawLazer() {
    this.ctx.strokeStyle = "white";
    this.ctx.lineWidth = this.lazer.w + this.lazer.w;
    this.ctx.beginPath();
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(this.x + Math.cos(this.rad) * this.l, this.y + Math.sin(this.rad) * this.l);
    this.ctx.stroke();
  }
}

export { GasterBlaster };