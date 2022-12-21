import { Sprite } from "../AssetsManagement/Sprite.js";
import { gameSpriteSheetData_json, padding } from "../Constants/spriteSheetData.js";
import { toRad } from "../Constants/GameMath.js";
import { Debugger, Collider } from "../Components/Collider.js";
import { battleBoxLineWidth } from "../Objects/BattleBox.js";
import { Sound } from "../AssetsManagement/Sound.js";

const vbone_up_w = gameSpriteSheetData_json.vbone.vbone_up[2];
const vbone_up_h = gameSpriteSheetData_json.vbone.vbone_up[3];

const vbone_up_w_half = vbone_up_w / 2;
const vbone_up_h_half = vbone_up_h / 2;

const vbone_down_w = gameSpriteSheetData_json.vbone.vbone_down[2];
const vbone_down_h = gameSpriteSheetData_json.vbone.vbone_down[3];

const vbone_down_w_half = vbone_down_w / 2;
const vbone_down_h_half = vbone_down_h / 2;

const DrawBone = {
  ctx: null,

  drawVer: function(x, y, length) {
    Sprite.draw("vbone_up", x, y);
    this.ctx.strokeStyle = "white";
    this.ctx.lineWidth = 12;
    this.ctx.beginPath();
    this.ctx.moveTo(x + vbone_up_w_half, y + vbone_up_h - 1);
    this.ctx.lineTo(x + vbone_up_w_half, y + vbone_up_h + length + 1);
    this.ctx.stroke();
    Sprite.draw("vbone_down", x, y + vbone_up_h + length);    
  },

  drawHor: function(x, y, length) {
    Sprite.draw("hbone_up", x, y);
    this.ctx.strokeStyle = "white";
    this.ctx.lineWidth = 12;
    this.ctx.beginPath();
    this.ctx.moveTo(x + vbone_up_h - 1, y + vbone_up_w_half);
    this.ctx.lineTo(x + vbone_up_h + length + 1, y + vbone_up_w_half);
    this.ctx.stroke();
    Sprite.draw("hbone_down", x + vbone_up_h + length, y);
  },

  drawRot: function(x, y, angle, length_half) {
    this.ctx.save();
    this.ctx.translate(Math.floor(x), Math.floor(y));
    this.ctx.rotate(angle * toRad);
    
    Sprite.draw("vbone_up", -vbone_up_w_half, -vbone_up_h_half - length_half);
    this.ctx.strokeStyle = "white";
    this.ctx.lineWidth = 12;
    this.ctx.beginPath();
    this.ctx.moveTo(0, -length_half - 1);
    this.ctx.lineTo(0, length_half + 1);
    this.ctx.stroke();
    Sprite.draw("vbone_down", -vbone_down_w_half, length_half);

    this.ctx.restore();
  },

  drawRight: function(x, y, length) {
    this.drawHor(x, y - vbone_up_w_half, length);
  },

  drawLeft: function(x, y, length) {
    this.drawHor(x - vbone_up_h - vbone_down_h - length, y - vbone_up_w_half, length);
  },

  drawUp: function(x, y, length) {
    this.drawVer(x - vbone_up_w_half, y - vbone_up_h - vbone_down_h - length, length);
  },

  drawDown: function(x, y, length) {
    this.drawVer(x - vbone_up_w_half, y, length);
  },

  drawVer_blue: function(x, y, length) {
    Sprite.draw("vbone_blue_up", x, y);
    this.ctx.strokeStyle = "#42e2FF";
    this.ctx.lineWidth = 12;
    this.ctx.beginPath();
    this.ctx.moveTo(x + vbone_up_w_half, y + vbone_up_h - 1);
    this.ctx.lineTo(x + vbone_up_w_half, y + vbone_up_h + length + 1);
    this.ctx.stroke();
    Sprite.draw("vbone_blue_down", x, y + vbone_up_h + length);    
  },

  drawHor_blue: function(x, y, length) {
    Sprite.draw("hbone_blue_up", x, y);
    this.ctx.strokeStyle = "#42e2FF";
    this.ctx.lineWidth = 12;
    this.ctx.beginPath();
    this.ctx.moveTo(x + vbone_up_h - 1, y + vbone_up_w_half);
    this.ctx.lineTo(x + vbone_up_h + length + 1, y + vbone_up_w_half);
    this.ctx.stroke();
    Sprite.draw("hbone_blue_down", x + vbone_up_h + length, y);
  },

  drawRight_blue: function(x, y, length) {
    this.drawHor_blue(x, y - vbone_up_w_half, length);
  },

  drawLeft_blue: function(x, y, length) {
    this.drawHor_blue(x - vbone_up_h - vbone_down_h - length, y - vbone_up_w_half, length);
  },

  drawUp_blue: function(x, y, length) {
    this.drawVer_blue(x - vbone_up_w_half, y - vbone_up_h - vbone_down_h - length, length);
  },

  drawDown_blue: function(x, y, length) {
    this.drawVer_blue(x - vbone_up_w_half, y, length);
  },
}

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
        DrawBone.drawRight(this.x, this.y, this.length);
        break;
      case LineBone_left:
        DrawBone.drawLeft(this.x, this.y, this.length);
        break;
      case LineBone_up:
        DrawBone.drawUp(this.x, this.y, this.length);
        break;
      case LineBone_down:
        DrawBone.drawDown(this.x, this.y, this.length);
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

