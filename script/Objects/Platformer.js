import { Collider } from "../Components/Collider.js";

const platformer_width_half = 50;
const platformer_height_half = 10;
const platformer_lineWidth = 4;

const heart_size = 16;

class Platformer {
  constructor(obj, from_x, from_y, to_x, to_y, t = 4) {
    this.obj = obj;

    this.player = obj.player;
    this.ctx = obj.ctx;

    this.w = platformer_width_half;
    this.h = platformer_height_half;

    this.startX = this.x = from_x;
    this.startY = this.y = from_y;

    this.endX = to_x;
    this.endY = to_y;
    
    this.lerpTime = t;
    this.currentLerpTime = 0;

    this.collider = new Collider(this, this.w, this.w, this.h, this.h);

    this.collision = false;
    this.on = false; 
  }

  update() {
    this.currentLerpTime += this.obj.dt;
    if (this.currentLerpTime > this.lerpTime) {
      this.currentLerpTime = this.lerpTime;
      return true;
    }

    const perc = this.currentLerpTime / this.lerpTime;
    this.x = this.startX + (this.endX - this.startX) * perc;
    this.y = this.startY + (this.endY - this.startY) * perc;

    return false;
  }

  check() {
    if (this.collision && !this.player.blue_jumping && this.on) {
      this.player.blue_onPlatformer = true;
      this.player.blue_jumping = false;
      this.player.blue_velocity = 0;

      switch (this.player.blue_state) {
        case "up":
          this.player.y = this.y + this.h + heart_size;
          break;
        case "down":
          this.player.y = this.y - this.h - heart_size;
          break;
        case "left":
          this.player.x = this.x + this.w + heart_size;
          break;
        case "right":
          this.player.x = this.x - this.w - heart_size;
          break;
        default:
          break;
      }
    }

    this.collision = this.collider.AABB(this.player.platformerCollider);

    switch (this.player.blue_state) {
      case "up":
        this.on = this.y + this.h < this.player.y;
        break;
      case "down":
        this.on = this.y - this.h > this.player.y;
        break;
      case "left":
        this.on = this.x - this.w > this.player.x;  
        break;
      case "right":
        this.on = this.x + this.w < this.player.x;  
       break;
      default:
        break;
    }

    return false;
  }

  draw() {
    this.ctx.strokeStyle = "white";
    this.ctx.lineWidth = platformer_lineWidth;
    this.ctx.beginPath();
    this.ctx.rect(this.x - this.w, this.y - this.h, this.w + this.w, this.h + this.h);
    this.ctx.stroke();
  }
}

export { Platformer };