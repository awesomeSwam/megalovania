import { Sprite } from "../AssetsManagement/Sprite.js";
import { gameSpriteSheetData_json } from "../Constants/spriteSheetData.js";
import { toRad } from "../Constants/GameMath.js";
import { DebugMode, Debug } from "../Components/Collider.js";

const vbone_up_w = gameSpriteSheetData_json.vbone.vbone_up[2];
const vbone_up_h = gameSpriteSheetData_json.vbone.vbone_up[3];

const vbone_up_w_half = vbone_up_w / 2;
const vbone_up_h_half = vbone_up_h / 2;

const vbone_down_w = gameSpriteSheetData_json.vbone.vbone_down[2];
const vbone_down_h = gameSpriteSheetData_json.vbone.vbone_down[3];

const vbone_down_w_half = vbone_down_w / 2;
const vbone_down_h_half = vbone_down_h / 2;

class Bone {
  constructor(obj, x, y, length) {
    this.canvas = obj.canvas;
    this.ctx = obj.ctx;
    this.obj = obj;

    this.x = x;
    this.y = y;
    
    this.length = length;
    this.length_half = length / 2;
    this.angle = 0;
  }

  drawVer() {
    Sprite.draw(this.ctx, "vbone_up", this.x, this.y);
    this.ctx.strokeStyle = "white";
    this.ctx.lineWidth = 12;
    this.ctx.beginPath();
    this.ctx.moveTo(this.x + vbone_up_w_half, this.y + vbone_up_h);
    this.ctx.lineTo(this.y + vbone_up_w_half, this.y + vbone_up_h + this.length);
    this.ctx.stroke();
    Sprite.draw(this.ctx, "vbone_down", this.x, this.y + vbone_up_h + this.length);
  }

  drawHor() {
    Sprite.Ddraw(this.ctx, "hbone_up", this.x, this.y);
    this.ctx.strokeStyle = "white";
    this.ctx.lineWidth = 12;
    this.ctx.beginPath();
    this.ctx.moveTo(this.x + vbone_up_h, this.y + vbone_up_w_half);
    this.ctx.lineTo(this.x + vbone_up_h + this.length, this.y + vbone_down_w_half);
    this.ctx.stroke();
    Sprite.Ddraw(this.ctx, "hbone_down", this.x + vbone_up_h + this.length, this.y);
  }

  drawRot() {
    const x = Math.floor(this.x);
    const y = Math.floor(this.y);

    this.ctx.save();
    this.ctx.translate(x, y);
    this.ctx.rotate(this.angle * toRad);
    
    Sprite.draw(this.ctx, "vbone_up", -vbone_up_w_half, -vbone_up_h_half - this.length_half);
    this.ctx.strokeStyle = "white";
    this.ctx.lineWidth = 12;
    this.ctx.beginPath();
    this.ctx.moveTo(0, -this.length_half - 1);
    this.ctx.lineTo(0, this.length_half + 1);
    this.ctx.stroke();
    Sprite.draw(this.ctx, "vbone_down", -vbone_down_w_half, this.length_half);

    this.ctx.restore();
  }
}

const LineBone_direction = {
  "up": 0,
  "down": 1,
  "right": 2,
  "left": 3
};
const LineBone_up = 0;
const LineBone_down = 1;
const LineBone_right = 2;
const LineBone_left = 3;


class LineBone extends Bone {
  constructor(obj, x, y, speed, length, direction) {
    super(obj, x, y, length);
    this.direction = LineBone_direction[direction];
    this.speed = speed;
  }

  update() {
    switch (this.state) {
      case LineBone_up:
        this.y -= this.speed; break;
      case LineBone_down:
        this.y += this.speed; break;
      case LineBone_left:
        this.x -= this.speed; break;
      case LineBone_right:
        this.x += this.speed; break;
      default: break;
    }

    return this.ctx.withinRange(this.x, this.y);
  }

  draw() {
    if (DebugMode) {
      Debug.circle(this.x, this.y);
    }

    switch (this.state) {
      case LineBone_left:
        super.drawHor(this.x, this.y - vbone_up_w_half);
        break;
      case LineBone_right:
        super.drawHor(this.x - vbone_up_h - vbone_down_h - this.length, this.y - vbone_up_w_half);
        break;
      case LineBone_up:
        super.drawVer(this.x - vbone_up_w_half, this.y - vbone_up_h - vbone_down_h - this.length);
        break;
      case LineBone_down:
        super.drawVer(this.x - vbone_up_w_half, this.y);
        break;
      default:
        break;
    }
  }
}

export { Bone, LineBone };