import { Animator } from "../Components/Animator.js";
import { Sprite } from "../AssetsManagement/Sprite.js";
import { Collider } from "../Components/Collider.js";
import { toRad, lerp } from "../Constants/GameMath.js";

const GasterBlasterLazerTime = Math.PI / 3;

const GasterBlaster_before = 0;
const GasterBlaster_animation = 1;
const GasterBlaster_after = 2;

const GasterBlaster_lazer = 5000;

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
        this.animator.initialize("gasterBlaster_attack");
        this.state++;
      }
    } else {
      this.moveBack();
      
      if (this.state == GasterBlaster_animation && this.animator.update(this.obj.dt)) {
        this.state++;
      } else {
        if (!this.lazer && this.animator.idx >= 3) {
          this.addLazer();
        }
      }

      if (this.state == GasterBlaster_after) {
        this.alpha -= this.obj.dt * 1.2;
        if (this.alpha < 0.2) this.alpha = 0.2;
      }

      if (this.lazer && !this.updateLazer()) {
        return true;
      }
    }

    return false;
  }

  draw() {
    this.ctx.globalAlpha = this.alpha;

    if (this.lazer) {
      this.drawLazer();
    }

    if (this.state == GasterBlaster_animation) {
      this.drawGasterBlaster();
    } else {
      if (this.state == GasterBlaster_before) {
        this.drawGasterBlasterAttackBefore();
      } else {
        this.drawGasterBlasterAttackAfter();
      }
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
    this.animator.addAnimation("gasterBlaster_attack", 0.1);
  }

  moveToTarget() {
    this.x = lerp(this.x, this.targetX, 3 * this.obj.dt);
    this.y = lerp(this.y, this.targetY, 3 * this.obj.dt);
    this.angle = lerp(this.angle, this.targetAngle, 3 * this.obj.dt);

    const dx = this.x - this.targetX;
    const dy = this.y - this.targetY;
    if (dx * dx + dy * dy < 25) {
      this.x = this.targetX;
      this.y = this.targetY;
      this.angle = this.targetAngle;
      this.rad = (this.angle + 90) * toRad;

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
    Sprite.drawRotation("gasterBlaster_attackBefore", this.x, this.y, this.angle);
  }

  drawGasterBlasterAttackAfter() {
    Sprite.drawRotation("gasterBlaster_attackAfter", this.x, this.y, this.angle);
  }

  addLazer() {
    this.lazer = {
      t: 0,
      w: 0,
      collider: new Collider(this, 0, 0, 0, GasterBlaster_lazer)
    }; 
  }

  updateLazer() {
    this.lazer.t += this.obj.dt;

    if (this.lazer.t >= GasterBlasterLazerTime) {
      return false;
    }

    this.lazer.collider.l = this.lazer.collider.r = this.lazer.w = Math.cos(this.lazer.t * 1.5) * 80;
    return true;
  }

  drawLazer() {
    if (this.lazer.w < 3) return ;

    this.drawLine(120, this.lazer.w);
    this.drawLine(100, this.lazer.w * 0.7);
    this.drawLine(80, this.lazer.w * 0.4);
  }

  drawLine(step, width) {
    this.ctx.strokeStyle = "white";
    this.ctx.lineWidth = width + width;
    this.ctx.beginPath();
    this.ctx.moveTo(this.x + Math.cos(this.rad) * step, this.y + Math.sin(this.rad) * step);
    this.ctx.lineTo(this.x + Math.cos(this.rad) * GasterBlaster_lazer, this.y + Math.sin(this.rad) * GasterBlaster_lazer);
    this.ctx.stroke();
  }
}

export { GasterBlaster };