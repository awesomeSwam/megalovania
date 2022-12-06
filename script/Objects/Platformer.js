import { randomInt } from "../Constants/GameMath.js";
import { Collider } from "./Collider.js";
import { heart_size, blue_up_state, blue_down_state, blue_right_state, blue_left_state } from "./Heart.js";

const platformer_width_half = 50;
const platformer_height_half = 10;
const platformer_lineWidth = 4;

class Platformer {
  constructor(obj) {
    this.obj = obj;

    this.player = obj.player;
    this.ctx = obj.ctx;

    this.w = platformer_width_half;
    this.h = platformer_height_half;

    this.x = 200;
    this.y = Math.floor(randomInt(1, 2)) == 1 ? 400 : 550;
    
    this.startX = this.x;
    this.startY = this.y;

    this.endX = 600;
    this.endY = this.y;
    
    this.lerpTime = 2;
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

  checkCollider() { /** only blue heartcollided @param */
    if (this.collision && !this.player.blue_jumping && this.on) {
      this.player.blue_onPlatformer = true;
      this.player.blue_jumping = false;
      this.player.blue_velocity = 0;
      
      if (this.player.blue_state)

      switch (this.player.blue_state) {
        case blue_up_state:
          this.player.y = this.y + this.h + heart_size;
          break;
        case blue_down_state:
          this.player.y = this.y - this.h - heart_size;
          break;
        case blue_left_state:
          this.player.x = this.x + this.w + heart_size;
          break;
        case blue_right_state:
          this.player.x = this.x - this.w - heart_size;
          break;
        default:
          break;
      }
    }

    this.collision = this.collider.AABB(this.player.platformerCollider);

    switch (this.player.blue_state) {
      case blue_up_state:
        this.on = this.y + this.h < this.player.y;
        break;
      case blue_down_state:
        this.on = this.y - this.h > this.player.y;
        break;
      case blue_left_state:
        this.on = this.x - this.w > this.player.x;  
        break;
      case blue_right_state:
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