class BlueLineBone extends Bone {
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
        DrawBone.drawRight_blue(this.x, this.y, this.length);
        break;
      case LineBone_left:
        DrawBone.drawLeft_blue(this.x, this.y, this.length);
        break;
      case LineBone_up:
        DrawBone.drawUp_blue(this.x, this.y, this.length);
        break;
      case LineBone_down:
        DrawBone.drawDown_blue(this.x, this.y, this.length);
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

class LineBoneX extends Bone {
  constructor(obj, x, y, speed, cycle, min_length, max_length, direction) {
    super(obj, x, y, length);
    this.direction = LineBone_direction[direction];
    this.player = obj.player;
    this.speed = speed;
    this.cycle = cycle;
    
    this.min_length = min_length;
    this.max_length = max_length;
    this.middle_length = (min_length + max_length) / 2;
    this.half_length = (max_length - min_length) / 2;

    this.length = min_length;
    this.t = 0;
    const l = this.length + vbone_up_h + vbone_up_h - 4;

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
    this.t += this.obj.dt;
    this.length = Math.floor(this.middle_length + Math.sin(this.t * this.cycle) * this.half_length);
    const l = this.length + vbone_up_h + vbone_up_h - 4;

    switch (this.direction) {
      case LineBone_down:
        this.collider.d = l;
        break;
      case LineBone_up:
        this.collider.u = l;
        break;
      case LineBone_left:
        this.collider.l = l;
        break;
      case LineBone_right:
        this.collider.r = l;
        break;
      default:
        break;
    }

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
        DrawBone.drawRight(this.x, this.y, this.length);
        break;
      case LineBone_left:
        DrawBone.drawLeft(this.x, this.y, this.length);
        break;
      case LineBone_up:
        DrawBone.drawUp(this.x, this.y, this.length);
        break;
      case LineBone_down:
        DrawBone.drawDown(this.x, this.y, this.length);
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
const RotBone_speed = 150;
const RotBone_length = 30;

class RotBones extends Bone {
  constructor(obj, centerX, centerY, count = 6) {
    super(obj, centerX, centerY, RotBone_length);
    this.speed = 300;
    this.angle = 0;
    this.distance = -500;
    this.bones = [];
    this.count = 6;

    const l = this.length_half + vbone_up_h + 6;
    
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
    this.bones.forEach(x => DrawBone.drawRot(x.x, x.y, x.angle, this.length));
    this.check();
  }

  check() {
    let b = false;
    this.bones.forEach(x => b = x.collider.OBB(this.obj.player.collider) ? true : b);

    return b;
  }
}

const AlertBones_direction = {
  "up": 0,
  "down": 1,
  "right": 2,
  "left": 3
};
const AlertBones_up = 0;
const AlertBones_down = 1;
const AlertBones_right = 2;
const AlertBones_left = 3;
const AlertBones_alertTime = 1;
const AlertBones_interval = 20;
const AlertBones_Padding_h = battleBoxLineWidth / 2 + 2 - 20;
const AlertBones_Padding_v = battleBoxLineWidth / 2 - 2 + 20;


class AlertBones {
  constructor(obj, length, direction, time) {
    this.obj = obj;
    this.ctx = obj.ctx;
    this.max_length = length;

    this.direction = AlertBones_direction[direction];

    this.alert = true;
    this.alertTime = 0;

    this.t = 0;
    this.time = time;
    this.length = 0;

    this.x = 0;
    this.y = 0;
    this.collider = new Collider(this, 0, 0, 0, 0);

    this.bones = [];

    Sound.play("warning");
  }

  update() {
    if (this.alert) {
      this.alertTime += this.obj.dt;
      if (this.alertTime > AlertBones_alertTime) {
        this.alert = false;
      }
    } else {
      this.t += this.obj.dt;
      if (this.t > this.time) {
        return true;
      }

      this.length = Math.sin(Math.PI / this.time * this.t) * this.max_length;
    }

    return false;
  }

  drawAlert() {
    if (this.alert) {
      this.ctx.strokeStyle = "red";
      this.ctx.lineWidth = 4;

      this.ctx.beginPath();
      switch (this.direction) {
        case    AlertBones_up:
          this.ctx.rect(
            this.obj.battleBox.points[0].x,
            this.obj.battleBox.points[1].y - this.max_length,
            this.obj.battleBox.points[1].x - this.obj.battleBox.points[0].x,
            this.max_length
          ); break;
        case  AlertBones_down:
          this.ctx.rect(
            this.obj.battleBox.points[0].x,
            this.obj.battleBox.points[0].y,
            this.obj.battleBox.points[1].x - this.obj.battleBox.points[0].x,
            this.max_length
          ); break;
        case AlertBones_right:
          this.ctx.rect(
            this.obj.battleBox.points[0].x,
            this.obj.battleBox.points[0].y,
            this.max_length,
            this.obj.battleBox.points[1].y - this.obj.battleBox.points[0].y
          ); break;
        case  AlertBones_left:
          this.ctx.rect(
            this.obj.battleBox.points[1].x - this.max_length,
            this.obj.battleBox.points[0].y,
            this.max_length,
            this.obj.battleBox.points[1].y - this.obj.battleBox.points[0].y
          ); break;
        default: break;
      }
      this.ctx.stroke();
    }
  }

  draw() {
    if (!this.alert) {
      switch (this.direction) {
        case    AlertBones_up:  this.drawUD(true); break;
        case  AlertBones_down: this.drawUD(false); break;
        case AlertBones_right:  this.drawRL(true); break;
        case  AlertBones_left: this.drawRL(false); break;
        default: break;
      }

      this.check();
    }
  }

  drawUD(up) {
    const [sx, ex] = [this.obj.battleBox.points[0].x, this.obj.battleBox.points[1].x];
    const centerX = this.obj.battleBox.getCenter()[0];

    let x = centerX;
    const y = this.obj.battleBox.points[(up ? 1 : 0)].y + AlertBones_Padding_v * (up ? 1 : -1);
    DrawBone[up ? "drawUp" : "drawDown"](x, y, this.length);
    
    x = centerX + AlertBones_interval;
    while (x < ex) {
      DrawBone[up ? "drawUp" : "drawDown"](x, y, this.length);
      x += AlertBones_interval;
    }

    x = centerX - AlertBones_interval;
    while (sx < x) {
      DrawBone[up ? "drawUp" : "drawDown"](x, y, this.length);
      x -= AlertBones_interval;
    }
  }

  drawRL(right) {
    const [sy, ey] = [this.obj.battleBox.points[0].y, this.obj.battleBox.points[1].y];
    const centerY = this.obj.battleBox.getCenter()[1];

    const x = this.obj.battleBox.points[(right ? 0 : 1)].x + AlertBones_Padding_h * (right ? 1 : -1);
    let y = centerY;

    DrawBone[right ? "drawRight" : "drawLeft"](x, y, this.length);
    
    y = centerY + AlertBones_interval;
    while (y < ey) {
      DrawBone[right ? "drawRight" : "drawLeft"](x, y, this.length);
      y += AlertBones_interval;
    }

    y = centerY - AlertBones_interval;
    while (sy < y) {
      DrawBone[right ? "drawRight" : "drawLeft"](x, y, this.length);
      y -= AlertBones_interval;
    }
  }

  check() {
    if (this.alert) {
      return false;
    }
    
    switch (this.direction) {
      case    AlertBones_up: return  this.checkUD(true);
      case  AlertBones_down: return this.checkUD(false);
      case AlertBones_right: return  this.checkRL(true);
      case  AlertBones_left: return this.checkRL(false);
      default: break;
    }
  }

  checkUD(up) {
    this.x = this.obj.battleBox.getCenter()[0];
    this.y = this.obj.battleBox.points[(up ? 1 : 0)].y;
    
    this.collider.l = this.collider.r = Math.floor((this.obj.battleBox.points[1].x - this.obj.battleBox.points[0].x) / 2);
    if (up) {
      this.collider.u = this.length + vbone_up_h + vbone_up_h - 30;
      this.collider.d = 0;
    } else {
      this.collider.d = this.length + vbone_up_h + vbone_up_h - 30;
      this.collider.u = 0;
    }

    return this.collider.AABB(this.obj.player.collider);
  }

  checkRL(right) {
    this.x = this.obj.battleBox.points[(right ? 0 : 1)].x;
    this.y = this.obj.battleBox.getCenter()[1];
    
    this.collider.u = this.collider.d = Math.floor((this.obj.battleBox.points[1].y - this.obj.battleBox.points[0].y) / 2);
    if (right) {
      this.collider.r = this.length + vbone_up_h + vbone_up_h - 24;
      this.collider.l = 0;
    } else {
      this.collider.l = this.length + vbone_up_h + vbone_up_h - 24;
      this.collider.r = 0;
    }

    return this.collider.AABB(this.obj.player.collider);
  }
}

const lazerBone_length = 30;
const lazerBone_speed = 700;
const lazerBone_width = 25;

class LazerBone {
  constructor(obj, x) {
    this.ctx = obj.ctx;
    this.obj = obj;
    
    this.x = x;
    this.y = 0;
    this.t = 0;
    this.z = lazerBone_width;

    this.state = false;

    const l = lazerBone_length + vbone_up_h + vbone_up_h - 4;
    this.collider = new Collider(this, 6, 6, l, -4);
  }

  update() {
    if (this.state) {
      this.t += this.obj.dt;
      if (this.t > 0.3) {
        return true;
      }

      this.z = Math.cos(this.t * ((Math.PI / 2) / 0.3)) * lazerBone_width;

      this.collider.l = this.collider.r = this.z;
    }
    
    this.y += lazerBone_speed * this.obj.dt;
    if (this.y >= this.obj.canvas.height) {
      this.state = true;
      this.y = 0;
      this.collider.u = 0;
      this.collider.d = this.obj.canvas.height;
      Sound.play("blast2");
    }

    return false;
  }

  draw() {
    if (this.state) {
      this.ctx.strokeStyle = "white";
      this.ctx.lineWidth = this.z + this.z;
      this.ctx.beginPath();
      this.ctx.moveTo(this.x, 0);
      this.ctx.lineTo(this.x, this.obj.canvas.height);
      this.ctx.stroke();

      if (Debugger.is) {
        Debugger.circle(this.x, this.y);
        this.check();
      }
      return ;
    }

    DrawBone.drawUp(this.x, this.y, lazerBone_length);

    if (Debugger.is) {
      Debugger.circle(this.x, this.y);
      this.check();
    }
  }

  check() {
    return this.collider.AABB(this.obj.player.collider);
  }
}

// class rainBone {
//   constructor(obj, x) {
//     this.ctx = obj.ctx;
//     this.obj = obj;
    
//     this.x = x;
//     this.y = 0;
//     this.t = 0;
//     this.z = lazerBone_width;

//     this.state = false;

//     const l = lazerBone_length + vbone_up_h + vbone_up_h - 4;
//     this.collider = new Collider(this, 6, 6, l, -4);
//   }

//   update() {
//     if (this.state) {
//       this.t += this.obj.dt;
//       if (this.t > 0.3) {
//         return true;
//       }

//       this.z = Math.cos(this.t * ((Math.PI / 2) / 0.3)) * lazerBone_width;

//       this.collider.l = this.collider.r = this.z;
//     }
    
//     this.y += lazerBone_speed * this.obj.dt;
//     if (this.y >= this.obj.canvas.height) {
//       this.state = true;
//       this.y = 0;
//       this.collider.u = 0;
//       this.collider.d = this.obj.canvas.height;
//     }

//     return false;
//   }

//   draw() {
//     if (this.state) {
//       this.ctx.strokeStyle = "white";
//       this.ctx.lineWidth = this.z + this.z;
//       this.ctx.beginPath();
//       this.ctx.moveTo(this.x, 0);
//       this.ctx.lineTo(this.x, this.obj.canvas.height);
//       this.ctx.stroke();

//       if (Debugger.is) {
//         Debugger.circle(this.x, this.y);
//         this.check();
//       }
//       return ;
//     }

//     DrawBone.drawUp(this.x, this.y, lazerBone_length);

//     if (Debugger.is) {
//       Debugger.circle(this.x, this.y);
//       this.check();
//     }
//   }

//   check() {
//     return this.collider.AABB(this.obj.player.collider);
//   }
// }

const dirBone_length = 10;

class DirBone {
  constructor(obj, x, y, angle, speed) {
    this.ctx = obj.ctx;
    this.obj = obj;
    
    this.x = x;
    this.y = y;
    this.angle = 0;

    this.dirVecX = Math.cos(angle * toRad) * speed;
    this.dirVecY = Math.sin(angle * toRad) * speed;

    const l = dirBone_length / 2 + vbone_up_h;
    this.collider = new Collider(this, 6, 6, l - 6, l);
  }

  update() {
    this.angle += 720 * this.obj.dt;
    this.x += this.dirVecX * this.obj.dt;
    this.y += this.dirVecY * this.obj.dt;

    return this.obj.ctx.withinRange(this.x, this.y);
  }

  draw() {
    DrawBone.drawRot(this.x, this.y, this.angle, dirBone_length);

    if (Debugger.is) {
      Debugger.circle(this.x, this.y);
      this.check();
    }
  }

  check() {
    return this.collider.OBB(this.obj.player.collider);
  }
}

export { DrawBone, LineBone, BlueLineBone, LineBoneX, RotBones, AlertBones, LazerBone, DirBone };