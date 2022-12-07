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

const sans_Vswing_w = gameSpriteSheetData_json.sans.sans_swing_up[2];
const sans_Vswing_h = gameSpriteSheetData_json.sans.sans_swing_up[3];

const sans_Hswing_w = gameSpriteSheetData_json.sans.sans_swing_right[2];
const sans_Hswing_h = gameSpriteSheetData_json.sans.sans_swing_right[3];

const [ p_sv_w, p_sv_h ] = [ Math.floor(-sans_Vswing_w / 2 + 4), Math.floor(-sans_Vswing_h + 2) ];
const [ p_sh_w, p_sh_h ] = [ Math.floor(-sans_Hswing_w / 2 + 45), Math.floor(-sans_Hswing_h + 2) ];
const [ p_l1_w, p_l1_h ] = [ Math.floor(-sans_leg_stand_w / 2), Math.floor(-sans_leg_stand_h) ];
const [ p_b0_w, p_b0_h ] = [ Math.floor(-sans_body_w / 2), Math.floor(-sans_leg_stand_h - sans_body_h) ];
const [ p_f_w, p_f_h ] = [ Math.floor(-sans_face_w / 2), Math.floor(-sans_leg_stand_h - sans_body_h - sans_face_h) ];

const sans_anim_states = [
  { state: "none", anim: null },
  { state: "right", anim: "sans_swing_right" },
  { state: "left", anim: "sans_swing_left" },
  { state: "down", anim: "sans_swing_down" },
  { state: "up", anim: "sans_swing_up" },
];

class Sans {
  constructor(obj) {
    this.obj = obj;
    this.ctx = obj.ctx;
    this.player = obj.player;

    this.x = 600;
    this.y = 250;

    this.setAnimations();
  }

  setAnimations() {
    this.animator = new Animator(this.ctx);
    this.animator.addAnimation("sans_swing_right", 0.1);
    this.animator.addAnimation("sans_swing_left", 0.1);
    this.animator.addAnimation("sans_swing_down", 0.1);
    this.animator.addAnimation("sans_swing_up", 0.1);

    this.sans_face = 0;
    this.sans_anim_state = 0;

    this.sans_padding = 0;
  }

  swingAttack() {
    this.animator.initalize();
  }

  update() {
    if (this.sans_anim_state == 0) {
      this.sans_padding += this.obj.dt;
      if (this.sans_padding > Math.PI) {
        this.sans_padding -= Math.PI;
      }
    } else {
      if (this.animator.update(sans_anim_states[this.sans_anim_state].anim)) {
        this.sans_anim_state = 0;
      }
    }
  }

  draw() {
    if (this.sans_anim_state == 0) {
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
      switch (this.sans_anim_state) {
        default:
          this.animator.play()
      }
    }

    if (this.sans_animation !== "") {
      switch (this.sans_animation) {
        case "sans_swing_vertical":
          this.animator.Dplay(this.x + p_sv_w, this.y + p_sv_h);
          break;
        case "sans_swing_horizontal":
          this.animator.Dplay(this.x + p_sh_w, this.y + p_sh_h);  
          break;
        default:
          break;
      }
    } else {
      const paddingHor = Math.sin(6 * this.sans_padding) * 3;
      const paddingVer = Math.sin(3 * this.sans_padding) * 3;
      const paddingHed = Math.sin(18 * this.sans_padding) + 16;
      
      Sprite.draw(
        this.ctx, "sans_leg_stand",
        this.x + p_l1.w,
        this.y + p_l1.h
      );
      Sprite.Ddraw(
        this.ctx, "sans_body_0",
        this.x + p_b0.w - paddingHor,
        this.y + p_b0.h + paddingVer
      );
      Sprite.Ddraw(
        this.ctx, `sans_face_${this.sans_face}`,
        this.x + p_f.w - paddingHor,
        this.y + p_f.h + paddingVer + paddingHed
      );
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
}

export { Sans };