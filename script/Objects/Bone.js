import { Sprite } from "../AssetsManagement/Sprite.js";
import { gameSpriteSheetData_json } from "../Constants/spriteSheetData.js";
import { toRad } from "../Constants/GameMath.js";
import { Debugger, Collider } from "../Components/Collider.js";

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

  drawVer(x, y) {
    Sprite.draw("vbone_up", x, y);
    this.ctx.strokeStyle = "white";
    this.ctx.lineWidth = 12;
    this.ctx.beginPath();
    this.ctx.moveTo(x + vbone_up_w_half, y + vbone_up_h - 1);
    this.ctx.lineTo(x + vbone_up_w_half, y + vbone_up_h + this.length + 1);
    this.ctx.stroke();
    Sprite.draw("vbone_down", x, y + vbone_up_h + this.length);
  }

  drawHor(x, y) {
    Sprite.draw("hbone_up", x, y);
    this.ctx.strokeStyle = "white";
    this.ctx.lineWidth = 12;
    this.ctx.beginPath();
    this.ctx.moveTo(x + vbone_up_h - 1, y + vbone_up_w_half);
    this.ctx.lineTo(x + vbone_up_h + this.length + 1, y + vbone_up_w_half);
    this.ctx.stroke();
    Sprite.draw("hbone_down", x + vbone_up_h + this.length, y);
  }

  drawRot(x, y, angle) {
    this.ctx.save();
    this.ctx.translate(Math.floor(x), Math.floor(y));
    this.ctx.rotate(angle * toRad);
    
    Sprite.draw("vbone_up", -vbone_up_w_half, -vbone_up_h_half - this.length_half);
    this.ctx.strokeStyle = "white";
    this.ctx.lineWidth = 12;
    this.ctx.beginPath();
    this.ctx.moveTo(0, -this.length_half - 1);
    this.ctx.lineTo(0, this.length_half + 1);
    this.ctx.stroke();
    Sprite.draw("vbone_down", -vbone_down_w_half, this.length_half);

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
    this.player = obj.player;
    this.speed = speed;
    
    const l = length + vbone_up_h + vbone_up_h - 4;

    switch (this.direction) {
      case LineBone_down:
        this.collider = new Collider(this, 6, 6, -4, l);
        break;
      case LineBone_up:
        this.collider = new Collider(this, 6, 6, l, -4);
        break;
      case LineBone_left:
        this.collider = new Collider(this, l, -4, 6, 6);
        break;
      case LineBone_right:
        this.collider = new Collider(this, -4, l, 6, 6);
        break;
      default:
        break;
    }
  }

  update() {
    switch (this.direction) {
      case LineBone_up: case LineBone_down:
        this.x += this.speed * this.obj.dt; break;
      case LineBone_left: case LineBone_right:
        this.y += this.speed * this.obj.dt; break;
      default: break;
    }

    return this.ctx.withinRange(this.x, this.y);
  }

  draw() {
    switch (this.direction) {
      case LineBone_right:
        super.drawHor(this.x, this.y - vbone_up_w_half);
        break;
      case LineBone_left:
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

    if (Debugger.is) {
      Debugger.circle(this.x, this.y);
      this.check();
    }
  }

  check() {
    return this.collider.AABB(this.player.collider);
  }
}

const RotBone_rotateSpeed = 100;
const RotBone_speed = 130;
const RotBone_length = 30;

class RotBones extends Bone {
  constructor(obj, centerX, centerY, count = 6) {
    super(obj, centerX, centerY, RotBone_length);
    this.speed = 0;
    this.angle = 0;
    this.distance = -500;
    this.bones = [];
    this.count = 6;

    const l = this.length_half + vbone_up_h - 4;
    
    let a = 0;
    for (let i = 0; i < 6; i++) {
      this.bones.push({
        x: this.x + Math.cos((this.angle + a) * toRad) * this.distance,
        y: this.y + Math.sin((this.angle + a) * toRad) * this.distance,
        angle: this.angle + a - 90,
      });
      this.bones[i].collider = new Collider(this.bones[i], 6, 6, l - 6, l);

      a += 60;
    }
  }

  update() {
    this.angle += RotBone_rotateSpeed * this.obj.dt;
    this.speed += RotBone_speed * this.obj.dt;
    this.distance += this.speed * this.obj.dt;

    let a = 0, b = 0;
    for (let i = 0; i < 6; i++) {
      this.bones[i].x = this.x + Math.cos((this.angle + a) * toRad) * this.distance;
      this.bones[i].y = this.y + Math.sin((this.angle + a) * toRad) * this.distance;
      this.bones[i].angle = this.angle + a - 90;
      
      if (this.ctx.withinRange(
        this.bones[i].x,
        this.bones[i].y
      )) b++;

      a += 60;
    }

    return b == 6;
  }

  draw() {
    this.bones.forEach(x => super.drawRot(x.x, x.y, x.angle));
    this.check();
  }

  check() {
    let b = false;
    this.bones.forEach(x => b = x.collider.OBB(this.obj.player.collider) ? true : b);

    return b;
  }
}

export { LineBone, RotBones };