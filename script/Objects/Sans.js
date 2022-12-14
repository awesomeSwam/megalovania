import { Sprite } from "../AssetsManagement/Sprite.js";
import { Animator } from "../Components/Animator.js";
import { gameSpriteSheetData_json } from "../Constants/spriteSheetData.js";
import { Debugger } from "../Components/Collider.js";

const sans_leg_stand_w = gameSpriteSheetData_json.sans.sans_leg_stand[2];
const sans_leg_stand_h = gameSpriteSheetData_json.sans.sans_leg_stand[3];

const sans_body_w = gameSpriteSheetData_json.sans.sans_body_0[2];
const sans_body_h = gameSpriteSheetData_json.sans.sans_body_0[3];

const sans_face_w = gameSpriteSheetData_json.sans.sans_face_0[2];
const sans_face_h = gameSpriteSheetData_json.sans.sans_face_0[3];

const [ p_l1_w, p_l1_h ] = [ Math.floor(-sans_leg_stand_w / 2), Math.floor(-sans_leg_stand_h) ];
const [ p_b0_w, p_b0_h ] = [ Math.floor(-sans_body_w / 2), Math.floor(-sans_leg_stand_h - sans_body_h) ];
const [ p_f_w, p_f_h ] = [ Math.floor(-sans_face_w / 2), Math.floor(-sans_leg_stand_h - sans_body_h - sans_face_h) ];

const sans_Vswing_head_center_w = -4;
const sans_Vswing_head_center_h = -165;
const sans_Vswing_head = [
  sans_Vswing_head_center_h - 10,
  sans_Vswing_head_center_h - 5,
  sans_Vswing_head_center_h + 2,
  sans_Vswing_head_center_h + 7,
  sans_Vswing_head_center_h + 10,
];
const sans_Vswing_head_reverse = [
  sans_Vswing_head_center_h + 10,
  sans_Vswing_head_center_h + 7,
  sans_Vswing_head_center_h + 2,
  sans_Vswing_head_center_h - 5,
  sans_Vswing_head_center_h - 10,
];
const sans_Vswing_padding_w = 4;
const sans_Vswing_padding_h = -Math.floor(gameSpriteSheetData_json.sans.sans_swing_up[3] / 2 - 2);

const sans_Hswing_head_center_w = 0;
const sans_Hswing_head_center_h = -174;
const sans_Hswing_head = [
  sans_Hswing_head_center_w + 4,
  sans_Hswing_head_center_w + 4,
  sans_Hswing_head_center_w + 8,
  sans_Hswing_head_center_w - 5,
  sans_Hswing_head_center_w - 4,
];
const sans_Hswing_head_reverse = [
  sans_Hswing_head_center_w - 4,
  sans_Hswing_head_center_w - 5,
  sans_Hswing_head_center_w + 8,
  sans_Hswing_head_center_w + 4,
  sans_Hswing_head_center_w + 4,
];
const sans_Hswing_padding_w = 45;
const sans_Hswing_padding_h = -Math.floor(gameSpriteSheetData_json.sans.sans_swing_left[3] / 2 - 2);;

const anim_dir = {
  "right": 0,
  "left": 1,
  "up": 2,
  "down": 3
}

const anim_dir_right = 0;
const anim_dir_left = 1;
const anim_dir_up = 2;
const anim_dir_down = 3;

class Sans {
  constructor(obj) {
    this.obj = obj;
    this.ctx = obj.ctx;
    this.player = obj.player;

    this.x = 640;
    this.y = 200;

    this.setAnimations();
  }

  setAnimations() {
    this.animator = new Animator(this.ctx);
    this.animator.addAnimation("sans_swing_right", 0.08);
    this.animator.addAnimation("sans_swing_left", 0.08);
    this.animator.addAnimation("sans_swing_down", 0.08);
    this.animator.addAnimation("sans_swing_up", 0.08);

    this.sans_face = 0;
    this.sans_swing_state = false;

    this.sans_padding = 0;
  }

  swingAttack(direction) {
    this.swing_direction = anim_dir[direction];
    this.animator.initialize(`sans_swing_${direction}`);
    this.sans_swing_state = true;

    this.obj.player.changeBlueState(direction);
  }

  update() {
    if (!this.sans_swing_state) {
      this.sans_padding += this.obj.dt;
      if (this.sans_padding > Math.PI) {
        this.sans_padding -= Math.PI;
      }

      return false;
    }

    if (this.animator.update(this.obj.dt)) {
      this.sans_swing_state = false;
    }
    
    return false;
  }

  draw() {
    if (!this.sans_swing_state) {
      const paddingHor = Math.sin(6 * this.sans_padding) * 3;
      const paddingVer = Math.sin(3 * this.sans_padding) * 3;
      const paddingHed = Math.sin(18 * this.sans_padding) + 16;

      Sprite.draw(
        "sans_leg_stand",
        this.x + p_l1_w,
        this.y + p_l1_h
      );
      Sprite.draw(
        "sans_body_0",
        this.x + p_b0_w - paddingHor,
        this.y + p_b0_h + paddingVer
      );
      Sprite.draw(
        `sans_face_${this.sans_face}`,
        this.x + p_f_w - paddingHor,
        this.y + p_f_h + paddingVer + paddingHed
      );
    } else {
      if (this.swing_direction <= 1) {
        this.animator.playCenter(this.x + sans_Hswing_padding_w, this.y + sans_Hswing_padding_h);
        if (this.swing_direction == anim_dir_left) {
          Sprite.drawCenter(
            `sans_face_${this.sans_face}`,
            this.x + sans_Hswing_head[this.animator.idx],
            this.y + sans_Hswing_head_center_h
          );
        } else {
          Sprite.drawCenter(
            `sans_face_${this.sans_face}`,
            this.x + sans_Hswing_head_reverse[this.animator.idx],
            this.y + sans_Hswing_head_center_h
          );
        }
      } else {
        this.animator.playCenter(this.x + sans_Vswing_padding_w, this.y + sans_Vswing_padding_h);
        if (this.swing_direction == anim_dir_down) {
          Sprite.drawCenter(
            `sans_face_${this.sans_face}`,
            this.x + sans_Vswing_head_center_w,
            this.y + sans_Vswing_head[this.animator.idx],
          );
        } else {
          Sprite.drawCenter(
            `sans_face_${this.sans_face}`,
            this.x + sans_Vswing_head_center_w,
            this.y + sans_Vswing_head_reverse[this.animator.idx],
          );
        }
      }
    }

    if (Debugger.is) {
      this.ctx.strokeStyle = "yellow";
      this.ctx.fillStyle = "yellow";
      this.ctx.lineWidth = 1;
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, 2, 0, 2 * Math.PI);
      this.ctx.stroke();
      this.ctx.fill();
    }
  }

  toBlueState() {
    this.obj.player.changeState("blue");
  }

  toRedState() {
    this.obj.player.changeState("red");
  }

  swingAttack_right() {
    this.swingAttack("right");
  }
  
  swingAttack_left() {
    this.swingAttack("left");
  }
  
  swingAttack_up() {
    this.swingAttack("up");
  }

  swingAttack_down() {
    this.swingAttack("down");
  }

  setBoxSize(size) {
    this.obj.battleBox.setBoxSize(size, size);
  }

  setBoxWidthHeight(width, height) {
    this.obj.battleBox.setBoxSize(width, height);
  }

  setBox(x1, y1, x2, y2, lerpTime) {
    this.obj.battleBox.setBox([{ x: x1, y: y1 }, { x: x2, y: y2 }], lerpTime);
  }
}

export { Sans };