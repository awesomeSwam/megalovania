import { Sprite } from "../AssetsManagement/Sprite.js";
import { Animator } from "../AssetsManagement/Animator.js";

import { gameSpriteSheetData_json } from "../AssetsManagement/SpriteSheet.js";
const sans_leg_stand = {
  w: gameSpriteSheetData_json.sans.sans_leg_stand[2],
  h: gameSpriteSheetData_json.sans.sans_leg_stand[3]
};

const sans_body = {
  w: gameSpriteSheetData_json.sans.sans_body_0[2],
  h: gameSpriteSheetData_json.sans.sans_body_0[3]
};

const sans_face = {
  w: gameSpriteSheetData_json.sans.sans_face_0[2],
  h: gameSpriteSheetData_json.sans.sans_face_0[3]
};

const sans_Vswing = {
  w: gameSpriteSheetData_json.sans.sans_swing_vertical[2],
  h: gameSpriteSheetData_json.sans.sans_swing_vertical[3],
  pw: 2,
  ph: 2
};

const sans_Hswing = {
  w: gameSpriteSheetData_json.sans.sans_swing_horizontal[2],
  h: gameSpriteSheetData_json.sans.sans_swing_horizontal[3],
  pw: 2,
  ph: 2
};

const p_sv = { w: Math.floor(-sans_Vswing.w/2+4), h: Math.floor(-sans_Vswing.h+2) };
const p_sh = { w: Math.floor(-sans_Hswing.w/2+45), h: Math.floor(-sans_Hswing.h+2) };

const p_l1 = { w: Math.floor(-sans_leg_stand.w/2), h: Math.floor(-sans_leg_stand.h) };
const p_b0 = { w: Math.floor(-sans_body.w/2), h: Math.floor(-sans_leg_stand.h-sans_body.h) };
const p_f = { w: Math.floor(-sans_face.w/2), h: Math.floor(-sans_leg_stand.h-sans_body.h-sans_face.h) };

const sans_blue_states = [
  { state: "up", anim: "sans_swing_vertical", flip: true },
  { state: "down", anim: "sans_swing_vertical", flip: false },
  // { state: "left", anim: "sans_swing_horizontal", flip: true },
  // { state: "right", anim: "sans_swing_horizontal", flip: false },
];

class Sans {
  constructor(ctx, player) {
    this.ctx = ctx;
    this.x = 600;
    this.y = 250;

    this.player = player;
    this.setAnimations();
  }

  setAnimations() {
    this.animator = new Animator(this.ctx);
    this.animator.addAnimation("sans_swing_horizontal", 0.06);
    this.animator.addAnimation("sans_swing_vertical", 0.06);

    this.sans_animation_flip = false;
    this.sans_animation = "";
    this.sans_padding = 0;
    this.sans_face = 0;

    this.t = 0;
  }

  update(dt) {
    this.t += dt;
    if (this.t > 3) {
      this.t = 0;

      const { state, anim, flip } = sans_blue_states[Math.floor(Math.random() * 2)];

      this.sans_animation_flip = flip;
      this.sans_animation = anim;

      // this.player.changeBlueState(state);
    }

    if (this.sans_animation !== "") {
      if (this.animator.update(this.sans_animation, dt, this.sans_animation_flip)) {
        this.sans_animation = "";
      }
    } else {
      this.sans_padding += dt;
      if (this.sans_padding > Math.PI) {
        this.sans_padding -= Math.PI;
      }
    }
  }

  draw() {
    if (this.sans_animation !== "") {
      switch (this.sans_animation) {
        case "sans_swing_vertical":
          this.animator.Dplay(this.x + p_sv.w, this.y + p_sv.h);
          break;
        case "sans_swing_horizontal":
          this.animator.Dplay(this.x + p_sh.w, this.y + p_sh.h);  
          break;
        default:
          break;
      }
    } else {
      const paddingHor = Math.sin(6 * this.sans_padding) * 3;
      const paddingVer = Math.sin(3 * this.sans_padding) * 3;
      const paddingHed = Math.sin(18 * this.sans_padding) + 16;
      
      Sprite.Ddraw(
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

    this.ctx.strokeStyle = this.debugColor;
    this.ctx.fillStyle = "yellow";
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, 2, 0, 2 * Math.PI);
    this.ctx.stroke();
    this.ctx.fill();
  }
}

export { Sans };